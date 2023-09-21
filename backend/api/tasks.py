from celery import shared_task
from .models import Order

@shared_task
def cancel_order_if_not_accepted(order_id):

    order = Order.objects.get(pk=order_id)
    
    if order.orderStatus == Order.OrderStatusChoices.NOT_CONFIRMED:
        order.orderStatus = Order.OrderStatusChoices.CANCELLED
        order.save()
        
        return f"Order {order_id} cancelled"
    
    else:
        return f"Order {order_id} already confirmed"
