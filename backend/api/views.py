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
from .helper import validateCartData
def index(request):
    return HttpResponse('First')

# Create your views here.
class RestraurantList(generics.ListAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantListSerializer

class RestaurantDetail(generics.RetrieveAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantDetailsSerializer

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
        
        x = validateCartData(request.data.get('cart'), request.data.get('restaurantID'))

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

        return Response(msg.ORDER_CREATED(x['price'],order.pk), status=200)
        
        
        # cart = json.loads(request.data.get('cart'))
        # restaurantID = request.data.get('restaurantID')

        # #check if all the items in the cart are from the same restaurant
        # if any(int(item['restaurantID']) != int(restaurantID) for item in cart):
        #     return Response(msg.INVALID_REQUEST, status=400)
        
        # #check if the restaurant exists
        # restaurant = get_object_or_404(Restaurant, pk=restaurantID)

        # orderPrice = 0


        # #create the order
        # order = Order.objects.create(restaurant=restaurant)
        # suborder = SubOrder.objects.create(order=order, customer=request.user)
        
        # for item in cart:
        #     #get the menu item
        #     menuItem = get_object_or_404(MenuItem, pk=item['menuItemID'])
            
        #     #create the item detail
        #     itemDetail = ItemDetail.objects.create(suborder=suborder, item=menuItem)
            
        #     #create the quantity
        #     for customization in item['customizations']:
        #         q = customization['quantity']
        #         customizations = customization['customizations']
                
        #         quantity = Quantity.objects.create(itemDetail=itemDetail, qty=q)
        #         qtyPrice = (menuItem.price)*q

        #         for customizationDetails in customizations:
        #             custID = customizationDetails['CustomizationID']

        #             options = customizationDetails['Options']
        #             for option in options:
        #                 optionID = option['id']
        #                 optionObj = get_object_or_404(CustomatizationOptions, pk=optionID)

        #                 #add the option to the quantity
        #                 quantity.option.add(optionObj)
        #                 qtyPrice += optionObj.price*q
                
        #         quantity.price = qtyPrice
        #         quantity.save()
        #         orderPrice += qtyPrice
            

        #     suborder.price = orderPrice
        #     order.price = orderPrice
        #     order.save()
        #     suborder.save()
        # return Response('done', status=200)

class CartTotalPriceView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        
        x = validateCartData(request.data.get('cart'), request.data.get('restaurantID'))

        if (not x):
            return Response(msg.INVALID_REQUEST, status=400)

        price = x['price']
        return Response(price, status=200)