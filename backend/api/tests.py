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
        self.assertEquals(response['count'], Restaurant.objects.count())
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

    def test_order_create_POST(self):
        self.login()
        cart = self.Cart(2)
        items = cart.getRestaurantItems()
        cart.addItem(items[0])
        cart.addItemDetails(2)
        customizations = cart.getMenuCustomizations(items[0])
        
        cart.addCustomization(customizations[0][0])
        customizationOptions = cart.getCustomizationOptions(customizations[0][0])
        cart.addOption(customizationOptions[0])

        pk1 = cart.getPK()
        response = self.client.post(API_URLS.ORDER_CREATE.getURL(), cart.toFormData(), content_type='application/json')
        self.assertEquals(response.status_code, 200)
        pk2 = cart.getPK()
        self.assertNotEquals(pk1, pk2)

        order = cart.getLastOrder()
        self.assertEquals(order.restaurant,Restaurant.objects.get(pk=2))

        orderItems = cart.getOrderItems(order.pk)
        self.assertEquals(orderItems.count(), 1)

        orderItem_Quantity = cart.getItemQuantity(orderItems.first().pk)
        self.assertEquals(orderItem_Quantity.count(), 1)
        self.assertEquals(orderItem_Quantity.first().qty, 2)

        orderItem_Quantity_Options = cart.getQuantityOptions(orderItem_Quantity.first().pk)
        self.assertEquals(orderItem_Quantity_Options.count(), 1)
        self.assertEquals(orderItem_Quantity_Options.first().pk, customizationOptions[0])

        self.assertEquals(response.json(), msg.ORDER_CREATED(cart.getPrice(), cart.getPK()))
    
    def test_order_create_POST_many_Items(self):
        self.login()
        cart = self.Cart(3)
        optionsGiven = []
        items = cart.getRestaurantItems()

        #add item 1
        cart.addItem(items[0])
        cart.addItemDetails(11)
        customizations = cart.getMenuCustomizations(items[0])
        
        #radio customization
        optionsGiven.append([])
        cart.addCustomization(customizations[0][0])
        customizationOptions = cart.getCustomizationOptions(customizations[0][0])
        cart.addOption(customizationOptions[0])
        optionsGiven[-1].append(customizationOptions[0])

        #checkbox customization
        cart.addCustomization(customizations[1][0])
        customizationOptions = cart.getCustomizationOptions(customizations[1][0])
        cart.addOption(customizationOptions[0])
        cart.addOption(customizationOptions[1])
        cart.addOption(customizationOptions[2])
        optionsGiven[-1].append(customizationOptions[0])
        optionsGiven[-1].append(customizationOptions[1])
        optionsGiven[-1].append(customizationOptions[2])
        
        #add item 2
        cart.addItem(items[1])
        cart.addItemDetails(12)
        customizations = cart.getMenuCustomizations(items[1])

        #radio customization
        optionsGiven.append([])
        cart.addCustomization(customizations[0][0])
        customizationOptions = cart.getCustomizationOptions(customizations[0][0])
        cart.addOption(customizationOptions[0])
        optionsGiven[-1].append(customizationOptions[0])
        #checkbox customization
        cart.addCustomization(customizations[1][0])
        
        customizationOptions = cart.getCustomizationOptions(customizations[1][0])
        cart.addOption(customizationOptions[0])
        cart.addOption(customizationOptions[1])
        optionsGiven[-1].append(customizationOptions[0])
        optionsGiven[-1].append(customizationOptions[1])

        #add item 3
        cart.addItem(items[4])
        cart.addItemDetails(13)
        customizations = cart.getMenuCustomizations(items[2])

        #radio customization
        optionsGiven.append([])
        cart.addCustomization(customizations[0][0])
        customizationOptions = cart.getCustomizationOptions(customizations[0][0])
        cart.addOption(customizationOptions[0])
        optionsGiven[-1].append(customizationOptions[0])

        #checkbox customization
        cart.addCustomization(customizations[1][0])
        customizationOptions = cart.getCustomizationOptions(customizations[1][0])
        cart.addOption(customizationOptions[0])
        optionsGiven[-1].append(customizationOptions[0])


        pk1 = cart.getPK()
        response = self.client.post(API_URLS.ORDER_CREATE.getURL(), cart.toFormData(), content_type='application/json')
        self.assertEquals(response.status_code, 200)
        pk2 = cart.getPK()
        self.assertNotEquals(pk1, pk2)

        order = cart.getLastOrder()
        self.assertEquals(order.restaurant,Restaurant.objects.get(pk=3))

        orderItems = cart.getOrderItems(order.pk)
        self.assertEquals(orderItems.count(), 3)

        for idx ,orderItem in enumerate(orderItems):
            orderItem_Quantity = cart.getItemQuantity(orderItem.pk)
            self.assertEquals(orderItem_Quantity.count(), 1)
            self.assertEquals(orderItem_Quantity.first().qty, [11,12,13][idx])
            
            orderItem_Quantity_Options = cart.getQuantityOptions(orderItem_Quantity.first().pk)
            self.assertEquals(orderItem_Quantity_Options.count(), [4,3,2][idx])

            for idx2, option in enumerate(orderItem_Quantity_Options):
                self.assertEquals(option.pk, optionsGiven[idx][idx2])

        self.assertEquals(response.json(), msg.ORDER_CREATED(cart.getPrice(), cart.getPK()))
    
    def test_order_create_POST_many_Items_Multiple_Quantities(self):
        self.login()
        cart = self.Cart(3)
        optionsGiven = []
        items = cart.getRestaurantItems()

        #add item 1
        cart.addItem(items[0])

        cart.addItemDetails(11)
        customizations = cart.getMenuCustomizations(items[0])
        
        #radio customization
        optionsGiven.append([[]])
        cart.addCustomization(customizations[0][0])
        customizationOptions = cart.getCustomizationOptions(customizations[0][0])
        cart.addOption(customizationOptions[0])
        optionsGiven[-1][-1].append(customizationOptions[0])

        #checkbox customization
        cart.addCustomization(customizations[1][0])
        customizationOptions = cart.getCustomizationOptions(customizations[1][0])
        cart.addOption(customizationOptions[0])
        cart.addOption(customizationOptions[1])
        cart.addOption(customizationOptions[2])
        optionsGiven[-1][-1].append(customizationOptions[0])
        optionsGiven[-1][-1].append(customizationOptions[1])
        optionsGiven[-1][-1].append(customizationOptions[2])
        
        #add new quantity
        cart.addItemDetails(21)
        customizations = cart.getMenuCustomizations(items[0])
        
        #radio customization
        optionsGiven[-1].append([])
        cart.addCustomization(customizations[0][0])
        customizationOptions = cart.getCustomizationOptions(customizations[0][0])
        cart.addOption(customizationOptions[1])
        optionsGiven[-1][-1].append(customizationOptions[1])

        #checkbox customization
        cart.addCustomization(customizations[1][0])
        customizationOptions = cart.getCustomizationOptions(customizations[1][0])
        cart.addOption(customizationOptions[0])
        cart.addOption(customizationOptions[1])
        cart.addOption(customizationOptions[2])
        optionsGiven[-1][-1].append(customizationOptions[0])
        optionsGiven[-1][-1].append(customizationOptions[1])
        optionsGiven[-1][-1].append(customizationOptions[2])
        
        #add item 2
        cart.addItem(items[1])
        cart.addItemDetails(12)
        customizations = cart.getMenuCustomizations(items[1])

        #radio customization
        optionsGiven.append([[]])
        cart.addCustomization(customizations[0][0])
        customizationOptions = cart.getCustomizationOptions(customizations[0][0])
        cart.addOption(customizationOptions[0])
        optionsGiven[-1][-1].append(customizationOptions[0])
        #checkbox customization
        cart.addCustomization(customizations[1][0])
        customizationOptions = cart.getCustomizationOptions(customizations[1][0])
        cart.addOption(customizationOptions[0])
        cart.addOption(customizationOptions[1])
        optionsGiven[-1][-1].append(customizationOptions[0])
        optionsGiven[-1][-1].append(customizationOptions[1])

        #add item 3
        cart.addItem(items[4])
        cart.addItemDetails(13)
        customizations = cart.getMenuCustomizations(items[2])

        #radio customization
        optionsGiven.append([[]])
        cart.addCustomization(customizations[0][0])
        customizationOptions = cart.getCustomizationOptions(customizations[0][0])
        cart.addOption(customizationOptions[0])
        optionsGiven[-1][-1].append(customizationOptions[0])

        #checkbox customization
        cart.addCustomization(customizations[1][0])
        customizationOptions = cart.getCustomizationOptions(customizations[1][0])
        cart.addOption(customizationOptions[0])
        optionsGiven[-1][-1].append(customizationOptions[0])
        

        pk1 = cart.getPK()
        response = self.client.post(API_URLS.ORDER_CREATE.getURL(), cart.toFormData(), content_type='application/json')
        self.assertEquals(response.status_code, 200)
        pk2 = cart.getPK()
        self.assertNotEquals(pk1, pk2)

        order = cart.getLastOrder()

        items = cart.getOrderItems(order.pk)

        self.assertEquals(order.restaurant,Restaurant.objects.get(pk=3))

        orderItems = cart.getOrderItems(order.pk)
        self.assertEquals(orderItems.count(), 3)
        
        for idx ,orderItem in enumerate(orderItems):
            orderItem_Quantities = cart.getItemQuantity(orderItem.pk)
            self.assertEquals(orderItem_Quantities.count(), [2,1,1][idx])

            for idx2, orderItem_qty in enumerate(orderItem_Quantities):
                
                self.assertEquals(orderItem_qty.qty, [[11,21],[12],[13]][idx][idx2])
            
                orderItem_Quantity_Options = cart.getQuantityOptions(orderItem_qty.pk)
                self.assertEquals(orderItem_Quantity_Options.count(), [[4,4],[3],[2]][idx][idx2])

                for idx3, option in enumerate(orderItem_Quantity_Options):
                    self.assertEquals(option.pk, optionsGiven[idx][idx2][idx3])

        self.assertEquals(response.json(), msg.ORDER_CREATED(cart.getPrice(), cart.getPK()))
    
    def test_order_create_POST_No_Quantity(self):
        self.login()
        cart = self.Cart(2)
        items = cart.getRestaurantItems()
        cart.addItem(items[0])

        response = self.client.post(API_URLS.ORDER_CREATE.getURL(), cart.toFormData(), content_type='application/json')
        self.assertEquals(response.status_code, 400)
    
    def test_order_create_POST_No_Customizations(self):
        self.login()
        cart = self.Cart(2)
        items = cart.getRestaurantItems()
        cart.addItem(items[0])
        cart.addItemDetails(2)
        response = self.client.post(API_URLS.ORDER_CREATE.getURL(), cart.toFormData(), content_type='application/json')
        self.assertEquals(response.status_code, 200)

        self.assertEquals(response.json(), msg.ORDER_CREATED(cart.getPrice(), cart.getPK()))
    
    def test_order_create_POST_No_Options(self):
        self.login()
        cart = self.Cart(3)
        items = cart.getRestaurantItems()
        cart.addItem(items[0])
        cart.addItemDetails(2)
        customizations = cart.getMenuCustomizations(items[0])
        
        cart.addCustomization(customizations[1][0])
        response = self.client.post(API_URLS.ORDER_CREATE.getURL(), cart.toFormData(), content_type='application/json')
        self.assertEquals(response.status_code, 400)
        self.assertEquals(response.json(), msg.INVALID_REQUEST)
    
    def test_order_create_POST_No_Items(self):
        self.login()
        cart = self.Cart(2)
        print(cart.toJSON(),'\n\n\n\n')
        response = self.client.post(API_URLS.ORDER_CREATE.getURL(), cart.toFormData(), content_type='application/json')
        self.assertEquals(response.status_code, 400)
        self.assertEquals(response.json(), msg.INVALID_REQUEST)
    
    def test_order_create_POST_Same_Items(self):
        self.login()
        cart = self.Cart(2)
        items = cart.getRestaurantItems()
        cart.addItem(items[0])
        cart.addItemDetails(2)
        customizations = cart.getMenuCustomizations(items[0])
        
        cart.addCustomization(customizations[0][0])
        customizationOptions = cart.getCustomizationOptions(customizations[0][0])
        cart.addOption(customizationOptions[0])

        cart.addItem(items[0])
        cart.addItemDetails(2)
        customizations = cart.getMenuCustomizations(items[0])
        
        cart.addCustomization(customizations[0][0])
        customizationOptions = cart.getCustomizationOptions(customizations[0][0])
        cart.addOption(customizationOptions[0])

        response = self.client.post(API_URLS.ORDER_CREATE.getURL(), cart.toFormData(), content_type='application/json')
        self.assertEquals(response.status_code, 400)
        self.assertEquals(response.json(), msg.INVALID_REQUEST)

    def test_order_create_POST_Duplicate_Customizations(self):
        self.login()
        cart = self.Cart(3)
        items = cart.getRestaurantItems()
        cart.addItem(items[3])
        cart.addItemDetails(2)
        customizations = cart.getMenuCustomizations(items[3])
        
        cart.addCustomization(customizations[0][0])
        customizationOptions = cart.getCustomizationOptions(customizations[0][0])
        cart.addOption(customizationOptions[0])

        cart.addCustomization(customizations[0][0])
        customizationOptions = cart.getCustomizationOptions(customizations[0][0])
        cart.addOption(customizationOptions[0])

        response = self.client.post(API_URLS.ORDER_CREATE.getURL(), cart.toFormData(), content_type='application/json')

        self.assertEquals(response.status_code, 400)
        self.assertEquals(response.json(), msg.INVALID_REQUEST)

    def test_order_create_POST_Duplicate_Options(self):
        self.login()
        cart = self.Cart(3)
        items = cart.getRestaurantItems()
        cart.addItem(items[3])
        cart.addItemDetails(2)
        customizations = cart.getMenuCustomizations(items[3])
        
        cart.addCustomization(customizations[1][0])
        customizationOptions = cart.getCustomizationOptions(customizations[1][0])
        cart.addOption(customizationOptions[0])
        cart.addOption(customizationOptions[0])

        response = self.client.post(API_URLS.ORDER_CREATE.getURL(), cart.toFormData(), content_type='application/json')

        self.assertEquals(response.status_code, 400)
        self.assertEquals(response.json(), msg.INVALID_REQUEST)