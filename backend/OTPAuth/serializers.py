from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
Customer = get_user_model()

class CustomerDetailSerializer(serializers.ModelSerializer):
    #phone number cannot be updated once created
    class Meta:
        model = Customer
        fields = [ 'first_name','last_name', 'username', 'email' ]

    def update(self, instance, validated_data):
        validated_data.pop('username', None)
        return super().update(instance, validated_data)

class CustomerListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'first_name', 'last_name']
