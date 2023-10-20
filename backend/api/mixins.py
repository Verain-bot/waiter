import nested_admin
from .models import *


class CustomAdminMixin( nested_admin.NestedModelAdmin):
    #change choice list for restaurant
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if request.user.is_superuser:
            return super().formfield_for_foreignkey(db_field, request, **kwargs)
        
        match db_field.name:
            case "restaurant":
                kwargs["queryset"] = Restaurant.objects.filter(owner=request.user)
                
            case "item":
                kwargs["queryset"] = MenuItem.objects.filter(restaurant__owner=request.user)
            
            case "customization":
                kwargs["queryset"] = MenuItemCustomization.objects.filter(item__restaurant__owner=request.user)
                
            case _:
                return super().formfield_for_foreignkey(db_field, request, **kwargs)
        
        return super().formfield_for_foreignkey(db_field, request, **kwargs)
    
    @classmethod
    def get_queryset_decorator(self, fn):
        
        def wrapper(self, request):
            qs = super().get_queryset(request)
            if request.user.is_superuser:
                return qs

            return fn(self, request, qs)
        
        return wrapper