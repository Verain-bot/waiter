from django.test import TestCase, Client
from .models import *
from rest_framework.test import APIClient

#Testing views
class TestViews(TestCase):
    def setUp(self):
        self.client = Client()
        self.APIClient = APIClient()

        Customer.objects.create(name='Verain', phone='1',email='test1@test.com')
        Customer.objects.create(name='Sunil', phone='2',email='test2@test.com')
        Customer.objects.create(name='Karan', phone='3',email='test3@test.com')

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

    def test_restaurant_list_GET(self):
        response = self.client.get('/api/restaurants/')
        self.assertEquals(response.status_code, 200)
        response = response.json()
        self.assertEquals(response['count'], 2)
        self.assertEquals(response['results'][0]['name'], 'Bar')
        
        #check if json contains url
        self.assertEquals(response['results'][0]['url'], 'http://testserver/api/restaurants/details/1')

    def test_restaurant_detail_GET(self):
        response = self.client.get('/api/restaurants/details/1')
        self.assertEquals(response.status_code, 200)
        response = response.json()
        self.assertEquals(response['name'], 'Bar')
        
        #check length of menu
        self.assertEquals(len(response['menu']), 3)

        #check if menu contains url
        self.assertEquals(response['menu'][0]['url'], 'http://testserver/api/menu/details/1')
    
    def test_menu_detail_GET(self):
        response = self.client.get('/api/menu/details/1')
        self.assertEquals(response.status_code, 200)
        response = response.json()
        self.assertEquals(response['name'], 'LIIT')
        self.assertEquals(response['price'], 100)
        #Check for 2 customizations
        self.assertEquals(len(response['customizations']), 2)

        #Check for customization options
        self.assertEquals(len(response['customizations'][0]['customizationOptions']), 3)
        
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
        data = {'phone': '1'}
        response = self.client.post('/api/login/', data)
        self.assertEquals(response.status_code, 200)
        response = response.json()
        self.assertEquals(response['phone'], '1')

        #Check OTP
        data = {'otp': '1234'}
        response = self.client.post('/api/otp/', data)
        self.assertEquals(response.status_code, 200)
        response = response.json()
        print(response)
        self.assertEquals(response['verified'], True)

    def logout(self):
        data = {'logout': True}
        response = self.client.post('/api/login/',data)
        self.assertEquals(response.status_code, 200)
        response = response.json()
        self.assertEquals(response['logout'], True)
        
    #Test login page
    def test_login_POST(self):
        response = self.client.post('/api/login/')
        self.assertEquals(response.status_code, 400)

        #wrong data
        data = {'phone': '1234567895'}
        response = self.client.post('/api/login/', data)
        self.assertEquals(response.status_code, 404)
        
        #correct data
        data = {'phone': '1'}
        response = self.client.post('/api/login/', data)
        self.assertEquals(response.status_code, 200)
        response = response.json()
        self.assertEquals(response['phone'], '1')

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
        self.assertEquals(response['phone'], 1)

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

        data = {'phone': '1'}
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

#check user retrieve update page
    def test_user_detail_GET(self):
        response = self.client.get('/api/account/')
        self.assertEquals(response.status_code, 403)

        self.login()
        response = self.client.get('/api/account/')
        self.assertEquals(response.status_code, 200)
        response = response.json()
        self.assertEquals(response['name'], 'Verain')
        self.assertEquals(response['phone'], 1)
        self.logout()

    def test_user_detail_PATCH(self):
        response = self.client.patch('/api/account/')
        self.assertEquals(response.status_code, 403)

        self.login()
        data = {"email": "verain@verain.com"}
        response = self.client.patch('/api/account/', data,content_type='application/json')
        self.assertEquals(response.status_code, 200)
        response = response.json()
        self.assertEquals(response['name'], 'Verain')
        self.assertEquals(response['phone'], 1)
        self.assertEquals(response['email'], 'verain@verain.com')
        self.logout()
    
    #Order list view
    def test_order_list_GET(self):
        response = self.client.get('/api/account/orders/')
        self.assertEquals(response.status_code, 403)

        self.login()
        response = self.client.get('/api/account/orders/')
        self.assertEquals(response.status_code, 200)
        response = response.json()
        self.assertEquals(response['count'], 2)
        self.assertEquals(response['results'][0]['id'], 1)

        #check if json contains url
        self.assertEquals(response['results'][0]['url'], 'http://testserver/api/account/orders/details/1')
        self.logout()
    
    def test_order_detail_GET(self):
        response = self.client.get('/api/account/orders/details/1')
        self.assertEquals(response.status_code, 403)

        self.login()
        response = self.client.get('/api/account/orders/details/1')
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

        response = self.client.get('/api/account/orders/details/2')
        self.assertEquals(response.status_code, 403)

        self.logout()


        