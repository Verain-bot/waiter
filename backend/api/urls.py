from django.urls import path, include
from rest_framework import routers
from . import views

urlpatterns = [
    path('restaurants/', views.RestraurantList.as_view(), name='restaurant-list'),
    path('restaurants/details/<int:pk>', views.RestaurantDetail.as_view(), name='restaurant-details'),
    path('menuitem/<int:pk>', views.MenuDetails.as_view(), name='menu-details'),
    path('create/', views.CustomerView.as_view(), name='customer'),
    path('login/', views.CustomerLogin.as_view(), name='customer-login'),
    path('otp/', views.VerifyOTP.as_view(), name='verify-otp'),
    path('account/', views.UpdateAccount.as_view(), name='update-account'),
    path('account/orders/', views.OrderList.as_view(), name='order-list'),
    path('account/orders/details/<int:pk>', views.OrderDetails.as_view(), name='order-details'),
]