from django.urls import path, include
from rest_framework import routers
from . import views

urlpatterns = [
    path('restaurants/', views.RestraurantList.as_view(), name='restaurant-list'),
    path('restaurants/details/<int:pk>', views.RestaurantDetail.as_view(), name='restaurant-details'),
    path('menu/details/<int:pk>', views.MenuDetails.as_view(), name='menu-details'),
    path('create/', views.CustomerView.as_view(), name='customer'),
    path('restaurants/<int:pk>/tables', views.TableListView.as_view(), name='table-list'),
    path('login/', views.CustomerLogin.as_view(), name='customer-login'),
    path('otp/', views.VerifyOTP.as_view(), name='verify-otp'),
    path('account/', views.UpdateAccount.as_view(), name='update-account'),
    path('account/orders/', views.OrderList.as_view(), name='order-list'),
    path('account/orders/details/<int:pk>', views.OrderDetails.as_view(), name='order-details'),
    path('restaurants/<int:pk>/table/assign/', views.AssignTable.as_view(), name='assign-table'),
    path('restaurants/<int:pk>/table/join/', views.JoinTable.as_view(), name='join-table'),
    path('table/view/', views.CheckTable.as_view(), name='view-table'),
    path('account/cart/', views.ViewUpdateCart.as_view(), name='request-table'),
]