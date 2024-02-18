from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.models import Permission
from api.models import *
from django.contrib.auth.models import Group
import csv

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

def generateMenuFromCSV(path : str):
    
    with open(path, 'r') as file:
        csvFile = csv.DictReader(file)
        
        res = input('Enter Restaurant Primary key: ')
        restaurant = Restaurant.objects.get(pk=res)
        confirm = input('Add items for restaurant ' + restaurant.name + ' (y/n): ')
        
        if confirm.lower() != 'y':
            return

        for line in csvFile:
            name = line['itemName'].strip().title()
            price = line['price']
            dietaryType = line['dietaryType']
            itemTypePK = int(line['itemType'])

            match dietaryType.upper()[0]:
                case 'V':
                    dietaryType = MenuItem.DietaryTypeChoices.VEG

                case 'N':
                    dietaryType = MenuItem.DietaryTypeChoices.NON_VEG
                    
                case 'E':        
                    dietaryType = MenuItem.DietaryTypeChoices.EGG

            itemType = ItemType.objects.get_or_create(pk=itemTypePK)

            MenuItem.objects.create(restaurant=restaurant, name=name, price=price, dietaryType=dietaryType, itemType=itemType[0])

            print(f'{name} Created!')

if __name__ == '__main__':
    generateMenuFromCSV('/Users/verainsardana/Downloads/CafeMenu.csv')