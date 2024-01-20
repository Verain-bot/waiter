from api.models import Order
from datetime import timedelta
from django.utils import timezone

def canPayforOrder(order : Order):
    if order.paymentStatus in [Order.OrderPaymentStatusChoices.PAID, Order.OrderPaymentStatusChoices.REFUNDED] or order.price == 0 or order.time + timedelta(minutes=10) < timezone.now():
        if order.orderStatus in [Order.OrderStatusChoices.COMPLETE, Order.OrderStatusChoices.CANCELLED]:
            return False
    
    return True

