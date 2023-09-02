from django.test import TestCase, Client
from api.models import *
from rest_framework.test import APIClient
from django.core.cache import cache
from OTPAuth.urls import URL_FOR_OTPAuth as URL
#Testing views
class TestBase(TestCase):

    TEST_PHONE = 1
    TEST_PHONE_2 = 2
    TEST_OTP = '1234'
    TEST_PHONE_REGISTERED = 2192

    def setUp(self):
        self.client = Client()
        self.APIClient = APIClient()
        self.table = 111
        self.client2 = Client()

        Customer.objects.create_user(username='1', first_name= 'Verain', email = 'test1@test.com', password='test')
        Customer.objects.create_user(username='2', first_name= 'Rahul', email = 'test2@test.com', password='test')
        Customer.objects.create_user(username='3', first_name= 'Raj', email = 'test3@test.com', password='test')

        ItemType.objects.create(name='Beverage')
        ItemType.objects.create(name='Food')

        SpecialItem.objects.create(name='Bestseller', color='red')
        SpecialItem.objects.create(name='Popular', color='blue')

        Restaurant.objects.create(name='Bar', phone='1234567890')
        Restaurant.objects.create(name='Pizza', phone='1234567891')

        MenuItem.objects.create(name='LIIT', price=100, restaurant=Restaurant.objects.get(name='Bar'), itemType=ItemType.objects.get(name='Beverage'), category=SpecialItem.objects.get(name='Bestseller'))
        MenuItem.objects.create(name='Beer', price=200, restaurant=Restaurant.objects.get(name='Bar'), itemType=ItemType.objects.get(name='Beverage'))
        MenuItem.objects.create(name='Snacks', price=300, restaurant=Restaurant.objects.get(name='Bar'), itemType=ItemType.objects.get(name='Food'))

        #Similar menu for restaurant 2
        MenuItem.objects.create(name='Pizza', price=100, restaurant=Restaurant.objects.get(name='Pizza'), itemType=ItemType.objects.get(name='Food'), category=SpecialItem.objects.get(name='Popular'))
        MenuItem.objects.create(name='Coke', price=300, restaurant=Restaurant.objects.get(name='Pizza'), itemType=ItemType.objects.get(name='Beverage'))

        MenuItemCustomization.objects.create(item=MenuItem.objects.get(name='LIIT'), name='Size', customizationType='radio')
        MenuItemCustomization.objects.create(item=MenuItem.objects.get(name='LIIT'), name='Ice', customizationType='radio')
        MenuItemCustomization.objects.create(item=MenuItem.objects.get(name='Beer'), name='Size', customizationType='radio')
        MenuItemCustomization.objects.create(item=MenuItem.objects.get(name='Snacks'), name='Size', customizationType='radio')

        #Similar customizations for restaurant 2
        MenuItemCustomization.objects.create(item=MenuItem.objects.get(name='Pizza'), name='Size', customizationType='radio')
        MenuItemCustomization.objects.create(item=MenuItem.objects.get(name='Pizza'), name='Toppings', customizationType='checkbox')
        MenuItemCustomization.objects.create(item=MenuItem.objects.get(name='Coke'), name='Size', customizationType='radio')

        #Customizations for LIIT
        CustomatizationOptions.objects.create(customization=MenuItemCustomization.objects.get(item=MenuItem.objects.get(name='LIIT'), name='Size'), name='Small', price=0)
        CustomatizationOptions.objects.create(customization=MenuItemCustomization.objects.get(item=MenuItem.objects.get(name='LIIT'), name='Size'), name='Medium', price=50)
        CustomatizationOptions.objects.create(customization=MenuItemCustomization.objects.get(item=MenuItem.objects.get(name='LIIT'), name='Size'), name='Large', price=100)

        #Ice for LIIT
        CustomatizationOptions.objects.create(customization=MenuItemCustomization.objects.get(item=MenuItem.objects.get(name='LIIT'), name='Ice'), name='Less', price=0)
        CustomatizationOptions.objects.create(customization=MenuItemCustomization.objects.get(item=MenuItem.objects.get(name='LIIT'), name='Ice'), name='Normal', price=0)
        CustomatizationOptions.objects.create(customization=MenuItemCustomization.objects.get(item=MenuItem.objects.get(name='LIIT'), name='Ice'), name='More', price=0)

        #Customizations for Beer
        CustomatizationOptions.objects.create(customization=MenuItemCustomization.objects.get(item=MenuItem.objects.get(name='Beer'), name='Size'), name='Small', price=0)
        CustomatizationOptions.objects.create(customization=MenuItemCustomization.objects.get(item=MenuItem.objects.get(name='Beer'), name='Size'), name='Medium', price=50)
        CustomatizationOptions.objects.create(customization=MenuItemCustomization.objects.get(item=MenuItem.objects.get(name='Beer'), name='Size'), name='Large', price=100)

        #Customizations for Snacks
        CustomatizationOptions.objects.create(customization=MenuItemCustomization.objects.get(item=MenuItem.objects.get(name='Snacks'), name='Size'), name='Small', price=0)
        CustomatizationOptions.objects.create(customization=MenuItemCustomization.objects.get(item=MenuItem.objects.get(name='Snacks'), name='Size'), name='Medium', price=50)
        CustomatizationOptions.objects.create(customization=MenuItemCustomization.objects.get(item=MenuItem.objects.get(name='Snacks'), name='Size'), name='Large', price=100)

        #Customizations for Pizza
        CustomatizationOptions.objects.create(customization=MenuItemCustomization.objects.get(item=MenuItem.objects.get(name='Pizza'), name='Size'), name='Small', price=0)
        CustomatizationOptions.objects.create(customization=MenuItemCustomization.objects.get(item=MenuItem.objects.get(name='Pizza'), name='Size'), name='Medium', price=50)
        CustomatizationOptions.objects.create(customization=MenuItemCustomization.objects.get(item=MenuItem.objects.get(name='Pizza'), name='Size'), name='Large', price=100)

        #Toppings for Pizza
        CustomatizationOptions.objects.create(customization=MenuItemCustomization.objects.get(item=MenuItem.objects.get(name='Pizza'), name='Toppings'), name='Onion', price=0)
        CustomatizationOptions.objects.create(customization=MenuItemCustomization.objects.get(item=MenuItem.objects.get(name='Pizza'), name='Toppings'), name='Capsicum', price=0)
        CustomatizationOptions.objects.create(customization=MenuItemCustomization.objects.get(item=MenuItem.objects.get(name='Pizza'), name='Toppings'), name='Tomato', price=0)

        #Order1 for person 1 and 2 at Bar
        Order.objects.create(restaurant=Restaurant.objects.get(name='Bar'), tableNumber=1)
        SubOrder1 = SubOrder.objects.create(customer=Customer.objects.get(pk=1), order=Order.objects.get(tableNumber=1))
        SubOrder2 = SubOrder.objects.create(customer=Customer.objects.get(pk=2), order=Order.objects.get(tableNumber=1))
        i1 = ItemDetail.objects.create(suborder=SubOrder1, item=MenuItem.objects.get(name='LIIT'), price=100)
        i2 = ItemDetail.objects.create(suborder=SubOrder1, item=MenuItem.objects.get(name='Beer'), price=400)
        i3 = ItemDetail.objects.create(suborder=SubOrder2, item=MenuItem.objects.get(name='Snacks'), price=100)

        q1 = Quantity.objects.create(itemDetail=i1,qty=2)
        q1.option.add(CustomatizationOptions.objects.get(customization=MenuItemCustomization.objects.get(item=MenuItem.objects.get(name='LIIT'), name='Size'), name='Medium', price=50))
        q1.option.add(CustomatizationOptions.objects.get(customization=MenuItemCustomization.objects.get(item=MenuItem.objects.get(name='LIIT'), name='Ice'), name='Normal', price=0))
        Quantity.objects.create(itemDetail=i2, qty=1)
        Quantity.objects.create(itemDetail=i3, qty=1)


        #Order2 For Person 3 at Bar
        Order.objects.create(restaurant=Restaurant.objects.get(name='Bar'), tableNumber=2)
        SubOrder3 = SubOrder.objects.create(customer=Customer.objects.get(pk=3), order=Order.objects.get(tableNumber=2))
        i4 = ItemDetail.objects.create(suborder=SubOrder3, item=MenuItem.objects.get(name='Beer'), price=100)
        i5 = ItemDetail.objects.create(suborder=SubOrder3, item=MenuItem.objects.get(name='LIIT'), price=400)
        Quantity.objects.create(itemDetail=i4, qty=1)
        Quantity.objects.create(itemDetail=i5, qty=2)


        #Order3 For Person 1 and 3 at Pizza
        Order.objects.create(restaurant=Restaurant.objects.get(name='Pizza'), tableNumber=3)
        SubOrder4 = SubOrder.objects.create(customer=Customer.objects.get(pk=1), order=Order.objects.get(tableNumber=3))
        SubOrder5 = SubOrder.objects.create(customer=Customer.objects.get(pk=3), order=Order.objects.get(tableNumber=3))
        i6 = ItemDetail.objects.create(suborder=SubOrder4, item=MenuItem.objects.get(name='Pizza'), price=100)
        i7 = ItemDetail.objects.create(suborder=SubOrder4, item=MenuItem.objects.get(name='Coke'), price=400)
        i8 = ItemDetail.objects.create(suborder=SubOrder5, item=MenuItem.objects.get(name='Pizza'), price=100)

        q6 = Quantity.objects.create(itemDetail=i6, qty=1)
        q6.option.add(CustomatizationOptions.objects.get(customization=MenuItemCustomization.objects.get(item=MenuItem.objects.get(name='Pizza'), name='Size'), name='Medium', price=50))
        q6.option.add(CustomatizationOptions.objects.get(customization=MenuItemCustomization.objects.get(item=MenuItem.objects.get(name='Pizza'), name='Toppings'), name='Onion', price=0))
        q6.option.add(CustomatizationOptions.objects.get(customization=MenuItemCustomization.objects.get(item=MenuItem.objects.get(name='Pizza'), name='Toppings'), name='Capsicum', price=0))

        Quantity.objects.create(itemDetail=i7, qty=1)
        Quantity.objects.create(itemDetail=i8, qty=1)


        #All Customer Visits
        CustomerVisit.objects.create(customer=Customer.objects.get(pk=2), restaurant=Restaurant.objects.get(name='Bar'))
        CustomerVisit.objects.create(customer=Customer.objects.get(pk=1), restaurant=Restaurant.objects.get(name='Bar'))
        CustomerVisit.objects.create(customer=Customer.objects.get(pk=3), restaurant=Restaurant.objects.get(name='Bar'))
        CustomerVisit.objects.create(customer=Customer.objects.get(pk=1), restaurant=Restaurant.objects.get(name='Pizza'))
        CustomerVisit.objects.create(customer=Customer.objects.get(pk=3), restaurant=Restaurant.objects.get(name='Pizza'))

    
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
        response = client.post(URL.LOGIN.fullUrl())
        self.assertEquals(response.status_code, 200)
        response = response.json()
        
    
    def logout(self, client = None):
        if client == None:
            client = self.client
        client.get(URL.LOGOUT.fullUrl())
        

    def sendOTP(self, client, phone):
        data = {
            'phone' : phone,
        }
        response = client.post(URL.SEND_OTP.fullUrl(), data=data)
        self.assertEquals(response.status_code, 200)
        response = response.json()
        
        
    def verifyUser(self, client, phone):
        self.sendOTP(client, phone)
        data = {
            'otp' : self.TEST_OTP,
        }
        response = client.post(URL.ENTER_OTP.fullUrl(), data=data)
        self.assertEquals(response.status_code, 200)
        response = response.json()
        

