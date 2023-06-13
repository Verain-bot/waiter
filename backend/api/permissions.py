from rest_framework import permissions

#Permission to check if session has phone number and is verified
class IsCustomer(permissions.BasePermission):
    message = 'You are not logged in'

    def has_permission(self, request, view):
        if 'phone' in request.session and 'is_verified' in request.session and request.session['is_verified']:
            return True
        return False