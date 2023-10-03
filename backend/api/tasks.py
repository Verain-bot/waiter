from celery import shared_task
from .models import Order,SubOrder

@shared_task
def cancel_order_if_not_accepted(order_id):

    order = Order.objects.get(pk=order_id)
    
    if order.orderStatus == Order.OrderStatusChoices.NOT_CONFIRMED:
        order.orderStatus = Order.OrderStatusChoices.CANCELLED
        order.save()
        
        return f"Order {order_id} cancelled"
    
    else:
        return f"Order {order_id} already confirmed"
    
@shared_task
def add_comment_for_order(order_id, comment, rating ):
    order = Order.objects.get(pk = order_id)
    oldRating = order.rating
    try:
        if comment is not None:
            order.comment = comment
    
        if rating is not None and rating>0 and rating <6:
            order.rating = rating
    
    except:
        return {
        'orderID' : order_id,
        'comment': comment,
        'rating': rating,
        'type': 'Failure'

    }

    #get the items from the order
    suborder = SubOrder.objects.get(order = order, customer = order.customers.first())
    x = suborder.items.all()
    if oldRating is None:
        for item in x:
            newItemRating = item.totalRatings + 1
            if item.rating is None:
                item.rating = rating
            else:
                item.rating = ((item.rating * item.totalRatings) + rating)/newItemRating
            item.totalRatings = newItemRating
            item.save()
    
    else:
        for item in x:
            if item.rating is None:
                item.rating = rating
            else:
                item.rating = ((item.rating * (item.totalRatings-1)) + rating)/item.totalRatings
            item.save()

    order.save()

    return {
        'orderID' : order_id,
        'comment': comment,
        'rating': rating,
        'type': 'Success'
    }

