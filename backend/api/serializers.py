from rest_framework import serializers
from .models import *
from OTPAuth.serializers import CustomerListSerializer

class CustomatizationOptionsSerializer(serializers.ModelSerializer):
    customization = serializers.CharField(source='customization.name', read_only=True)
    customizationID = serializers.IntegerField(source='customization.id', read_only=True)
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
    itemType = serializers.CharField(source='itemType.name', read_only=True)
    #create a field which is false if length of customization is 0
    hasCustomization = serializers.SerializerMethodField('get_hasCustomization')
    category = serializers.CharField(source='category.name', read_only= True)

    def get_hasCustomization(self, obj):
        if len(obj.item_customization.all()) > 0:
            return True
        else:
            return False

    class Meta:
        model = MenuItem
        fields = ['id','name', 'url', 'itemType', 'price', 'description', 'itemPhoto','hasCustomization','rating', 'totalRatings','dietaryType', 'category']

class MenuDetailsSerializer(serializers.ModelSerializer):
    customizations = MenuItemCustomizationSerializer(many=True, read_only=True, source='item_customization')
    class Meta:
        model = MenuItem
        fields = '__all__'

class RestaurantDetailsSerializer(serializers.ModelSerializer):
    menu = MenuListSerializer(many=True, read_only=True, source='restaurant')
    class Meta:
        model = Restaurant
        fields = ['id', 'name', 'phone', 'email', 'logo', 'restaurantType', 'menu', 'rating', 'totalRatings', 'acceptingOrders']

class RestaurantListSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='restaurant-details')
    class Meta:
        model = Restaurant
        fields = ['id', 'name', 'logo','url','rating', 'totalRatings', 'acceptingOrders']

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
        fields = ['id', 'url', 'restaurant', 'price', 'time']

class OrderDetailsSerializer(serializers.ModelSerializer):
    restaurant = RestaurantListSerializer(read_only=True)
    customers = SubOrderSerializer(many=True, read_only=True, source='order')
    
    class Meta:
        model = Order
        fields = '__all__'
        read_only_fields = ()
    
        


class CartSerializer(serializers.Serializer):
    #get menu item from primary key
    itemID = serializers.PrimaryKeyRelatedField(queryset=MenuItem.objects.all())

    class Meta:
        fields = ['itemID', 'quantity', 'customization']
        