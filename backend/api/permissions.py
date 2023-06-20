from rest_framework import permissions
from .models import *
from django.shortcuts import get_object_or_404
#Permission to check if session has phone number and is verified
class IsCustomer(permissions.BasePermission):
    message = 'You are not logged in'

    def has_permission(self, request, view):
        if 'phone' in request.session and 'is_verified' in request.session and request.session['is_verified']:
            return True
        return False

#Permission to check if order belongs to the customer
class IsCustomerOrder(permissions.BasePermission):
    message = 'You are not allowed to view this order'
    
    def has_object_permission(self, request, view, obj):
        #Check if customer is in list of customers
        return int(request.session['phone']) in [customer.phone for customer in obj.customers.all()]
    
#Permission to check if table is assigned to the customer
class IsTableAssigned(permissions.BasePermission):
    message = 'Table is not assigned to you'
    
    def has_permission(self, request, view):
        if 'table' in request.session:
            
            table = get_object_or_404(Tables, tableNumber=request.session['table'], restaurant=Restaurant.objects.get(pk = request.session['restaurant']))
            #table has customer on it
            if table.status == 'Occupied' and int(request.session['phone']) in [customer.phone for customer in table.customersSitting.all()]:
                return True
            return False
        return False
