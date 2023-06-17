from api.models import *

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
MenuItem.objects.create(name='Big Pizza', price=100, restaurant=Restaurant.objects.get(name='Pizza'), itemType=ItemType.objects.get(name='Food'), category=SpecialItem.objects.get(name='Popular'))
MenuItem.objects.create(name='Small Pizza', price=200, restaurant=Restaurant.objects.get(name='Pizza'), itemType=ItemType.objects.get(name='Food'))
MenuItem.objects.create(name='Coke', price=300, restaurant=Restaurant.objects.get(name='Pizza'), itemType=ItemType.objects.get(name='Beverage'))

Order.objects.create(restaurant=Restaurant.objects.get(name='Bar'), tableNumber=1)
Order.objects.create(restaurant=Restaurant.objects.get(name='Bar'), tableNumber=2)

SubOrder.objects.create(customer=Customer.objects.get(pk=1), order=Order.objects.get(tableNumber=1))
SubOrder.objects.create(customer=Customer.objects.get(pk=2), order=Order.objects.get(tableNumber=1))
SubOrder.objects.create(customer=Customer.objects.get(pk=3), order=Order.objects.get(tableNumber=2))

ItemDetail.objects.create(suborder=SubOrder.objects.get(customer=Customer.objects.get(pk=1)), item=MenuItem.objects.get(name='LIIT'), price=100)
ItemDetail.objects.create(suborder=SubOrder.objects.get(customer=Customer.objects.get(pk=1)), item=MenuItem.objects.get(name='Beer'), price=400)
ItemDetail.objects.create(suborder=SubOrder.objects.get(customer=Customer.objects.get(pk=2)), item=MenuItem.objects.get(name='Snacks'), price=100)

ItemDetail.objects.create(suborder=SubOrder.objects.get(customer=Customer.objects.get(pk=3)), item=MenuItem.objects.get(name='Beer'), price=100)
ItemDetail.objects.create(suborder=SubOrder.objects.get(customer=Customer.objects.get(pk=3)), item=MenuItem.objects.get(name='LIIT'), price=400)

CustomerVisit.objects.create(customer=Customer.objects.get(pk=2), restaurant=Restaurant.objects.get(name='Bar'))
CustomerVisit.objects.create(customer=Customer.objects.get(pk=1), restaurant=Restaurant.objects.get(name='Bar'))
CustomerVisit.objects.create(customer=Customer.objects.get(pk=3), restaurant=Restaurant.objects.get(name='Bar'))