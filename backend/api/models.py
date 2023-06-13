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

class ItemDetail(models.Model):
    suborder = models.ForeignKey('SubOrder', related_name='suborder',blank=True,on_delete=models.CASCADE)
    item = models.ForeignKey('MenuItem', related_name='item',blank=True,on_delete=models.CASCADE)
    quantity = models.PositiveSmallIntegerField(default=1)
    price = models.PositiveIntegerField(default=0)

    def __str__(self) -> str:
        return str(self.id)

class SubOrder(models.Model):
    customer = models.ForeignKey(Customer, related_name='customer',blank=True,on_delete=models.CASCADE)
    order = models.ForeignKey('Order', related_name='order',blank=True,on_delete=models.CASCADE)
    items = models.ManyToManyField('MenuItem', related_name='suborder_items', blank=True, through=ItemDetail)
    price = models.PositiveIntegerField(default = 0)
    tip = models.PositiveSmallIntegerField(default=0)

    def __str__(self) -> str:
        return str(self.id)

class Order(models.Model):
    customers = models.ManyToManyField(Customer, related_name='customerList', blank=True, through=SubOrder)
    restaurant = models.ForeignKey('Restaurant', related_name='restaurant_order',blank=True,on_delete=models.CASCADE)
    price = models.PositiveIntegerField(default = 0)
    time = models.DateTimeField(default= now())
    tableNumber = models.PositiveSmallIntegerField(default= 0)
    tip = models.PositiveSmallIntegerField(default=0)
    orderStatus = models.CharField(max_length=10, blank = True)
    rating = models.SmallIntegerField(blank = True,null=True)
    comment = models.TextField(max_length=500, blank = True)
    takeawayOrDinein = models.SmallIntegerField(default = 0)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['id', 'restaurant'], name='unique_order')
        ]

    def __str__(self) -> str:
        return str(self.id)

class MenuItem(models.Model):
    restaurant = models.ForeignKey('Restaurant', on_delete=models.CASCADE, related_name='restaurant', null=True)
    name = models.CharField(max_length=100, blank=True)
    itemType = models.ForeignKey(ItemType, related_name='itemtype',null=True,blank=True,on_delete=models.CASCADE)
    price = models.PositiveIntegerField(default=100)
    category = models.ForeignKey(SpecialItem, related_name='special', null=True,on_delete=models.CASCADE, blank=True)
    description = models.TextField(max_length=500, blank=True)
    totalOrders = models.PositiveIntegerField(default=0)
    rating = models.PositiveSmallIntegerField(null=True, blank=True)
    totalRatings = models.PositiveIntegerField(default=0)
    itemPhoto = models.ImageField(upload_to=MenuUploadTo, blank=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['restaurant', 'id'], name='unique_menu_item')
        ]

    def __str__(self) -> str:
        return self.name

class CustomerVisit(models.Model):
    restaurant = models.ForeignKey('Restaurant', on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    lastVisit = models.DateField(default=now().date())
    totalVisits = models.PositiveSmallIntegerField(default=0)
    storeCredit = models.PositiveIntegerField(default = 0)
    customerRating = models.PositiveSmallIntegerField(blank=True, null=True)
    customerComment = models.CharField(max_length=200, blank = True, null=True)

    def __str__(self) -> str:
        return self.customer.name + " " + self.restaurant.name + "Restaurant Visit"

class Restaurant(models.Model):

    name = models.CharField(max_length=50, blank=True)
    preOrPost = models.SmallIntegerField(default=0)
    licenceNo = models.CharField(max_length=15, blank =True)
    restaurantType = models.CharField(max_length=30, blank = True)
    customers = models.ManyToManyField(Customer, related_name='customers', through=CustomerVisit)
    primColor = models.CharField(max_length=10, blank=True)
    secColor = models.CharField(max_length=10, blank=True)
    logo = models.ImageField(upload_to=restaurantUploadTo, blank=True)
    owner = models.CharField(max_length=50, blank = True)
    location = models.CharField(max_length=30,blank=True)
    phone = models.PositiveBigIntegerField(blank=True, null=True)
    email = models.EmailField(blank=True)
    joinDate = models.DateField(default=now())
    
    def __str__(self) -> str:
        return self.name
    