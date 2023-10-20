from rest_framework import permissions ,exceptions
from .enums import Ath
#Permission to check if session has phone number and is verified
class IsVerified(permissions.BasePermission):
    message = 'You are not Verified. Please verify your phone number'

    def has_permission(self, request, view):
        if request.session.get(Ath.PHONE, False) and request.session.get(Ath.IS_VERIFIED, False) == True or request.user.is_authenticated:
            return True
        
        raise exceptions.PermissionDenied(self.message)

class IsLoggedOut(permissions.BasePermission):
    message = 'You are already logged in'

    def has_permission(self, request, view):
        return not request.user.is_authenticated
    