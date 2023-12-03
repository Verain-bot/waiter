from django.urls import path, include
from rest_framework import routers
from . import views
from backend.urls import URL_FOR_APPS
from backend.mixins import URLEnumMixin
import enum

class URL_FOR_PAYMENTS(URLEnumMixin,enum.StrEnum):
    PHONE_PE_INITITATE = 'phonepe/initiate'
    PHONE_PE_CALLBACK = 'phonepe/callback'
    PHONE_PE_UPI_INTENT = 'phonepe/upi'
    PHONE_PE_CHECK_STATUS = 'phonepe/checkstatus'


    BASE = URL_FOR_APPS.PAYMENTS


urlpatterns = [
    path(URL_FOR_PAYMENTS.PHONE_PE_INITITATE, views.PaymentPhonePe.as_view(), name='phonepeinitiate'),
    path(URL_FOR_PAYMENTS.PHONE_PE_CALLBACK, views.PhonePeCallback.as_view(), name='phonepecallback'),
    path(URL_FOR_PAYMENTS.PHONE_PE_UPI_INTENT, views.PhonePeUPI_Intent.as_view(), name='phonepeupi'),
    path(URL_FOR_PAYMENTS.PHONE_PE_CHECK_STATUS, views.PhonePeCheckStatus.as_view(), name='phonepecheckstatus'),
    
]
