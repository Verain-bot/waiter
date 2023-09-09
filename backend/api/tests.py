from django.test import TestCase, Client
from backend.tests import TestBase
from .models import *
from rest_framework.test import APIClient
from django.core.cache import cache
from . import responseMessages as msg
from .urls import API_URLS
#Testing views
class TestViews(TestBase):
    #reset cache

    def test_restaurant_list_GET(self):
        response = self.client.get(API_URLS.RESTAURANT_LIST.getURL())
        self.assertEquals(response.status_code, 200)
        response = response.json()
        self.assertEquals(response['count'], 2)
        self.assertEquals(response['results'][0]['name'], 'Bar')
        
        #check if json contains url
        self.assertEquals(response['results'][0]['url'], API_URLS.RESTAURANT_DETAILS.getTestURL(pk=1))


    def test_restaurant_detail_GET(self):
        response = self.client.get(API_URLS.RESTAURANT_DETAILS.getURL(pk=1))
        self.assertEquals(response.status_code, 200)
        response = response.json()
        self.assertEquals(response['name'], 'Bar')
        
        #check length of menu
        self.assertEquals(len(response['menu']), 3)

        #check if menu contains url
        self.assertEquals(response['menu'][0]['url'], API_URLS.MENU_DETAILS.getTestURL(pk=1))
    
    def test_menu_detail_GET(self):
        response = self.client.get(API_URLS.MENU_DETAILS.getURL(pk=1))
        self.assertEquals(response.status_code, 200)
        response = response.json()
        self.assertEquals(response['name'], 'LIIT')
        self.assertEquals(response['price'], 100)
        #Check for 2 customizations
        self.assertEquals(len(response['customizations']), 2)

        #Check for customization options
        self.assertEquals(len(response['customizations'][0]['customizationOptions']), 3)

    
    #Order list view
    def test_order_list_GET_LoggedOut(self):
        response = self.client.get(API_URLS.ORDER_LIST.getURL())
        self.assertEquals(response.status_code, 403)

    def test_order_list_GET(self):
        self.login()
        response = self.client.get(API_URLS.ORDER_LIST.getURL())
        self.assertEquals(response.status_code, 200)
        response = response.json()
        self.assertEquals(response['count'], 2)
        self.assertEquals(response['results'][0]['id'], 3)
        self.assertEquals(response['results'][0]['url'], API_URLS.ORDER_DETAILS.getTestURL(pk=3))
        
    
    def test_order_detail_GET_LoggedOut(self):
        response = self.client.get(API_URLS.ORDER_DETAILS.getURL(pk=1))
        self.assertEquals(response.status_code, 403)

    def test_order_detail_GET(self):
        self.login()
        response = self.client.get(API_URLS.ORDER_DETAILS.getURL(pk=1))
        self.assertEquals(response.status_code, 200)
        response = response.json()
        self.assertEquals(response['id'], 1)

        #check that 2 customers created the order
        self.assertEquals(len(response['customers']), 2)
        
        #check that 2 items are in the order by customer 1
        self.assertEquals(len(response['customers'][0]['items']), 2)

        #check customizations for the first item

        self.assertEquals(len(response['customers'][0]['items'][0]['quantity']), 1)
        self.assertEquals(len(response['customers'][0]['items'][0]['quantity'][0]['option']), 2)

    def test_order_detail_GET_InvalidOrder(self):
        self.login()
        response = self.client.get(API_URLS.ORDER_DETAILS.getURL(pk=2))
        self.assertEquals(response.status_code, 403)
