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
        else:
            raise Exception('Comment is None')
        
        if rating is not None and rating>0 and rating <6:
            order.rating = rating
        else:
            raise Exception('Rating is None')
    
    except:
        return {
        'orderID' : order_id,
        'comment': comment,
        'rating': rating,
        'type': 'Failure'

    }

    #get the items from the order
    suborder = SubOrder.objects.get(order = order, customer = order.customers.first())
    restaurant = order.restaurant

    x = suborder.items.all()
    if oldRating is None:
        if restaurant.rating is None:
            restaurant.rating = rating
        else:
            restaurant.rating = ((restaurant.rating * restaurant.totalRatings) + rating)/(restaurant.totalRatings + 1)

        restaurant.totalRatings += 1
        for item in x:
            newItemRating = item.totalRatings + 1
            if item.rating is None:
                item.rating = rating
            else:
                item.rating = ((item.rating * item.totalRatings) + rating)/newItemRating
            item.totalRatings = newItemRating
            item.save()
    
    else:
        restaurant.rating = ((restaurant.rating * restaurant.totalRatings) - oldRating + rating)/restaurant.totalRatings
        for item in x:
            if item.rating is None:
                item.rating = rating
            else:
                item.rating = ((item.rating * (item.totalRatings-1)) + rating)/item.totalRatings
            item.save()

    order.save()
    restaurant.save()

    return {
        'orderID' : order_id,
        'comment': comment,
        'rating': rating,
        'type': 'Success'
    }

