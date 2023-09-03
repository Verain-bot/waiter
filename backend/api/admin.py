from django.contrib import admin
from .models import *
import nested_admin
from .mixins import CustomAdminMixin

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


class MenuItemCustomizationAdmin(CustomAdminMixin):
    inlines = [CustomatizationOptionsInLine]
    
    @CustomAdminMixin.get_queryset_decorator
    def get_queryset(self, request, qs):
        return qs.filter(item__restaurant__owner=request.user) 

class MenuItemAdmin(CustomAdminMixin):
    inlines = [MenuItemCustomizationInLine]

    @CustomAdminMixin.get_queryset_decorator
    def get_queryset(self, request, qs):
        return qs.filter(restaurant__owner=request.user)


class RestaurantAdmin(CustomAdminMixin):
    inlines = [MenuItemInLine]
    
    @CustomAdminMixin.get_queryset_decorator
    def get_queryset(self, request, qs):
        return qs.filter(owner=request.user)


class ItemDetailAdmin(CustomAdminMixin):
    inlines = [QuantityInLine]
    
    @CustomAdminMixin.get_queryset_decorator
    def get_queryset(self, request, qs):
        return qs.filter(suborder__order__restaurant__owner=request.user)
    
class OrderAdmin(CustomAdminMixin):
    inlines = [SubOrderInLine]

    @CustomAdminMixin.get_queryset_decorator
    def get_queryset(self, request, qs):
        return qs.filter(restaurant__owner=request.user)

class SubOrderAdmin(CustomAdminMixin):
    inlines = [itemDetailInLine]

    @CustomAdminMixin.get_queryset_decorator
    def get_queryset(self, request, qs):
        return qs.filter(order__restaurant__owner=request.user)

class QuantityAdmin(CustomAdminMixin):

    @CustomAdminMixin.get_queryset_decorator
    def get_queryset(self, request, qs):
        return qs.filter(itemDetail__suborder__order__restaurant__owner=request.user)

class CustomatizationOptionsAdmin(CustomAdminMixin):
    
    @CustomAdminMixin.get_queryset_decorator
    def get_queryset(self, request, qs):
        return qs.filter(customization__item__restaurant__owner=request.user)
    


admin.site.register(ItemType)
admin.site.register(SpecialItem)
admin.site.register(Order, OrderAdmin)
admin.site.register(MenuItem, MenuItemAdmin)
admin.site.register(CustomerVisit)
admin.site.register(Restaurant, RestaurantAdmin)
admin.site.register(SubOrder, SubOrderAdmin)
admin.site.register(ItemDetail, ItemDetailAdmin)
admin.site.register(Quantity, QuantityAdmin)
admin.site.register(CustomatizationOptions, CustomatizationOptionsAdmin)
admin.site.register(MenuItemCustomization, MenuItemCustomizationAdmin)