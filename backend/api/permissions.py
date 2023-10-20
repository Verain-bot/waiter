from rest_framework import permissions, exceptions
from api.models import *
from OTPAuth.models import *
from django.shortcuts import get_object_or_404
from . import responseMessages as msg
#Permission to check if session has phone number and is verified

#Permission to check if order belongs to the customer
class IsCustomerOrder(permissions.BasePermission):
    message = 'You are not allowed to view this order'
    
    def has_object_permission(self, request, view, obj):
        #Check if customer is in list of customers
        return request.user in obj.customers.all()
    
class IsAcceptingOrder(permissions.BasePermission):
    message = 'This restaurant is not accepting orders at the moment'

    def has_permission(self, request, view):
        try:
            restaurantID = int(request.data.get('restaurantID'))
        except:
            raise exceptions.ValidationError
        restaurant = get_object_or_404(Restaurant, pk=restaurantID)
        return restaurant.acceptingOrders