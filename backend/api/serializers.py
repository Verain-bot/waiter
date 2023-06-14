from rest_framework import serializers
from .models import *

class MenuListSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='menu-details')
    class Meta:
        model = MenuItem
        fields = ['name', 'url']

class MenuDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = '__all__'

class RestaurantDetailsSerializer(serializers.ModelSerializer):
    menu = MenuListSerializer(many=True, read_only=True, source='restaurant')
    class Meta:
        model = Restaurant
        fields = ['id', 'name', 'phone', 'email', 'logo', 'menu']

class RestaurantListSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='restaurant-details')
    class Meta:
        model = Restaurant
        fields = ['id', 'name', 'logo','url']

class CustomerDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'
class CustomerListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'name']

class OrderItemDetailsSerializer(serializers.ModelSerializer):
    item = MenuListSerializer(read_only=True)
    class Meta:
        model = ItemDetail
        fields = '__all__'

class SubOrderSerializer(serializers.ModelSerializer):
    items = OrderItemDetailsSerializer(many=True, read_only=True, source='suborder')
    customer = CustomerListSerializer(read_only=True)
    class Meta:
        model = SubOrder
        fields = '__all__'

#Order list Serializer
class OrderListSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='order-details')
    restaurant = RestaurantListSerializer(read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'url', 'restaurant']

class OrderDetailsSerializer(serializers.ModelSerializer):
    restaurant = RestaurantListSerializer(read_only=True)
    items = MenuListSerializer(many=True, read_only=True)
    customers = SubOrderSerializer(many=True, read_only=True, source='order')

    class Meta:
        model = Order
        fields = '__all__'
