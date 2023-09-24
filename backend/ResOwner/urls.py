from django.urls import path, include
from rest_framework import routers
from . import views
from backend.urls import URL_FOR_APPS
from backend.mixins import URLEnumMixin
import enum

class URL_FOR_RESOwner(URLEnumMixin,enum.StrEnum):
    OWNER_LOGIN = 'login/'
    OWNER_ORDER_LIST = 'orders/'
    OWNER_ORDER_GETUPDATES = 'orders/available'
    OWNER_UPDATE_ORDER_STATUS = 'orders/update/<int:pk>'

    BASE = URL_FOR_APPS.RES_OWNER


urlpatterns = [
    path(URL_FOR_RESOwner.OWNER_LOGIN, views.OwnerLoginView.as_view(), name='owner-login'),    
    path(URL_FOR_RESOwner.OWNER_ORDER_LIST, views.OrderListView.as_view(), name='owner-order-list'),    
    path(URL_FOR_RESOwner.OWNER_ORDER_GETUPDATES, views.OrderUpdatesAvailableView.as_view(), name='owner-order-updates'),    
    path(URL_FOR_RESOwner.OWNER_UPDATE_ORDER_STATUS, views.UpdateOrderView.as_view(), name='owner-order-updates'),    
    
]
