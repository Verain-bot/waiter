ORDER_ID_NOT_PASSED = {
    "message": "Order id not passed in the request",
    "type": "error",
}

ORDER_CANT_PAY = {
    "message": "You can't pay for this order. Please place a new order. If you think this is a mistake, please contact us.",
    "type": "error",
}

ORDER_SERVER_ERROR = {
    "message": "PG returned an error",
    "type": "error",
}

ORDER_STATUS_CHECK_MESSAGE = lambda x: {
    "message": "Your payment was successful." if x else "Your payment was not successful",
    "type": "error",
}

ORDER_INVALID_FIELDS_PASSED = {
    "message": "Invalid fields passed",
    "type": "error",
}

ORDER_NOT_PAID = {
    "message": "Payment unsuccessful",
    "type": "error",
}