from django.urls import path, include
from rest_framework import routers
from . import views
from backend.urls import URL_FOR_APPS

import enum

class URL_FOR_OTPAuth(enum.StrEnum):
    CREATE = 'create/'
    LOGIN = 'login/'
    SEND_OTP = 'verify/phone/'
    ENTER_OTP = 'otp/'
    ACCOUNT_VIEW_UPDATE = 'account/'
    LOGOUT = 'logout/'

    def fullUrl(self):
        return '/'+str(URL_FOR_APPS.OTP_AUTH) + str(self.value)


urlpatterns = [
    path(URL_FOR_OTPAuth.CREATE, views.RegisterView.as_view(), name='create-customer'),
    path(URL_FOR_OTPAuth.LOGIN, views.CustomerLogin.as_view(), name='customer-login'),
    path(URL_FOR_OTPAuth.SEND_OTP, views.SendOTPView.as_view(), name='send-otp'),
    path(URL_FOR_OTPAuth.ENTER_OTP, views.VerifyOTPView.as_view(), name='verify-otp'),
    path(URL_FOR_OTPAuth.ACCOUNT_VIEW_UPDATE, views.ViewUpdateAccountView.as_view(), name='update-account'),
    path(URL_FOR_OTPAuth.LOGOUT, views.CustomerLogout.as_view(), name='customer-logout'),
    
]
