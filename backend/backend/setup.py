from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.models import Permission
from api.models import *
from django.contrib.auth.models import Group

def setup():
    restaurant_content_type = ContentType.objects.get_for_model(Restaurant)
    menu_content_type = ContentType.objects.get_for_model(MenuItem)
    order_content_type = ContentType.objects.get_for_model(Order)
    suborder_content_type = ContentType.objects.get_for_model(SubOrder)
    itemdetail_content_type = ContentType.objects.get_for_model(ItemDetail)
    customization_content_type = ContentType.objects.get_for_model(MenuItemCustomization)
    customization_options_content_type = ContentType.objects.get_for_model(CustomatizationOptions)
    item_type_content_type = ContentType.objects.get_for_model(ItemType)
    special_item_content_type = ContentType.objects.get_for_model(SpecialItem)
    quantity_content_type = ContentType.objects.get_for_model(Quantity)

    #Create groups
    ownerGroup = Group.objects.create(name='RestaurantOwner')

    #Add permissions to groups

    ownerGroup.permissions.add(Permission.objects.get(codename='change_restaurant', content_type=restaurant_content_type))
    ownerGroup.permissions.add(Permission.objects.get(codename='view_restaurant', content_type=restaurant_content_type))

    ownerGroup.permissions.add(Permission.objects.get(codename='change_menuitem', content_type=menu_content_type))
    ownerGroup.permissions.add(Permission.objects.get(codename='view_menuitem', content_type=menu_content_type))
    ownerGroup.permissions.add(Permission.objects.get(codename='add_menuitem', content_type=menu_content_type))
    ownerGroup.permissions.add(Permission.objects.get(codename='delete_menuitem', content_type=menu_content_type))

    ownerGroup.permissions.add(Permission.objects.get(codename='view_order', content_type=order_content_type))

    ownerGroup.permissions.add(Permission.objects.get(codename='view_suborder', content_type=suborder_content_type))

    ownerGroup.permissions.add(Permission.objects.get(codename='view_itemdetail', content_type=itemdetail_content_type))

    ownerGroup.permissions.add(Permission.objects.get(codename='change_menuitemcustomization', content_type=customization_content_type))
    ownerGroup.permissions.add(Permission.objects.get(codename='view_menuitemcustomization', content_type=customization_content_type))
    ownerGroup.permissions.add(Permission.objects.get(codename='add_menuitemcustomization', content_type=customization_content_type))
    ownerGroup.permissions.add(Permission.objects.get(codename='delete_menuitemcustomization', content_type=customization_content_type))

    ownerGroup.permissions.add(Permission.objects.get(codename='change_customatizationoptions', content_type=customization_options_content_type))
    ownerGroup.permissions.add(Permission.objects.get(codename='view_customatizationoptions', content_type=customization_options_content_type))
    ownerGroup.permissions.add(Permission.objects.get(codename='add_customatizationoptions', content_type=customization_options_content_type))
    ownerGroup.permissions.add(Permission.objects.get(codename='delete_customatizationoptions', content_type=customization_options_content_type))

    ownerGroup.permissions.add(Permission.objects.get(codename='view_itemtype', content_type=item_type_content_type))

    ownerGroup.permissions.add(Permission.objects.get(codename='view_specialitem', content_type=special_item_content_type))

    ownerGroup.permissions.add(Permission.objects.get(codename='view_quantity', content_type=quantity_content_type))