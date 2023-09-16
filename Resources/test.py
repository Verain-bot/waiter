import json

class Something:
    def __init__(self, j):
        self.__dict__ = json.loads(j)



jsonString = '{"menuItemID":3,"menuItemName":"Snacks","menuItemPrice":300,"restaurantID":1,"customizations":[{"quantity":1,"customizations":[{"CustomizationID":4,"CustomizationName":"Size","Options":[{"id":11,"name":"Medium","price":50}]}]}]}'

x = Something(jsonString)
print(x['menuItemID'])

