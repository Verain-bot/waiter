from django.contrib import admin
from .models import *
import nested_admin

class QuantityInLine(nested_admin.NestedTabularInline):
    model = Quantity
    extra = 1

class CustomatizationOptionsInLine(nested_admin.NestedTabularInline):
    model = CustomatizationOptions
    extra = 1

class MenuItemCustomizationInLine(nested_admin.NestedTabularInline):
    inlines = [CustomatizationOptionsInLine]
    model = MenuItemCustomization
    extra = 1

class MenuItemInLine(nested_admin.NestedTabularInline):
    inlines = [MenuItemCustomizationInLine]
    model = MenuItem
    extra = 1

class itemDetailInLine(nested_admin.NestedTabularInline):
    inlines = [QuantityInLine]
    model = ItemDetail
    extra = 1

class SubOrderInLine(nested_admin.NestedTabularInline):
    model = SubOrder
    inlines = [itemDetailInLine]
    extra = 1

class MenuItemCustomizationAdmin(nested_admin.NestedModelAdmin):
    inlines = [CustomatizationOptionsInLine]

class MenuItemAdmin(nested_admin.NestedModelAdmin):
    inlines = [MenuItemCustomizationInLine]

class RestaurantAdmin(nested_admin.NestedModelAdmin):
    inlines = [MenuItemInLine]
    
class ItemDetailAdmin(nested_admin.NestedModelAdmin):
    inlines = [QuantityInLine]

class OrderAdmin(nested_admin.NestedModelAdmin):
    inlines = [SubOrderInLine]

class SubOrderAdmin(nested_admin.NestedModelAdmin):
    inlines = [itemDetailInLine]

admin.site.register(ItemType)
admin.site.register(SpecialItem)
admin.site.register(Order, OrderAdmin)
admin.site.register(MenuItem, MenuItemAdmin)
admin.site.register(CustomerVisit)
admin.site.register(Restaurant, RestaurantAdmin)
admin.site.register(SubOrder, SubOrderAdmin)
admin.site.register(ItemDetail, ItemDetailAdmin)
admin.site.register(Quantity)
admin.site.register(CustomatizationOptions)
admin.site.register(MenuItemCustomization, MenuItemCustomizationAdmin)