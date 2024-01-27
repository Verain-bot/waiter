from django.urls import path, include
from rest_framework import routers
from . import views
from backend.urls import URL_FOR_APPS
from backend.mixins import URLEnumMixin
import enum

class URL_FOR_PAYMENTS(URLEnumMixin,enum.StrEnum):
    RAZORPAY_INITITATE = 'razorpay/initiate/'
    RAZORPAY_CHECK_STATUS = 'razorpay/checkstatus/'
    RAZORPAY_CALLBACK = 'razorpay/callback/'

    BASE = URL_FOR_APPS.PAYMENTS


urlpatterns = [
    path(URL_FOR_PAYMENTS.RAZORPAY_INITITATE, views.RazorPayPayment.as_view(), name='razorpayinitiate'),
    path(URL_FOR_PAYMENTS.RAZORPAY_CHECK_STATUS, views.RazorPayCheckStatus.as_view(), name='razorpaycheckstatus'),
    path(URL_FOR_PAYMENTS.RAZORPAY_CALLBACK, views.RazorPayCallback.as_view(), name='razorpaycallback'),
]
