from rest_framework import permissions
from api.models import *
from OTPAuth.models import *
from django.shortcuts import get_object_or_404
#Permission to check if session has phone number and is verified

#Permission to check if order belongs to the customer
class IsCustomerOrder(permissions.BasePermission):
    message = 'You are not allowed to view this order'
    
    def has_object_permission(self, request, view, obj):
        #Check if customer is in list of customers
        return request.user in obj.customers.all()
    
