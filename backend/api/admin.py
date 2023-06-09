from django.contrib import admin
from .models import *
# Register your models here.
class MenuItemInLine(admin.TabularInline):
    model = MenuItem
    extra = 1

class RestaurantAdmin(admin.ModelAdmin):
    inlines = [MenuItemInLine]

class OrderInLine(admin.TabularInline):
    model = Order
    extra = 1

class CustomerAdmin(admin.ModelAdmin):
    inlines = [OrderInLine]

admin.site.register(Customer, CustomerAdmin)
admin.site.register(ItemType)
admin.site.register(SpecialItem)
admin.site.register(Order)
admin.site.register(MenuItem)
admin.site.register(CustomerVisit)
admin.site.register(Restaurant, RestaurantAdmin)

