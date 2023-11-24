from django.test import TestCase
from backend.tests import TestBase
# Create your tests here.
from .urls import URL_FOR_RESOwner as URL
from api.models import *
from api.serializers import OrderDetailsSerializer
import time
from api.urls import API_URLS
from rest_framework.response import Response
class TestViews(TestBase):


    def test_ORDER_LIST_GET(self):
        x = self.client.login(username=self.owner1, password='test')
        self.assertTrue(x)
        response = self.client.get(URL.OWNER_ORDER_LIST.getURL())
        self.assertEqual(response.status_code, 200)
        response = response.json()

        self.assertEqual(response['count'], 2)

        o = Order.objects.filter(restaurant = Restaurant.objects.get(pk=self.bar_res.pk)).first()
        o.orderStatus = Order.OrderStatusChoices.CANCELLED
        o.save()

        response = self.client.get(URL.OWNER_ORDER_LIST.getURL())
        self.assertEqual(response.status_code, 200)
        response = response.json()

        self.assertEqual(response['count'], 1)

        o = Order.objects.filter(restaurant = Restaurant.objects.get(pk=self.bar_res.pk)).last()
        o.orderStatus = Order.OrderStatusChoices.COMPLETE
        o.save()

        response = self.client.get(URL.OWNER_ORDER_LIST.getURL())
        self.assertEqual(response.status_code, 200)
        response = response.json()

        self.assertEqual(response['count'], 0)

    def test_UPDATE_ORDER(self):
        x =self.client.login(username=self.owner1.get_username(), password='test')
        self.assertTrue(x)

        o = Order.objects.last()
        self.assertEqual(o.orderStatus, Order.OrderStatusChoices.NOT_CONFIRMED)

        response = self.client.put(URL.OWNER_UPDATE_ORDER_STATUS.getURL(pk=o.pk), {'orderStatus': Order.OrderStatusChoices.COMPLETE}, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        response = response.json()
        self.assertEqual(response['orderStatus'], Order.OrderStatusChoices.COMPLETE)

        response = self.client.put(URL.OWNER_UPDATE_ORDER_STATUS.getURL(pk=o.pk), {'orderStatus': Order.OrderStatusChoices.CANCELLED}, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        response = response.json()
        self.assertEqual(response['orderStatus'], Order.OrderStatusChoices.COMPLETE)

        price = o.price
        response = self.client.patch(URL.OWNER_UPDATE_ORDER_STATUS.getURL(pk=o.pk), {'price': price+21}, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        response = response.json()
        self.assertEqual(response['price'], price)
        self.assertEqual(response['orderStatus'], Order.OrderStatusChoices.COMPLETE)

        #for order belonging to other restaurant
        r = Restaurant.objects.get(name='Pizza')
        o = Order.objects.filter(restaurant=r).first()
        response = self.client.put(URL.OWNER_UPDATE_ORDER_STATUS.getURL(pk=o.pk), {'orderStatus': Order.OrderStatusChoices.COMPLETE}, content_type='application/json')
        self.assertEqual(response.status_code, 404)

    def test_TOGGLE_TAKING_ORDER(self):
        self.client.login(username=self.owner1.get_username(), password='test')
        response = self.client.get(URL.OWNER_ACCEPTING_ORDERS.getURL())
        self.assertEqual(response.status_code, 200)
        response = response.json()
        self.assertEqual(response['available'], True)       

        response = self.client.post(URL.OWNER_ACCEPTING_ORDERS.getURL(),{'available': False})
        self.assertEqual(response.status_code, 200)
        response = response.json()
        self.assertEqual(response['available'], False)       
        self.assertFalse(Restaurant.objects.first().acceptingOrders)
    
    def test_ORDER_UPDATES_AVAILABLE(self):
        self.client2.login(username=self.owner1.get_username(), password='test')
        response = self.client2.get(URL.OWNER_ORDER_GETUPDATES.getURL())
        self.assertEqual(response.status_code, 200)
        response = response.json()
        self.assertEqual(response['available'], None)

        response = self.client2.get(URL.OWNER_ORDER_LIST.getURL())
        response = self.client2.get(URL.OWNER_ORDER_GETUPDATES.getURL())
        self.assertEqual(response.status_code, 200)
        response = response.json()
        self.assertEqual(response['available'], False)


        self.login()
        cart = self.Cart(self.bar_res.pk)
        items = cart.getRestaurantItems()
        cart.addItem(items[0])
        cart.addItemDetails(2)
        customizations = cart.getMenuCustomizations(items[0])
        
        cart.addCustomization(customizations[0][0])
        customizationOptions = cart.getCustomizationOptions(customizations[0][0])
        cart.addOption(customizationOptions[0])

        pk1 = cart.getPK()
        response = self.client.post(API_URLS.ORDER_CREATE.getURL(), cart.toFormData(), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        time.sleep(0.5)



        response = self.client2.get(URL.OWNER_ORDER_GETUPDATES.getURL())
        self.assertEqual(response.status_code, 200)
        response = response.json()
        self.assertEqual(response['available'], True)

        
        response = self.client2.get(URL.OWNER_ORDER_LIST.getURL())
        self.assertEqual(response.status_code, 200)

        response = self.client2.get(URL.OWNER_ORDER_GETUPDATES.getURL())
        self.assertEqual(response.status_code, 200)
        response = response.json()
        self.assertEqual(response['available'], False)