from celery import shared_task
from api.models import Order
from .models import PaymentStatus
from ResOwner.helper import setRestaurantOrderAvailable
from phonepe.sdk.pg.payments.v1.payment_client import PhonePePaymentClient
from phonepe.sdk.pg.env import Env
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
    
    merchant_id = settings.PHONE_PE_MERCHANT_ID
    salt_key = settings.PHONE_PE_SALT_KEY
    salt_index = 1 # insert your salt index
    env = Env.UAT
    should_publish_events = True
    phonepe_client = PhonePePaymentClient(merchant_id, salt_key, salt_index, env, should_publish_events)

    unique_refund_transcation_id = str(uuid.uuid4())[:-2]

    transaction_id_to_refund = paymnt_id
    s2s_callback_url = "https://www.merchant.com/callback"

    amount = paymentStatus.order.price * 100

    refund_response = phonepe_client.refund(merchant_transaction_id= unique_refund_transcation_id,
                                            original_transaction_id=transaction_id_to_refund,
                                            amount=amount,
                                            callback_url=s2s_callback_url)
    
    d = refund_response.__dict__
    d['data'] = refund_response.data.__dict__

    PaymentStatus.objects.create(payment_id=unique_refund_transcation_id, order=paymentStatus.order, payment_gateway='PhonePe', data=d).save()

    return d