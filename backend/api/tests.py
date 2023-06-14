from django.test import TestCase, Client
from .models import *

#Testing views
class TestViews(TestCase):
    def setUp(self):
        self.client = Client()

        Customer.objects.create(name='Test Customer 1', phone='1234567890',email='test1@test.com')
        Customer.objects.create(name='Test Customer 2', phone='1234567891',email='test2@test.com')
        Customer.objects.create(name='Test Customer 3', phone='1234567892',email='test3@test.com')

        ItemType.objects.create(name='Test Item Type 1')
        ItemType.objects.create(name='Test Item Type 2')

        SpecialItem.objects.create(name='Test Special Item 1', color='red')
        SpecialItem.objects.create(name='Test Special Item 2', color='blue')

        Restaurant.objects.create(name='Test Restaurant 1', phone='1234567890')
        Restaurant.objects.create(name='Test Restaurant 2', phone='1234567891')
        
        MenuItem.objects.create(name='Test Menu Item 1', price=100, restaurant=Restaurant.objects.get(name='Test Restaurant 1'), itemType=ItemType.objects.get(name='Test Item Type 1'), category=SpecialItem.objects.get(name='Test Special Item 1'))
        MenuItem.objects.create(name='Test Menu Item 2', price=200, restaurant=Restaurant.objects.get(name='Test Restaurant 1'), itemType=ItemType.objects.get(name='Test Item Type 2'))
        MenuItem.objects.create(name='Test Menu Item 3', price=300, restaurant=Restaurant.objects.get(name='Test Restaurant 1'), itemType=ItemType.objects.get(name='Test Item Type 2'))

        #Similar menu for restaurant 2
        MenuItem.objects.create(name='Test Item 1', price=100, restaurant=Restaurant.objects.get(name='Test Restaurant 2'), itemType=ItemType.objects.get(name='Test Item Type 1'), category=SpecialItem.objects.get(name='Test Special Item 1'))
        MenuItem.objects.create(name='Test Item 2', price=200, restaurant=Restaurant.objects.get(name='Test Restaurant 2'), itemType=ItemType.objects.get(name='Test Item Type 2'))
        MenuItem.objects.create(name='Test Item 3', price=300, restaurant=Restaurant.objects.get(name='Test Restaurant 2'), itemType=ItemType.objects.get(name='Test Item Type 2'))

        Order.objects.create(restaurant=Restaurant.objects.get(name='Test Restaurant 1'), tableNumber=1)
        Order.objects.create(restaurant=Restaurant.objects.get(name='Test Restaurant 1'), tableNumber=2)

        SubOrder.objects.create(customer=Customer.objects.get(name='Test Customer 1'), order=Order.objects.get(tableNumber=1))
        SubOrder.objects.create(customer=Customer.objects.get(name='Test Customer 2'), order=Order.objects.get(tableNumber=1))
        SubOrder.objects.create(customer=Customer.objects.get(name='Test Customer 3'), order=Order.objects.get(tableNumber=2))

        ItemDetail.objects.create(suborder=SubOrder.objects.get(customer=Customer.objects.get(name='Test Customer 1')), item=MenuItem.objects.get(name='Test Menu Item 1'), quantity=1, price=100)
        ItemDetail.objects.create(suborder=SubOrder.objects.get(customer=Customer.objects.get(name='Test Customer 1')), item=MenuItem.objects.get(name='Test Menu Item 2'), quantity=2, price=400)
        ItemDetail.objects.create(suborder=SubOrder.objects.get(customer=Customer.objects.get(name='Test Customer 2')), item=MenuItem.objects.get(name='Test Menu Item 1'), quantity=1, price=100)

        ItemDetail.objects.create(suborder=SubOrder.objects.get(customer=Customer.objects.get(name='Test Customer 3')), item=MenuItem.objects.get(name='Test Menu Item 1'), quantity=1, price=100)
        ItemDetail.objects.create(suborder=SubOrder.objects.get(customer=Customer.objects.get(name='Test Customer 3')), item=MenuItem.objects.get(name='Test Menu Item 2'), quantity=2, price=400)
        
        CustomerVisit.objects.create(customer=Customer.objects.get(name='Test Customer 1'), restaurant=Restaurant.objects.get(name='Test Restaurant 1'))
        CustomerVisit.objects.create(customer=Customer.objects.get(name='Test Customer 2'), restaurant=Restaurant.objects.get(name='Test Restaurant 1'))
        CustomerVisit.objects.create(customer=Customer.objects.get(name='Test Customer 3'), restaurant=Restaurant.objects.get(name='Test Restaurant 1'))
    
    def test_restaurant_list_GET(self):
        response = self.client.get('/api/restaurants/')
        self.assertEquals(response.status_code, 200)
        response = response.json()
        self.assertEquals(response['count'], 2)
        self.assertEquals(response['results'][0]['name'], 'Test Restaurant 1')
        
        #check if json contains url
        self.assertEquals(response['results'][0]['url'], 'http://testserver/api/restaurants/details/1')

    def test_restaurant_detail_GET(self):
        response = self.client.get('/api/restaurants/details/1')
        self.assertEquals(response.status_code, 200)
        response = response.json()
        self.assertEquals(response['name'], 'Test Restaurant 1')
        
        #check length of menu
        self.assertEquals(len(response['menu']), 3)

        #check if menu contains url
        self.assertEquals(response['menu'][0]['url'], 'http://testserver/api/menu/details/1')
    
    def test_menu_detail_GET(self):
        response = self.client.get('/api/menu/details/1')
        self.assertEquals(response.status_code, 200)
        response = response.json()
        self.assertEquals(response['name'], 'Test Menu Item 1')
        self.assertEquals(response['price'], 100)
        
    #Test create user page
    def test_create_user_GET(self):
        #new customer data
        data = {
            'name': 'Create User',
            'phone': '1234567899',
            'email': 'test11@test.com'
        }
        response = self.client.post('/api/create/', data)
        self.assertEquals(response.status_code, 201)
        response = response.json()
        self.assertEquals(response['name'], 'Create User')
    
    def login(self):
        data = {'phone': '1234567890'}
        response = self.client.post('/api/login/', data)
        data = {'otp': '1234'}
        response = self.client.post('/api/otp/', data)
        
        return 1234567890

    #Test login page
    def test_login_GET(self):
        response = self.client.post('/api/login/')
        self.assertEquals(response.status_code, 400)

        #wrong data
        data = {'phone': '1234567895'}
        response = self.client.post('/api/login/', data)
        self.assertEquals(response.status_code, 404)
        
        data = {'phone': '1234567890'}
        response = self.client.post('/api/login/', data)
        self.assertEquals(response.status_code, 200)
        response = response.json()
        self.assertEquals(response['phone'], '1234567890')

        #Check OTP
        data = {'otp': '1234'}
        response = self.client.post('/api/otp/', data)
        self.assertEquals(response.status_code, 200)
        response = response.json()
        print(response)
        self.assertEquals(response['verified'], True)

        response = self.client.post('/api/login/')
        self.assertEquals(response.status_code, 200)
        response = response.json()
        self.assertEquals(response['phone'], 1234567890)

        #logout
        data = {'logout': True}
        response = self.client.post('/api/login/',data)
        self.assertEquals(response.status_code, 200)
        response = response.json()
        self.assertEquals(response['logout'], True)

        data = {'otp': 1233}
        response = self.client.post('/api/otp/', data)
        self.assertEquals(response.status_code, 400)

        #Check OTP Limit

        data = {'phone': '1234567890'}
        response = self.client.post('/api/login/', data)

        data = {'otp': 1233}

        for i in range(1,6):
            response = self.client.post('/api/otp/', data)
            if  (i == 5):
                self.assertEquals(response.status_code, 400)
            else:
                self.assertEquals(response.status_code, 200)
        
        response = response.json()
        self.assertEquals('error' in response, True)

