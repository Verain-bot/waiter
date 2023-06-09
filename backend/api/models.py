from typing import Iterable, Optional
from django.db import models
from django.utils.timezone import now
# Create your models here.

def MenuUploadTo(instance, filename):
    return f"menu/{instance.restaurant.id}/{filename}"

def restaurantUploadTo(instance, filename):
    return f"restaurant/{instance.id}/{filename}"

class Customer(models.Model):
    name = models.CharField(max_length=50, blank= True)
    phone = models.PositiveBigIntegerField(unique= True, blank=True)
    email = models.EmailField(blank=True, unique=True)
    location = models.CharField(max_length= 50, blank=True)

    def __str__(self) -> str:
        return self.name

class ItemType(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self) -> str:
        return self.name

class SpecialItem(models.Model):
    name = models.CharField(max_length=50)
    color = models.CharField(max_length=10)

    def __str__(self) -> str:
        return self.name

class Order(models.Model):
    orderID = models.CharField(max_length=15)
    customer = models.ForeignKey(Customer, related_name='customer',blank=True,on_delete=models.CASCADE)
    items = models.ManyToManyField('MenuItem', related_name='items', blank=True)
    price = models.PositiveIntegerField(default = 0)
    time = models.DateTimeField(default= now())
    tableNumber = models.PositiveSmallIntegerField(default= 0)
    tip = models.PositiveSmallIntegerField(default=0)
    orderStatus = models.CharField(max_length=10, blank = True)
    rating = models.SmallIntegerField(blank = True)
    comment = models.TextField(max_length=500, blank = True)
    takeawayOrDinein = models.SmallIntegerField(default = 0)

    def __str__(self) -> str:
        return self.orderID

class MenuItem(models.Model):

    globalID = models.CharField(max_length=15, blank=True, primary_key=True)  
    restaurant = models.ForeignKey('Restaurant', on_delete=models.CASCADE, related_name='restaurant', null=True)
    name = models.CharField(max_length=100, blank=True)
    itemType = models.ForeignKey(ItemType, related_name='itemtype',null=True,on_delete=models.CASCADE)
    price = models.PositiveIntegerField(default=100)
    category = models.ForeignKey(SpecialItem, related_name='special', null=True,on_delete=models.CASCADE)
    description = models.TextField(max_length=500, blank=True)
    totalOrders = models.PositiveIntegerField(default=0)
    rating = models.PositiveSmallIntegerField(null=True)
    totalRatings = models.PositiveIntegerField(default=0)
    orders = models.ManyToManyField(Order, related_name='order',blank= True)
    itemPhoto = models.ImageField(upload_to=MenuUploadTo, blank=True)

    

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        if self._state.adding:
            if MenuItem.objects.all().count() == 0:
                self.globalID = f"{self.restaurant.id} 1"
            else:
                lastItem = MenuItem.objects.filter(restaurant=self.restaurant).last()
                lastID = int(lastItem.globalID.split(" ")[1])
                self.globalID = f"{self.restaurant.id} {int(lastID) + 1}"

        return super().save(force_insert, force_update, using, update_fields)

    def __str__(self) -> str:
        return self.name

class CustomerVisit(models.Model):
    restaurant = models.ForeignKey('Restaurant', on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    lastVisit = models.DateField(blank= True)
    totalVisits = models.PositiveSmallIntegerField(default=0)
    storeCredit = models.PositiveIntegerField(default = 0)
    customerRating = models.PositiveSmallIntegerField(blank=True)
    customerComment = models.CharField(max_length=200, blank = True)

    def __str__(self) -> str:
        return self.customer.name + " " + self.restaurant.name + "Restaurant Visit"

class Restaurant(models.Model):
    id = models.CharField(max_length=10, primary_key=True)
    name = models.CharField(max_length=50, blank=True)
    menuItems = models.ManyToManyField(MenuItem, related_name="menu", blank=True)
    preOrPost = models.SmallIntegerField(default=0)
    licenceNo = models.CharField(max_length=15, blank =True)
    restaurantType = models.CharField(max_length=30, blank = True)
    customers = models.ManyToManyField(Customer, related_name='customers', through=CustomerVisit)
    primColor = models.CharField(max_length=10, blank=True)
    secColor = models.CharField(max_length=10, blank=True)
    logo = models.ImageField(upload_to=restaurantUploadTo, blank=True)
    owner = models.CharField(max_length=50, blank = True)
    location = models.CharField(max_length=30,blank=True)

    def __str__(self) -> str:
        return self.name