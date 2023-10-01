from django.contrib import admin
from .models import *
import nested_admin
from .mixins import CustomAdminMixin

class QuantityInLine(nested_admin.NestedTabularInline):
    model = Quantity
    extra = 0

class CustomatizationOptionsInLine(nested_admin.NestedTabularInline):
    model = CustomatizationOptions
    extra = 0

class MenuItemCustomizationInLine(nested_admin.NestedStackedInline):
    inlines = [CustomatizationOptionsInLine]
    model = MenuItemCustomization
    extra = 0

class MenuItemInLine(nested_admin.NestedStackedInline):
    inlines = [MenuItemCustomizationInLine]
    model = MenuItem
    extra = 0

class itemDetailInLine(nested_admin.NestedTabularInline):
    inlines = [QuantityInLine]
    model = ItemDetail
    extra = 0

class SubOrderInLine(nested_admin.NestedTabularInline):
    model = SubOrder
    inlines = [itemDetailInLine]
    extra = 0


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

    def get_readonly_fields(self, request, obj=None):
        if request.user.is_staff:
            if request.user.is_superuser:
                return []
            else:
                return ('owner','joinDate')

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

    def render_change_form(self, request, *args, **kwargs):
        # if request.user.is_superuser:
        #     self.change_form_template = None
        # elif request.user.groups.filter(name='restaurantOwner').exists():
        #     self.change_form_template = 'customAdmin/orders.html'

        return super().render_change_form( request, *args, **kwargs)


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
    
admin.ModelAdmin

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