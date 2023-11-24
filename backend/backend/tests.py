import random
from django.http.response import HttpResponse
from django.test import  TestCase, Client, TransactionTestCase
from api.models import *
from rest_framework.test import APIClient
from django.core.cache import cache
from OTPAuth.urls import URL_FOR_OTPAuth as URL
from django.contrib.auth.models import Group
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.models import Permission
from PIL import Image
from django.core.files import File
import os
from django.core.cache import cache
from django.conf import settings
import json
import time
from .celery import app
from celery.contrib.testing.worker import start_worker
from unittest.mock import patch
from OTPAuth.tasks import sendOTP
from api.tasks import add_comment_for_order

def getMenuItems():

    d = '../Resources/food/'
    for file_path in os.listdir(d):
        if file_path == '.DS_Store':
            continue
        name = ' '.join([x.capitalize() for x in file_path.split('.')[0].split('_')])
        #print(name)
        t = random.randint(1,5)
        p = random.randint(1,20)*50
        yield d+file_path, name, t, p


class TestBase(TestCase):

    APIClient = APIClient()
    client = Client()
    client2 = Client()
    table = 111
    TEST_PHONE_2 = 2
    TEST_PHONE = 1
    TEST_PHONE_REGISTERED = 2192
    TEST_OTP = '1234'


    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        
        cls.patchers = [
            patch('OTPAuth.tasks.sendOTP.delay', new=sendOTP),
            patch('OTPAuth.tasks.randint', return_value=int(cls.TEST_OTP)),
            patch('api.views.add_comment_for_order.delay', new=add_comment_for_order),
        ]
        
        for p in cls.patchers:
            p.start()
        
    @classmethod
    def tearDownClass(cls):
        super().tearDownClass()
        cache.clear()
        for p in cls.patchers:
            p.stop()

    def setUp(self):
        cache.clear()
        
    @classmethod
    def setUpTestData(cls):

        if Restaurant.objects.exists():
            return

        cls.Verain = Verain = Customer.objects.create_user(username='1', first_name= 'Verain', email = 'test1@test.com', password='test')
        cls.Rahul = Rahul = Customer.objects.create_user(username='2', first_name= 'Rahul', email = 'test2@test.com', password='test')
        cls.Raj = Raj = Customer.objects.create_user(username='3', first_name= 'Raj', email = 'test3@test.com', password='test')

        restaurant_content_type = ContentType.objects.get_for_model(Restaurant)
        menu_content_type = ContentType.objects.get_for_model(MenuItem)
        order_content_type = ContentType.objects.get_for_model(Order)
        suborder_content_type = ContentType.objects.get_for_model(SubOrder)
        itemdetail_content_type = ContentType.objects.get_for_model(ItemDetail)
        customization_content_type = ContentType.objects.get_for_model(MenuItemCustomization)
        customization_options_content_type = ContentType.objects.get_for_model(CustomatizationOptions)
        item_type_content_type = ContentType.objects.get_for_model(ItemType)
        special_item_content_type = ContentType.objects.get_for_model(SpecialItem)
        quantity_content_type = ContentType.objects.get_for_model(Quantity)

        #Create groups
        ownerGroup = Group.objects.create(name='RestaurantOwner')
        
        #Add permissions to groups
        
        ownerGroup.permissions.add(Permission.objects.get(codename='change_restaurant', content_type=restaurant_content_type))
        ownerGroup.permissions.add(Permission.objects.get(codename='view_restaurant', content_type=restaurant_content_type))

        ownerGroup.permissions.add(Permission.objects.get(codename='change_menuitem', content_type=menu_content_type))
        ownerGroup.permissions.add(Permission.objects.get(codename='view_menuitem', content_type=menu_content_type))
        ownerGroup.permissions.add(Permission.objects.get(codename='add_menuitem', content_type=menu_content_type))
        ownerGroup.permissions.add(Permission.objects.get(codename='delete_menuitem', content_type=menu_content_type))

        ownerGroup.permissions.add(Permission.objects.get(codename='view_order', content_type=order_content_type))

        ownerGroup.permissions.add(Permission.objects.get(codename='view_suborder', content_type=suborder_content_type))

        ownerGroup.permissions.add(Permission.objects.get(codename='view_itemdetail', content_type=itemdetail_content_type))

        ownerGroup.permissions.add(Permission.objects.get(codename='change_menuitemcustomization', content_type=customization_content_type))
        ownerGroup.permissions.add(Permission.objects.get(codename='view_menuitemcustomization', content_type=customization_content_type))
        ownerGroup.permissions.add(Permission.objects.get(codename='add_menuitemcustomization', content_type=customization_content_type))
        ownerGroup.permissions.add(Permission.objects.get(codename='delete_menuitemcustomization', content_type=customization_content_type))

        ownerGroup.permissions.add(Permission.objects.get(codename='change_customatizationoptions', content_type=customization_options_content_type))
        ownerGroup.permissions.add(Permission.objects.get(codename='view_customatizationoptions', content_type=customization_options_content_type))
        ownerGroup.permissions.add(Permission.objects.get(codename='add_customatizationoptions', content_type=customization_options_content_type))
        ownerGroup.permissions.add(Permission.objects.get(codename='delete_customatizationoptions', content_type=customization_options_content_type))

        ownerGroup.permissions.add(Permission.objects.get(codename='view_itemtype', content_type=item_type_content_type))

        ownerGroup.permissions.add(Permission.objects.get(codename='view_specialitem', content_type=special_item_content_type))

        ownerGroup.permissions.add(Permission.objects.get(codename='view_quantity', content_type=quantity_content_type))

        cls.owner1 = Owner1 = Customer.objects.create_user(username='101', first_name= 'Owner1', email = 'owner1@owner.com', password='test', is_staff=True)
        cls.owner2 = Owner2 = Customer.objects.create_user(username='102', first_name= 'Owner1', email = 'owner2@owner.com', password='test', is_staff=True)
        Owner1.groups.add(ownerGroup)
        Owner2.groups.add(ownerGroup)

        Customer.objects.create_superuser(username='verain', first_name= 'Gr8', email = '', password='1')
        cls.beverage_item_type = ItemType.objects.create(name='Beverage')
        cls.food_item_type = ItemType.objects.create(name='Food')
        cls.snacks_item_type = ItemType.objects.create(name='Snacks')
        cls.MC_item_type = ItemType.objects.create(name='Main Course')
        cls.chinese_item_type = ItemType.objects.create(name='Italian Course')

        item_type_list = [cls.beverage_item_type, cls.food_item_type, cls.snacks_item_type, cls.MC_item_type, cls.chinese_item_type]

        # Create SpecialItem objects
        cls.bestseller_special_item = SpecialItem.objects.create(name='Bestseller', color='red')
        cls.popular_special_item = SpecialItem.objects.create(name='Popular', color='blue')

        # Create Restaurant objects
        bar_res = Restaurant.objects.create(name='Bar', phone='1234567890', owner=Owner1)
        pizza_res = Restaurant.objects.create(name='Pizza', phone='1234567891', owner=Owner2)

        cls.bar_res = bar_res
        cls.pizza_res = pizza_res

        # Create MenuItem objects
        liit_mi = MenuItem.objects.create(name='LIIT', price=100, restaurant=bar_res, itemType=cls.beverage_item_type, category=cls.bestseller_special_item)
        beer_mi = MenuItem.objects.create(name='Beer', price=200, restaurant=bar_res, itemType=cls.beverage_item_type)
        snacks_mi = MenuItem.objects.create(name='Snacks', price=300, restaurant=bar_res, itemType=cls.food_item_type)

        cls.liit_mi = liit_mi
        cls.beer_mi = beer_mi
        cls.snacks_mi = snacks_mi

        # Create MenuItem objects for Pizza_Res
        pizza_mi = MenuItem.objects.create(name='Pizza', price=100, restaurant=pizza_res, itemType=cls.food_item_type, category=cls.popular_special_item)
        coke_mi = MenuItem.objects.create(name='Coke', price=300, restaurant=pizza_res, itemType=cls.beverage_item_type)

        cls.pizza_mi = pizza_mi
        cls.coke_mi = coke_mi

        # Create MenuItemCustomization objects
        liit_size_customization = MenuItemCustomization.objects.create(item=liit_mi, name='Size', customizationType='radio')
        liit_ice_customization = MenuItemCustomization.objects.create(item=liit_mi, name='Ice', customizationType='radio')
        beer_size_customization = MenuItemCustomization.objects.create(item=beer_mi, name='Size', customizationType='radio')
        snacks_size_customization = MenuItemCustomization.objects.create(item=snacks_mi, name='Size', customizationType='radio')

        # Create MenuItemCustomization objects for Pizza_Res
        pizza_size_customization = MenuItemCustomization.objects.create(item=pizza_mi, name='Size', customizationType='radio')
        pizza_toppings_customization = MenuItemCustomization.objects.create(item=pizza_mi, name='Toppings', customizationType='checkbox')
        coke_size_customization = MenuItemCustomization.objects.create(item=coke_mi, name='Size', customizationType='radio')

        # Create CustomatizationOptions objects
        liit_size_small = CustomatizationOptions.objects.create(customization=liit_size_customization, name='Small', price=0)
        liit_size_medium = CustomatizationOptions.objects.create(customization=liit_size_customization, name='Medium', price=50)
        liit_size_large = CustomatizationOptions.objects.create(customization=liit_size_customization, name='Large', price=100)

        # Create CustomatizationOptions objects for LIIT Ice
        liit_ice_less = CustomatizationOptions.objects.create(customization=liit_ice_customization, name='Less', price=0)
        liit_ice_normal = CustomatizationOptions.objects.create(customization=liit_ice_customization, name='Normal', price=0)
        liit_ice_more = CustomatizationOptions.objects.create(customization=liit_ice_customization, name='More', price=0)

        # Create CustomatizationOptions objects for Beer
        beer_size_small = CustomatizationOptions.objects.create(customization=beer_size_customization, name='Small', price=0)
        beer_size_medium = CustomatizationOptions.objects.create(customization=beer_size_customization, name='Medium', price=50)
        beer_size_large = CustomatizationOptions.objects.create(customization=beer_size_customization, name='Large', price=100)

        # Create CustomatizationOptions objects for Snacks
        snacks_size_small = CustomatizationOptions.objects.create(customization=snacks_size_customization, name='Small', price=0)
        snacks_size_medium = CustomatizationOptions.objects.create(customization=snacks_size_customization, name='Medium', price=50)
        snacks_size_large = CustomatizationOptions.objects.create(customization=snacks_size_customization, name='Large', price=100)

        # Create CustomatizationOptions objects for Pizza
        pizza_size_small = CustomatizationOptions.objects.create(customization=pizza_size_customization, name='Small', price=0)
        pizza_size_medium = CustomatizationOptions.objects.create(customization=pizza_size_customization, name='Medium', price=50)
        pizza_size_large = CustomatizationOptions.objects.create(customization=pizza_size_customization, name='Large', price=100)

        # Create CustomatizationOptions objects for Pizza Toppings
        pizza_toppings_onion = CustomatizationOptions.objects.create(customization=pizza_toppings_customization, name='Onion', price=0)
        pizza_toppings_capsicum = CustomatizationOptions.objects.create(customization=pizza_toppings_customization, name='Capsicum', price=0)
        pizza_toppings_tomato = CustomatizationOptions.objects.create(customization=pizza_toppings_customization, name='Tomato', price=0)
        
        cls.order1_bar = order1_bar = Order.objects.create(restaurant=bar_res)
        cls.order2_bar=order2_bar = Order.objects.create(restaurant=bar_res)
        cls.order_pizza= order_pizza = Order.objects.create(restaurant=pizza_res)

        # Create SubOrder objects
        cls.suborder1_order1_bar= suborder1_order1_bar = SubOrder.objects.create(customer=Verain, order=order1_bar)
        cls.suborder2_order1_bar= suborder2_order1_bar = SubOrder.objects.create(customer=Rahul, order=order1_bar)
        cls.suborder3_order2_bar= suborder3_order2_bar = SubOrder.objects.create(customer=Raj, order=order2_bar)
        cls.suborder1_order_pizza= suborder1_order_pizza = SubOrder.objects.create(customer=Verain, order=order_pizza)
        cls.suborder2_order_pizza= suborder2_order_pizza = SubOrder.objects.create(customer=Raj, order=order_pizza)

        # Create ItemDetail objects
        cls.item_detail1_suborder1_order1_bar = item_detail1_suborder1_order1_bar = ItemDetail.objects.create(suborder=suborder1_order1_bar, item=liit_mi)
        cls.item_detail2_suborder1_order1_bar = item_detail2_suborder1_order1_bar = ItemDetail.objects.create(suborder=suborder1_order1_bar, item=beer_mi)
        cls.item_detail3_suborder2_order1_bar = item_detail3_suborder2_order1_bar = ItemDetail.objects.create(suborder=suborder2_order1_bar, item=snacks_mi)
        cls.item_detail4_suborder3_order2_bar = item_detail4_suborder3_order2_bar = ItemDetail.objects.create(suborder=suborder3_order2_bar, item=beer_mi)
        cls.item_detail5_suborder3_order2_bar = item_detail5_suborder3_order2_bar = ItemDetail.objects.create(suborder=suborder3_order2_bar, item=liit_mi)
        cls.item_detail6_suborder1_order_pizza = item_detail6_suborder1_order_pizza = ItemDetail.objects.create(suborder=suborder1_order_pizza, item=pizza_mi)
        cls.item_detail7_suborder1_order_pizza = item_detail7_suborder1_order_pizza = ItemDetail.objects.create(suborder=suborder1_order_pizza, item=coke_mi)
        cls.item_detail8_suborder2_order_pizza = item_detail8_suborder2_order_pizza = ItemDetail.objects.create(suborder=suborder2_order_pizza, item=pizza_mi)

        # Create Quantity objects
        cls.q1_item_detail1_suborder1_order1_bar= q1_item_detail1_suborder1_order1_bar = Quantity.objects.create(itemDetail=item_detail1_suborder1_order1_bar, qty=2)
        q1_item_detail1_suborder1_order1_bar.option.add(liit_size_medium)
        q1_item_detail1_suborder1_order1_bar.option.add(liit_ice_normal)

        q2_item_detail2_suborder1_order1_bar = Quantity.objects.create(itemDetail=item_detail2_suborder1_order1_bar, qty=1)

        q3_item_detail3_suborder2_order1_bar = Quantity.objects.create(itemDetail=item_detail3_suborder2_order1_bar, qty=1)

        q4_item_detail4_suborder3_order2_bar = Quantity.objects.create(itemDetail=item_detail4_suborder3_order2_bar, qty=1)
        q5_item_detail5_suborder3_order2_bar = Quantity.objects.create(itemDetail=item_detail5_suborder3_order2_bar, qty=2)

        q6_item_detail6_suborder1_order_pizza = Quantity.objects.create(itemDetail=item_detail6_suborder1_order_pizza, qty=1)
        q6_item_detail6_suborder1_order_pizza.option.add(pizza_size_medium)
        q6_item_detail6_suborder1_order_pizza.option.add(pizza_toppings_onion)
        q6_item_detail6_suborder1_order_pizza.option.add(pizza_toppings_capsicum)

        q7_item_detail7_suborder1_order_pizza = Quantity.objects.create(itemDetail=item_detail7_suborder1_order_pizza, qty=1)

        # Create CustomerVisit objects
        CustomerVisit.objects.create(customer=Rahul, restaurant=bar_res)
        CustomerVisit.objects.create(customer=Verain, restaurant=bar_res)
        CustomerVisit.objects.create(customer=Raj, restaurant=bar_res)
        CustomerVisit.objects.create(customer=Verain, restaurant=pizza_res)
        CustomerVisit.objects.create(customer=Raj, restaurant=pizza_res)

        #create restaurant with many Menu Items
        cls.manny_res = manny_res = Restaurant.objects.create(name='Manny\'s', phone='1234567892', owner=Owner1)
        fp = os.path.join(settings.MEDIA_ROOT, 'menu','3')
        add_media = not os.path.exists(fp)

        for f, name, t, p in getMenuItems():
            mi = MenuItem.objects.create(name=name, itemPhoto = f, restaurant=manny_res, itemType=item_type_list[t-1], price=p)
            
            if add_media:
                with open(f, 'rb') as file:
                    asd = File(file)
                    mi.itemPhoto.save(name+'.jpg', asd, save=True)

            mic = MenuItemCustomization.objects.create(item=mi, name='Size', customizationType='radio')
            CustomatizationOptions.objects.create(customization=mic, name='Small', price=0)
            CustomatizationOptions.objects.create(customization=mic, name='Medium', price=50)
            CustomatizationOptions.objects.create(customization=mic, name='Large', price=100)

            mic2 = MenuItemCustomization.objects.create(item=mi, name='Add ons', customizationType='checkbox')
            CustomatizationOptions.objects.create(customization=mic2, name='Cheese', price=0)
            CustomatizationOptions.objects.create(customization=mic2, name='Extra Cheese', price=50)
            CustomatizationOptions.objects.create(customization=mic2, name='Extra Sauce', price=50)
            CustomatizationOptions.objects.create(customization=mic2, name='Extra Toppings', price=50)
            CustomatizationOptions.objects.create(customization=mic2, name='Extra Meat', price=50)
            CustomatizationOptions.objects.create(customization=mic2, name='Extra Veggies', price=50)
    
    
    class Cart:
        def __init__(self, restaurantID) -> None:
            self.items = []
            self.restaurantID = restaurantID
            self.price = 0

        def addItem(self, id : int, restaurantID : int = None):
            d = {
                'menuItemID' : id,
                'restaurantID': self.restaurantID if restaurantID==None else restaurantID,
                'customizations': [],
            }
            self.items.append(d) 
            return self
        
        def __getitem__(self, index):
            return self.items[index]
        
        def addItemDetails(self, qty):
            self.items[-1]['customizations'].append({
                'quantity' : qty,
                'customizations' : [],
            })
            self.price += qty * MenuItem.objects.get(pk=self.items[-1]['menuItemID']).price
            return self
        
        def addCustomization(self, id):
            d = {
                'CustomizationID': id,
                'Options': [],
            }
            self.items[-1]['customizations'][-1]['customizations'].append(d)
            return self

        def addOption(self, id):
            d = {
                'id' : id,
            }
            self.items[-1]['customizations'][-1]['customizations'][-1]['Options'].append(d)
            self.price += self.items[-1]['customizations'][-1]['quantity'] *CustomatizationOptions.objects.get(pk=id).price
            return self

        def toJSON(self):
            d = {
                'restaurantID' : self.restaurantID,
                'cart' : self.items
            }
            return json.dumps(d)
        
        def toFormData(self):
            d = {
                'restaurantID' : self.restaurantID,
                'cart' : json.dumps(self.items)
            }
            return d

        def getPrice(self):
            return self.price

        def getRestaurantItems(self, restID = None):
            if restID == None:
                restID = self.restaurantID

            restaurant = Restaurant.objects.get(pk=restID)
            menuItems = list(map(lambda x: x.pk,MenuItem.objects.filter(restaurant=restaurant)))
            return menuItems
        
        @staticmethod
        def getMenuCustomizations(menuItemID):
            menuItem = MenuItem.objects.get(pk=menuItemID)
            customizations = list(map(lambda x: (x.pk, x.customizationType), MenuItemCustomization.objects.filter(item=menuItem)))
            
            return customizations
        
        @staticmethod
        def getCustomizationOptions(customizationID):
            customization = MenuItemCustomization.objects.get(pk=customizationID)
            options = list(map(lambda x: x.pk, CustomatizationOptions.objects.filter(customization=customization)))
            return options
        
        @staticmethod
        def getPK():
            order = Order.objects.latest('pk')
            return order.pk
        
        @staticmethod
        def getLastOrder():
            order = Order.objects.latest('pk')
            return order

        @staticmethod
        def getOrderItems(orderID):
            order = Order.objects.get(pk=orderID)
            suborders = SubOrder.objects.filter(order=order)
            itemDetails = ItemDetail.objects.filter(suborder__in=suborders)
            return itemDetails

        @staticmethod
        def getItemQuantity(itemDetailID) :
            itemDetail = ItemDetail.objects.get(pk=itemDetailID)
            quantity = Quantity.objects.filter(itemDetail=itemDetail)
            return quantity
        
        @staticmethod
        def getQuantityOptions( quantityID) :
            quantity = Quantity.objects.get(pk=quantityID)
            options = quantity.option.all()
            return options
        
        def print(self):
            print('\n\n\n',self.toJSON(), '\n\n\n')

        @classmethod
        def getKeys1(cls):
            return ['menuItemID', 'restaurantID', 'customizations']
        
        @classmethod
        def getKeys2(cls):
            return ['quantity', 'customizations']
        
        @classmethod
        def getKeys3(cls):
            return ['CustomizationID', 'Options']
        
        @classmethod
        def getKeys4(cls):
            return ['id']

    #reset cache
    def reset_cache(self):
        cache.clear()
    
    #login user with phone 2 with 2nd client
    def login2(self):
        self.login(self.client2, self.TEST_PHONE_2)

    #logout user with phone 2
    def logout2(self):
        self.logout(self.client2)

    def login(self, client = None,phone=None):
        if client == None:
            client = self.client
        
        if phone == None:
            phone = self.TEST_PHONE

        self.verifyUser(client, phone)
        response = client.post(URL.LOGIN.getURL())
        self.assertEquals(response.status_code, 200)
        response = response.json()
        
    
    def logout(self, client = None):
        if client == None:
            client = self.client
        client.get(URL.LOGOUT.getURL())
        

    def sendOTP(self, client, phone):
        data = {
            'phone' : phone,
        }
        response = client.post(URL.SEND_OTP.getURL(), data=data)

        self.assertEquals(response.status_code, 200)
        response = response.json()
        
        
    def verifyUser(self, client, phone):
        self.sendOTP(client, phone)
        data = {
            'otp' : self.TEST_OTP,
        }
        response = client.post(URL.ENTER_OTP.getURL(), data=data)
        self.assertEquals(response.status_code, 200)
        response = response.json()
        
    def checkUserExists(self, phone):
        return Customer.objects.filter(username=phone).exists()
    
    def getItemsFromOrder(self, order):
        suborder = SubOrder.objects.get(order = order, customer = order.customers.first())
        return suborder.items.all()
    
    