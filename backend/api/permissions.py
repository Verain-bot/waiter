from rest_framework import permissions
from . import views as ListViews
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