from django.core.cache import cache
from .models import *
import json
#Set table data using cache
def setTableData(data, restaurant):
    cache.set('tableData'+str(restaurant.id), data, timeout=60*60*24)
    return data

#Get table data using cache
def getTableData(restaurant):
    return cache.get('tableData'+str(restaurant.id))

def validate_cart_data(cartJSON, restaurantID):
    try:

        if not (cartJSON and restaurantID):
            return False
        
        cart = json.loads(cartJSON)
        
        restaurantID = int(restaurantID)
        
        dataToReturn = {}

        #check if all the items in the cart are from the same restaurant
        if any(int(item['restaurantID']) != restaurantID for item in cart):
            return False
        
        #check if the restaurant exists
        restaurant = Restaurant.objects.filter(pk=restaurantID)
        if not restaurant.exists():
            return False
        
        restaurant = restaurant.first()
        
        dataToReturn['restaurant'] = restaurant
        dataToReturn['items'] = []
        dataToReturn['price'] = 0
        
        menuItemSet = set()

        if len(cart) < 1:
            return False

        for item in cart:
            #get the menu item
            menuItem = MenuItem.objects.filter(pk=item['menuItemID'])
            
            if not MenuItem.objects.filter(pk=item['menuItemID']).exists():
                return False

            menuItem = menuItem.first()
            
            if menuItem.pk in menuItemSet or menuItem.isActive == False:
                return False
            
            menuItemSet.add(menuItem.pk)

            menuItemData = {
                'menuItem': menuItem,
                'customizations': [],
            }

            #check if the menu item is from the same restaurant
            if menuItem.restaurant != restaurant:
                return False
            
            if 'customizations' not in item or len(item['customizations']) < 1:
                return False

            #create the quantity
            for customization in item['customizations']:
                q = int(customization['quantity'])
                customizationIDSet = set()
                optionIDSet = set()
                menuItemCustomizationData = {
                    'quantity': q,
                    'options': [],
                }

                if q < 1:
                    return False
                
                dataToReturn['price']  += q*menuItem.price

                customizations = customization['customizations']
                
                for customizationDetails in customizations:
                    custID = customizationDetails['CustomizationID']

                    if custID in customizationIDSet:
                        return False
                    
                    customizationIDSet.add(custID)

                    custObj = MenuItemCustomization.objects.filter(pk=custID)
                    if not custObj.exists():
                        return False
                    
                    custObj = custObj.first()

                    if custObj.item != menuItem:
                        return False

                    options = customizationDetails['Options']

                    if custObj.customizationType == 'radio':
                        if len(options) != 1:
                            return False
                    
                    
                    for option in options:
                        optionID = option['id']

                        if optionID in optionIDSet:
                            return False
                        
                        optionIDSet.add(optionID)

                        optionObj = CustomatizationOptions.objects.filter(pk=optionID)
                        if not optionObj.exists():
                            return False
                        
                        optionObj = optionObj.first()
                    
                        #check if the option belongs to the customization
                        if optionObj.customization != custObj:
                            return False

                        dataToReturn['price'] += q*optionObj.price
                        menuItemCustomizationData['options'].append(optionObj)
                    
            
                menuItemData['customizations'].append(menuItemCustomizationData)
            
            dataToReturn['items'].append(menuItemData)
        
        return dataToReturn

    except Exception:
        return False

