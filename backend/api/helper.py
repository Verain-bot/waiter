from django.core.cache import cache

#Set table data using cache
def setTableData(data, restaurant):
    cache.set('tableData'+str(restaurant.id), data, timeout=60*60*24)
    return data

#Get table data using cache
def getTableData(restaurant):
    return cache.get('tableData'+str(restaurant.id))