from celery import shared_task
from api.models import Order
from .models import PaymentStatus
from ResOwner.helper import setRestaurantOrderAvailable
from api.tasks import cancel_order_if_not_accepted


@shared_task
def process_payment_for_order(paymentId : int, data , success : bool):

    if not success:
        obj = PaymentStatus.objects.get(payment_id=paymentId)
        obj.success = False
        obj.terminal_state = True
        obj.order.paymentStatus = Order.OrderPaymentStatusChoices.FAILED
        obj.data = data
        obj.order.save()
        obj.save()
        return paymentId

    obj = PaymentStatus.objects.get(payment_id=paymentId)
    obj.success = True
    obj.data = data
    obj.terminal_state = True
    obj.save()

    order = obj.order
    order.paymentStatus = Order.OrderPaymentStatusChoices.PAID
    order.save()

    setRestaurantOrderAvailable(order.restaurant.owner.pk, True)
    cancel_order_if_not_accepted.apply_async((order.pk,), countdown=120)
    
    return paymentId
