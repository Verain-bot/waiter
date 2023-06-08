from django.db import models
from django.utils.timezone import now
# Create your models here.
class Customer(models.Model):
    name = models.CharField(max_length=50, blank= True)
    phone = models.PositiveBigIntegerField(max_length=10,unique= True)
    email = models.EmailField(blank=True, unique=True)
    location = models.CharField(max_length= 50, blank=True)

class ItemType(models.Model):
    name = models.CharField(max_length=50)

class SpecialItem(models.Model):
    name = models.CharField(max_length=50)
    color = models.CharField(max_length=10)

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
    comment = models.TextField(max_length=500)
    takeawayOrDinein = models.SmallIntegerField(default = 0)

class MenuItem(models.Model):
    name = models.CharField(max_length=100)
    itemType = models.ForeignKey(ItemType, related_name='itemtype',blank=True,on_delete=models.CASCADE)
    price = models.PositiveIntegerField(default=100)
    category = models.ForeignKey(SpecialItem, related_name='special', blank=True,on_delete=models.CASCADE)
    description = models.TextField(max_length=500, blank=True)
    totalOrders = models.PositiveIntegerField(default=0)
    rating = models.PositiveSmallIntegerField(blank=True)
    totalRatings = models.PositiveIntegerField(default=0)
    orders = models.ManyToManyField(Order, related_name='order')
    itemPhoto = models.ImageField(upload_to='menu/')
    
    
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


class Restaurant(models.Model):
    name = models.CharField(max_length=50)
    menuItems = models.ManyToManyField(MenuItem, related_name="menu", blank=True)
    preOrPost = models.SmallIntegerField(default=0)
    licenceNo = models.CharField(max_length=15, blank =True)
    restaurantType = models.CharField(max_length=30, blank = True)
    customers = models.ManyToManyField(Customer, related_name='customers', through=CustomerVisit)
    primColor = models.CharField(max_length=10)
    secColor = models.CharField(max_length=10)
    logo = models.ImageField(upload_to='rest/')
    owner = models.CharField(max_length=50, blank = True)
    location = models.CharField(max_length=30,blank=True)