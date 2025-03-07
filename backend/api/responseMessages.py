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

CART_PRICE = lambda price: {
    'message' : 'Cart is Valid',
    'price': price,
    'type' : 'success',
}

ORDER_COMMENT_AFTER_COMPLETED = {
    'message' : 'Please wait for the order to complete before commenting.',
    'type' : 'error',
}