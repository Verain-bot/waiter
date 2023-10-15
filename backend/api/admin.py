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
    list_display = ['name','MenuItem', 'customizationType']
    search_fields = ['name','item__name']
    search_help_text = "Search by Customization name or menu item name"

    def MenuItem(self, obj):
        return obj.item.name

    @CustomAdminMixin.get_queryset_decorator
    def get_queryset(self, request, qs):
        return qs.filter(item__restaurant__owner=request.user) 

class MenuItemAdmin(CustomAdminMixin):
    inlines = [MenuItemCustomizationInLine]
    list_display = ['name','itemType','dietaryType','price', 'rating']
    search_fields = ['name','itemType__name']
    search_help_text = "Search by Menu Item name or item type"
    radio_fields = {'dietaryType': admin.HORIZONTAL}
    

    def get_readonly_fields(self, request, obj=None):
        if request.user.is_staff:
            if request.user.is_superuser:
                return []
            else:
                return ('rating','totalRatings')

    
    def formfield_for_dbfield(self, db_field, **kwargs):
        formfield = super().formfield_for_dbfield(db_field, **kwargs)
        
        # Set default value for a specific field
        if db_field.name == 'restaurant':
            formfield.initial = Restaurant.objects.filter(owner=kwargs['request'].user).first()

        return formfield
        

    @CustomAdminMixin.get_queryset_decorator
    def get_queryset(self, request, qs):
        return qs.filter(restaurant__owner=request.user)


class RestaurantAdmin(CustomAdminMixin):
    list_display = ['name','phone','restaurantType', 'email']

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

    def has_view_permission(self, request, obj=None):    
        return request.user.is_superuser
    
    @CustomAdminMixin.get_queryset_decorator
    def get_queryset(self, request, qs):
        return qs.filter(suborder__order__restaurant__owner=request.user)
    
class OrderAdmin(CustomAdminMixin):
    inlines = [SubOrderInLine]
    ordering=['-time']
    list_display = ['id','price', 'orderStatus', 'CustomerName','time']
    search_fields = ['id','customers__username','customers__first_name']
    search_help_text = "Search by Order ID, Customer Name, Customer Phone"

    def CustomerName(self,obj):
        x = obj.customers.first()
        return x.first_name + ' ' + x.last_name

    def RestaurantName(self, obj):
        return obj.restaurant.name

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

    def has_view_permission(self, request, obj=None):    
        return request.user.is_superuser

    @CustomAdminMixin.get_queryset_decorator
    def get_queryset(self, request, qs):
        return qs.filter(order__restaurant__owner=request.user)

class QuantityAdmin(CustomAdminMixin):

    def has_view_permission(self, request, obj=None):    
        return request.user.is_superuser

    @CustomAdminMixin.get_queryset_decorator
    def get_queryset(self, request, qs):
        return qs.filter(itemDetail__suborder__order__restaurant__owner=request.user)

    

class CustomatizationOptionsAdmin(CustomAdminMixin):
    list_display = ['CustomizationName','MenuItem','name','price']
    search_fields = ['name','customization__name','customization__item__name']
    search_help_text = "Search by Option name, Customization or menu item "

    def CustomizationName(self,obj):
        return obj.customization.name
    
    def MenuItem(self,obj):
        return obj.customization.item.name

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