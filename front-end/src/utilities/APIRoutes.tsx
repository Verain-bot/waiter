export const APIRoutes = {
    "CREATE" :  "/api/account/create/",
    "LOGIN": "/api/account/login/",
    "SEND_OTP": "/api/account/verify/phone/",
    "ENTER_OTP": "/api/account/otp/",
    "ACCOUNT_VIEW_UPDATE": "/api/account/account/",
    "LOGOUT": "/api/account/logout/",
    "RESTAURANT_LIST": "/api/restaurants/",
    "RESTAURANT_DETAILS": "/api/restaurants/details/:pk",
    "MENU_DETAILS": "/api/menu/details/:pk",
    "ORDER_LIST": "/api/account/orders/",
    "ORDER_DETAILS": "/api/account/orders/details/:pk"
}

export const makeURL = (route: string, params: Record<string, string | number>) => {
    let url = route
    for (const [key, value] of Object.entries(params)) {
        url = url.replace(`:${key}`, value.toString())
    }
    return url
}

export default APIRoutes