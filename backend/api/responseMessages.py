INVALID_REQUEST = {
    'message' : 'Invalid request',
    'type' : 'error',
}

GENERAL_SUCCESS = {
    'message' : 'Success',
    'type' : 'success',
}

ORDER_CREATED = lambda  price, orderID: {
    'message' : 'Order created successfully',
    'price': price,
    'type' : 'success',
    'orderID' : orderID
}