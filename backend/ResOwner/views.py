from typing import Any
from django import http
from django.shortcuts import render
from django.http import HttpRequest, HttpResponse
from django.contrib.auth.views import LoginView, LogoutView
from api.models import Restaurant, Customer, Order
from rest_framework import views, generics, permissions
from api.serializers import OrderDetailsSerializer
from django.core.cache import cache
from django.shortcuts import get_object_or_404
from .helper import setRestaurantOrderAvailable, getRestaurantOrderAvailable
from django.contrib.auth import decorators
from django.urls import reverse_lazy as reverse
from django.contrib import admin
# Create your views here.


class OwnerLoginView(LoginView):
    template_name = 'admin/login.html'
    next_page = reverse('owner-order-manage')
    redirect_authenticated_user = True
    extra_context = {
        'site_header': 'Restaurant Owner Login',
    }
    
    #Check if the user group is owner
    def post(self, request: HttpRequest, *args: str, **kwargs: Any) -> HttpResponse:
        form = self.get_form()

        if form.is_valid():
            username = request.POST['username']
            customer = Customer.objects.filter(username=username).first()

            if customer.groups.filter(name='RestaurantOwner').exists():
                return super().post(request, *args, **kwargs)
            else:
                form.add_error('username', 'Invalid username or password')
                return self.form_invalid(form)

        #return self.form_invalid(form)
        return super().post(request, *args, **kwargs)
    
class OrderListView(generics.ListAPIView):
    queryset = Order.objects.exclude(orderStatus__in=[Order.OrderStatusChoices.CANCELLED, Order.OrderStatusChoices.COMPLETE])
    serializer_class = OrderDetailsSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]

    def get_queryset(self):
        setRestaurantOrderAvailable(self.request.user.pk, False)
        return super().get_queryset().filter(restaurant__owner=self.request.user)
    
class OrderUpdatesAvailableView(views.APIView):
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]

    def get(self, request, *args, **kwargs):
        id = self.request.user.pk
        return http.JsonResponse({"available": getRestaurantOrderAvailable(id)})

class UpdateOrderView(generics.RetrieveUpdateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderDetailsSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]

    def get_object(self):
        obj = get_object_or_404(Order, pk=self.kwargs['pk'])
        if obj.restaurant.owner == self.request.user:
            return obj
        else:
            raise http.Http404()
    
    def perform_update(self, serializer):
        serializer.save()
        setRestaurantOrderAvailable(self.request.user.pk, True)

class OwnerLogoutView(LogoutView):
    next_page = reverse('owner-login')
    
@decorators.login_required(login_url=reverse('owner-login'))
@decorators.user_passes_test(lambda u: u.groups.filter(name='RestaurantOwner').exists())
def ManageOrdersView(request):
    return render(request, 'index.html')

class ToggleViewRestaurantAcceptingOrders(views.APIView):
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]

    def post(self, request, *args, **kwargs):
        restaurant = Restaurant.objects.filter(owner=self.request.user).first()
        restaurant.acceptingOrders = not restaurant.acceptingOrders
        restaurant.save()
        return http.JsonResponse({"available": restaurant.acceptingOrders})
    
    def get(self, request, *args, **kwargs):
        restaurant = Restaurant.objects.filter(owner=self.request.user).first()
        return http.JsonResponse({"available": restaurant.acceptingOrders})