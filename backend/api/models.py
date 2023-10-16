from typing import Iterable, Optional
from django.db import models
from django.utils.timezone import now
from django.contrib.auth import get_user_model

Customer = get_user_model()

def MenuUploadTo(instance, filename):
    return f"menu/{instance.restaurant.id}/{filename}"

def restaurantUploadTo(instance, filename):
    return f"restaurant/{instance.id}/{filename}"

class ItemType(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self) -> str:
        return self.name

class SpecialItem(models.Model):
    name = models.CharField(max_length=50)
    color = models.CharField(max_length=10)

    def __str__(self) -> str:
        return self.name

#seems to be redundant
class ItemDetail(models.Model):
    suborder = models.ForeignKey('SubOrder', related_name='suborder',blank=True,on_delete=models.CASCADE)
    item = models.ForeignKey('MenuItem', related_name='item',blank=True,on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.suborder.__str__() + " " + self.item.__str__()

class Quantity(models.Model):
    itemDetail = models.ForeignKey('ItemDetail', related_name='itemDetail',blank=True,on_delete=models.CASCADE)
    option = models.ManyToManyField('CustomatizationOptions', related_name='option',blank=True)
    qty = models.PositiveSmallIntegerField()
    price = models.PositiveIntegerField(default = 0)

    def __str__(self) -> str:
        return str(self.qty)

class SubOrder(models.Model):
    customer = models.ForeignKey(Customer, related_name='customer',blank=True,on_delete=models.CASCADE)
    order = models.ForeignKey('Order', related_name='order',blank=True,on_delete=models.CASCADE)
    items = models.ManyToManyField('MenuItem', related_name='suborder_items', blank=True, through=ItemDetail)
    price = models.PositiveIntegerField(default = 0)

    def __str__(self) -> str:
        return self.customer.__str__() + " Order No. " + self.order.id.__str__()


class Order(models.Model):
    class OrderStatusChoices(models.TextChoices):
        NOT_CONFIRMED = 'NOT_CONFIRMED', 'Awaiting Confirmation'
        CONFIRMED = 'CONFIRMED', 'Confirmed'
        PREPARING = 'PREPARING', 'Preparing'
        DISPATCHING = 'DISPATCHING', 'Dispatching'
        READY = 'READY', 'Ready'
        COMPLETE = 'COMPLETE', 'Complete'
        CANCELLED = 'CANCELLED', 'Cancelled'

    customers = models.ManyToManyField(Customer, related_name='customerList', blank=True, through=SubOrder)
    restaurant = models.ForeignKey('Restaurant', related_name='restaurant_order',blank=True,on_delete=models.CASCADE)
    price = models.PositiveIntegerField(default = 0)
    time = models.DateTimeField(default= now)
    orderStatus = models.CharField(max_length=15, choices=OrderStatusChoices.choices, default=OrderStatusChoices.NOT_CONFIRMED)
    tip = models.PositiveSmallIntegerField(default=0)
    rating = models.SmallIntegerField(blank = True,null=True)
    comment = models.TextField(max_length=500, blank = True)
    takeawayOrDinein = models.SmallIntegerField(default = 0)
    address = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['id', 'restaurant'], name='unique_order')
        ]

        ordering = ['-time']

    def __str__(self) -> str:
        return " ".join(self.customers.all().values_list('first_name', flat=True)) + ' ' + str(self.id)

class MenuItem(models.Model):
    class DietaryTypeChoices(models.TextChoices):
        VEG = 'VEG', 'Vegetarian'
        NON_VEG = 'NON_VEG', 'Non-Vegetarian'
        EGG = 'EGG', 'Egg'

    restaurant = models.ForeignKey('Restaurant', on_delete=models.CASCADE, related_name='restaurant', null=True)
    name = models.CharField('Item Name',max_length=100, blank=True)
    itemType = models.ForeignKey(ItemType, related_name='itemtype',on_delete=models.CASCADE, null=False, verbose_name='Item Type')
    price = models.PositiveIntegerField('Price',default=100)
    category = models.ForeignKey(SpecialItem, related_name='special', null=True,on_delete=models.CASCADE, blank=True)
    description = models.TextField(max_length=500, blank=True)
    rating = models.FloatField(null=True, blank=True)
    totalRatings = models.PositiveIntegerField('Total Ratings',default=0)
    itemPhoto = models.ImageField('Item Photo',upload_to=MenuUploadTo, blank=True)
    dietaryType = models.CharField('Food Type',max_length=10, choices=DietaryTypeChoices.choices, default=DietaryTypeChoices.VEG)
    isActive = models.BooleanField('Currently Available',default=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['restaurant', 'id'], name='unique_menu_item')
        ]

    def __str__(self) -> str:
        return self.name

class CustomerVisit(models.Model):
    restaurant = models.ForeignKey('Restaurant', on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    lastVisit = models.DateField(default=now)
    totalVisits = models.PositiveSmallIntegerField(default=0)

    def __str__(self) -> str:
        return f"{self.customer.first_name} {self.customer.last_name} {self.restaurant.name} Restaurant Visit" 

class MenuItemCustomization(models.Model):
    class CustomizationTypeChoices(models.TextChoices):
        RADIO = 'radio', 'Can select only one'
        CHECK = 'checkbox', 'Can select many'
        
    item = models.ForeignKey(MenuItem, related_name='item_customization', on_delete=models.CASCADE)
    name = models.CharField(max_length=50, blank=True)
    customizationType = models.CharField(max_length=10, blank=True, choices=CustomizationTypeChoices.choices, default=CustomizationTypeChoices.RADIO)

    def __str__(self) -> str:
        return self.name

class CustomatizationOptions(models.Model):
    customization = models.ForeignKey(MenuItemCustomization, related_name='customization_options', on_delete=models.CASCADE)
    name = models.CharField(max_length=50, blank=True)
    price = models.PositiveIntegerField(default=0)

    def __str__(self) -> str:
        return self.name

class Restaurant(models.Model):

    name = models.CharField(max_length=50, blank=True)
    licenceNo = models.CharField(max_length=15, blank =True)
    restaurantType = models.CharField(max_length=30, blank = True)
    customers = models.ManyToManyField(Customer, related_name='customers', through=CustomerVisit)
    logo = models.ImageField(upload_to=restaurantUploadTo, blank=True)
    owner = models.ForeignKey(Customer, related_name='owner', on_delete=models.CASCADE)
    location = models.CharField(max_length=30,blank=True)
    phone = models.PositiveBigIntegerField(blank=True, null=True)
    email = models.EmailField(blank=True)
    joinDate = models.DateField(default=now)
    acceptingOrders = models.BooleanField(default=True)
    rating = models.FloatField(null=True, blank=True)
    totalRatings = models.PositiveIntegerField(default=0)
    
    def __str__(self) -> str:
        return self.name
    
    class Meta:
        ordering = ['name']
