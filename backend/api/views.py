import json
from django.shortcuts import render,get_object_or_404
from django.http import HttpResponse
from rest_framework import views, generics, viewsets
from .serializers import *
from rest_framework.response import Response
from django.core.cache import cache
from .permissions import *
from . import responseMessages as msg
from rest_framework.permissions import IsAuthenticated
from .helper import validate_cart_data
from .tasks import cancel_order_if_not_accepted
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from ResOwner.helper import setRestaurantOrderAvailable

def index(request):
    return HttpResponse('First')

# Create your views here.
@method_decorator(cache_page(60 * 10), name='dispatch')
class RestraurantList(generics.ListAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantListSerializer

@method_decorator(cache_page(60 * 10), name='dispatch')
class RestaurantDetail(generics.RetrieveAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantDetailsSerializer

@method_decorator(cache_page(60 * 10), name='dispatch')
class MenuDetails(generics.RetrieveAPIView):
    queryset = MenuItem.objects.all()
    serializer_class = MenuDetailsSerializer

class OrderList(generics.ListAPIView):
    #queryset contains all the orders of the customer
    queryset = Order.objects.all()
    serializer_class = OrderListSerializer
    permission_classes = [IsAuthenticated, IsCustomerOrder]

    def get_queryset(self):
        return super().get_queryset().filter(customers__username=self.request.user.username)

class OrderDetails(generics.RetrieveAPIView):

    queryset = Order.objects.all()
    serializer_class = OrderDetailsSerializer
    permission_classes = [IsAuthenticated, IsCustomerOrder]

class OrderCreate(views.APIView):

    permission_classes = [IsAuthenticated, IsAcceptingOrder]

    def post(self, request, *args, **kwargs):
        
        x = validate_cart_data(request.data.get('cart'), request.data.get('restaurantID'))
        
        if (not x):
            return Response(msg.INVALID_REQUEST, status=400)

        restaurant = x['restaurant']
        items = x['items']

        order = Order.objects.create(restaurant=restaurant)
        suborder = SubOrder.objects.create(order=order, customer=request.user)
        orderPrice = 0

        for item in items:
            menuItem = item['menuItem']
            customizations = item['customizations']
            
            itemDetail = ItemDetail.objects.create(suborder=suborder, item=menuItem)

            for customization in customizations:
                q = customization['quantity']
                options = customization['options']
                
                quantity = Quantity.objects.create(itemDetail=itemDetail, qty=q)
                qtyPrice = (menuItem.price)*q

                for customizationOption in options:
                    quantity.option.add(customizationOption)
                    qtyPrice += customizationOption.price*q
            
                quantity.price = qtyPrice
                quantity.save()
                orderPrice += qtyPrice
            

        suborder.price = orderPrice
        order.price = orderPrice
        order.save()
        suborder.save()

        setRestaurantOrderAvailable(restaurant.owner.pk, True)
        cancel_order_if_not_accepted.apply_async((order.pk,), countdown=120)

        return Response(msg.ORDER_CREATED(x['price'],order.pk), status=200)
        
class CartTotalPriceView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        
        x = validate_cart_data(request.data.get('cart'), request.data.get('restaurantID'))

        if (not x):
            return Response(msg.INVALID_REQUEST, status=400)

        price = x['price']
        return Response(msg.CART_PRICE(price), status=200)
    
