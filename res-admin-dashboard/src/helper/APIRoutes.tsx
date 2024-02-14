export const APIRoutes = {
    'ADMIN_LOGIN': '/restaurant/admin/login/',
    'ADMIN_ORDERS': '/restaurant/admin/orders/',
    'ADMIN_LOGOUT': '/restaurant/admin/logout/',
    'ADMIN_RESTAURANT_ADMIN': '/admin/api/restaurant/',
    'ADMIN_ORDERS_ADMIN': '/admin/api/order/',
    'ADMIN_ACCEPTING_ORDERS': '/restaurant/admin/change/acceptingOrders',
    'ADMIN_UPDATE_ORDER_STATUS': '/restaurant/admin/orders/update/:pk',
    'ADMIN_ORDERS_AVAILABLE': '/restaurant/admin/orders/available',
    'ADMIN_GET_DETAILS' : '/restaurant/admin/details/',
    'ADMIN_UPDATE_TOKEN': '/api/account/device-token/',
    'ADMIN_MENU': '/restaurant/admin/menu/'
}

export const makeURL = (route: string, params: Record<string, string | number>) => {
    let url = route
    for (const [key, value] of Object.entries(params)) {
        url = url.replace(`:${key}`, value.toString())
    }
    return url
}