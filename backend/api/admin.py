from django.contrib import admin
from .models import *
# Register your models here.
class MenuItemInLine(admin.TabularInline):
    model = MenuItem
    extra = 1


class itemDetailInLine(admin.TabularInline):
    model = ItemDetail
    extra = 1

class SubOrderInLine(admin.TabularInline):
    model = SubOrder
    inline = [itemDetailInLine]
    extra = 1

class RestaurantAdmin(admin.ModelAdmin):
    inlines = [MenuItemInLine]
    
class OrderAdmin(admin.ModelAdmin):
    inlines = [SubOrderInLine]

class SubOrderAdmin(admin.ModelAdmin):
    inlines = [itemDetailInLine]

admin.site.register(Customer)
admin.site.register(ItemType)
admin.site.register(SpecialItem)
admin.site.register(Order, OrderAdmin)
admin.site.register(MenuItem)
admin.site.register(CustomerVisit)
admin.site.register(Restaurant, RestaurantAdmin)
admin.site.register(SubOrder, SubOrderAdmin)
admin.site.register(ItemDetail)
