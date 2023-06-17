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

Order.objects.create(restaurant=Restaurant.objects.get(name='Bar'), tableNumber=1)
Order.objects.create(restaurant=Restaurant.objects.get(name='Bar'), tableNumber=2)

SubOrder.objects.create(customer=Customer.objects.get(pk=1), order=Order.objects.get(tableNumber=1))
SubOrder.objects.create(customer=Customer.objects.get(pk=2), order=Order.objects.get(tableNumber=1))
SubOrder.objects.create(customer=Customer.objects.get(pk=3), order=Order.objects.get(tableNumber=2))

i1 = ItemDetail.objects.create(suborder=SubOrder.objects.get(customer=Customer.objects.get(pk=1)), item=MenuItem.objects.get(name='LIIT'), price=100)
i2 = ItemDetail.objects.create(suborder=SubOrder.objects.get(customer=Customer.objects.get(pk=1)), item=MenuItem.objects.get(name='Beer'), price=400)
i3 = ItemDetail.objects.create(suborder=SubOrder.objects.get(customer=Customer.objects.get(pk=2)), item=MenuItem.objects.get(name='Snacks'), price=100)

i4 = ItemDetail.objects.create(suborder=SubOrder.objects.get(customer=Customer.objects.get(pk=3)), item=MenuItem.objects.get(name='Beer'), price=100)
i5 = ItemDetail.objects.create(suborder=SubOrder.objects.get(customer=Customer.objects.get(pk=3)), item=MenuItem.objects.get(name='LIIT'), price=400)

#Quantity details for each itemdetail
q1 = Quantity.objects.create(itemDetail=i1,qty=2)
q1.option.add(CustomatizationOptions.objects.get(customization=MenuItemCustomization.objects.get(item=MenuItem.objects.get(name='LIIT'), name='Size'), name='Medium', price=50))
q1.option.add(CustomatizationOptions.objects.get(customization=MenuItemCustomization.objects.get(item=MenuItem.objects.get(name='LIIT'), name='Ice'), name='Normal', price=0))

Quantity.objects.create(itemDetail=i2, qty=1)
Quantity.objects.create(itemDetail=i3, qty=1)
Quantity.objects.create(itemDetail=i4, qty=1)
Quantity.objects.create(itemDetail=i5, qty=2)

CustomerVisit.objects.create(customer=Customer.objects.get(pk=2), restaurant=Restaurant.objects.get(name='Bar'))
CustomerVisit.objects.create(customer=Customer.objects.get(pk=1), restaurant=Restaurant.objects.get(name='Bar'))
CustomerVisit.objects.create(customer=Customer.objects.get(pk=3), restaurant=Restaurant.objects.get(name='Bar'))