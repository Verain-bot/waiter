from celery import shared_task
from api.models import Order
from .models import PaymentStatus
from ResOwner.helper import setRestaurantOrderAvailable
from phonepe.sdk.pg.payments.v1.payment_client import PhonePePaymentClient
from phonepe.sdk.pg.env import Env
import razorpay
import uuid
from OTPAuth.tasks import sendNotification
from django.conf import settings

@shared_task
def process_payment_for_order(paymentId : int, data , success : bool):
    from api.tasks import cancel_order_if_not_accepted
    
    obj = PaymentStatus.objects.get(payment_id=paymentId)
    if not success:
        if not obj.success and obj.terminal_state:
            return {'success': False, 'paymentId': paymentId, 'msg': 'Payment already processed'}
        
        obj.success = False
        if obj.payment_gateway not in [PaymentStatus.PaymentGatewayChoices.RZP]:
            obj.terminal_state = True
        if obj.order.paymentStatus == Order.OrderPaymentStatusChoices.PENDING:
            obj.order.paymentStatus = Order.OrderPaymentStatusChoices.FAILED
            obj.order.save()

        obj.data = data
        obj.save()
        return {'success': False, 'paymentId': paymentId, 'msg': 'Payment failed'}
    
    if obj.success and obj.terminal_state:
        return {'success': False, 'paymentId': paymentId, 'msg': 'Payment already processed'}

    obj.success = True
    obj.data = data
    obj.terminal_state = True
    obj.save()

    order = obj.order
    order.paymentStatus = Order.OrderPaymentStatusChoices.PAID
    sendNotification.delay(order.restaurant.owner.pk, 'New Order', f'New order available.')

    order.save()

    setRestaurantOrderAvailable(order.restaurant.owner.pk, True)
    cancel_order_if_not_accepted.apply_async((order.pk,), countdown=120)

    return {'success': True, 'paymentId': paymentId, 'msg': 'Payment successfull'}

@shared_task
def refund_payment_for_order(orderID: int): 

    order = Order.objects.filter(pk=orderID)
    if not order:
        return {'success': False, 'orderID': orderID, 'msg': 'Order not found'}

    order = order[0]

    if order.paymentStatus != Order.OrderPaymentStatusChoices.PAID:
        return {'success': False, 'orderID': orderID, 'msg': 'Order not paid or already refunded'}

    paymentStatus = order.payment_status.order_by('-time')[0]
    
    d = refund_payment_from_paymentid(paymentStatus.payment_id)
    
    if d.get('success', False):
        order.paymentStatus = Order.OrderPaymentStatusChoices.REFUNDED
        order.save()

    return d

def refund_payment_from_paymentid(paymnt_id):
    paymentStatus = PaymentStatus.objects.filter(payment_id=paymnt_id)

    if not paymentStatus:
        return {'success': False, 'paymnt_id': paymnt_id, 'msg': 'Payment not found'}
    
    paymentStatus = paymentStatus[0]

    if paymentStatus.success == False or paymentStatus.terminal_state == False:
        return {'success': False, 'paymnt_id': paymnt_id, 'msg': 'Payment status shows failed'}
    
    client = razorpay.Client(auth=('rzp_test_LTygpkM0cIuy85','zz4WggINF67hf0YMuf0QLw62'))
    client.set_app_details({"title" : "Django App", "version" : "121.21"})

    data = client.order.payments(paymnt_id)
    x = data.get('items')
    id_to_refund = None
    amount_to_refund = 0

    for item in x:
        if item.get('status') == 'captured':
            id_to_refund = item.get('id')
            amount_to_refund = item.get('amount')
            break

    try:
        refund_response = client.payment.refund(id_to_refund,{
            "amount": amount_to_refund,
            "speed": "normal",
            "receipt": "Refund for order #"+str(paymentStatus.order.pk),
            })
        
        PaymentStatus.objects.create(payment_id=refund_response.get('id'), order=paymentStatus.order, payment_gateway=PaymentStatus.PaymentGatewayChoices.RZP, data=refund_response, terminal_state=True, success = True).save()
        
        return {'success': True, 'paymnt_id': paymnt_id, 'msg': 'Payment refunded'}
    
    except Exception as e:
        print(e)
        return { 'success': False, 'paymnt_id': paymnt_id, 'msg': 'Payment not refunded'}