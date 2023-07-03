from rest_framework import serializers
from .models import *

class CustomatizationOptionsSerializer(serializers.ModelSerializer):
    customization = serializers.CharField(source='customization.name', read_only=True)
    class Meta:
        model = CustomatizationOptions
        fields = '__all__'

class MenuItemCustomizationSerializer(serializers.ModelSerializer):
    customizationOptions = CustomatizationOptionsSerializer(many=True, read_only=True, source='customization_options')
    class Meta:
        model = MenuItemCustomization
        fields = '__all__'

class MenuListSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='menu-details')
    class Meta:
        model = MenuItem
        fields = ['name', 'url']

class MenuDetailsSerializer(serializers.ModelSerializer):
    customizations = MenuItemCustomizationSerializer(many=True, read_only=True, source='item_customization')
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

class QuantitySerializer(serializers.ModelSerializer):
    option = CustomatizationOptionsSerializer(read_only=True,many=True)
    class Meta:
        model = Quantity
        fields = '__all__'

class OrderItemDetailsSerializer(serializers.ModelSerializer):
    item = MenuListSerializer(read_only=True)
    quantity = QuantitySerializer(read_only=True, source='itemDetail',many=True)

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
    customers = SubOrderSerializer(many=True, read_only=True, source='order')

    class Meta:
        model = Order
        fields = '__all__'

class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tables
        fields = '__all__'

class CartSerializer(serializers.Serializer):
    #get menu item from primary key
    itemID = serializers.PrimaryKeyRelatedField(queryset=MenuItem.objects.all())

    class Meta:
        fields = ['itemID', 'quantity', 'customization']