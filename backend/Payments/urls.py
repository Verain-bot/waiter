from django.urls import path, include
from rest_framework import routers
from . import views
from backend.urls import URL_FOR_APPS
from backend.mixins import URLEnumMixin
import enum

class URL_FOR_PAYMENTS(URLEnumMixin,enum.StrEnum):
    ONE = ''
    TWO = 'two'

    BASE = URL_FOR_APPS.PAYMENTS


urlpatterns = [
    path(URL_FOR_PAYMENTS.ONE, views.PaymentPhonePe.as_view(), name='index'),
    path(URL_FOR_PAYMENTS.TWO, views.PaymentPhonePeCallback.as_view(), name='index2'),
]
