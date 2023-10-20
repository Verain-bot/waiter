from django.core.cache import cache

def setRestaurantOrderAvailable(userID : int, available : bool):
    userID = str(userID)
    cache.set("HAS_NEW_ORDERS:"+userID, available, timeout=60)

def getRestaurantOrderAvailable(userID):
    return cache.get("HAS_NEW_ORDERS:"+str(userID))