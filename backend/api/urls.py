from django.urls import path, include
from rest_framework import routers
from . import views
from backend.urls import URL_FOR_APPS
import enum
import re

class API_URLS(enum.StrEnum):
    RESTAURANT_LIST = 'restaurants/'
    RESTAURANT_DETAILS = 'restaurants/details/<int:pk>'
    MENU_DETAILS = 'menu/details/<int:pk>'
    ORDER_LIST = 'account/orders/'
    ORDER_DETAILS = 'account/orders/details/<int:pk>'

    def getURL(self, **kwargs):
        x = self.value

        for key, value in kwargs.items():
            x = re.sub(f'<...:{key}>', str(value), x)

        return '/'+URL_FOR_APPS.API+x
    
    def getTestURL(self, **kwargs):
        x = self.getURL(**kwargs)
        return 'http://testserver'+x


urlpatterns = [
    path(API_URLS.RESTAURANT_LIST, views.RestraurantList.as_view(), name='restaurant-list'),
    path(API_URLS.RESTAURANT_DETAILS, views.RestaurantDetail.as_view(), name='restaurant-details'),
    path(API_URLS.MENU_DETAILS, views.MenuDetails.as_view(), name='menu-details'),
    path(API_URLS.ORDER_LIST, views.OrderList.as_view(), name='order-list'),
    path(API_URLS.ORDER_DETAILS, views.OrderDetails.as_view(), name='order-details'),
]
