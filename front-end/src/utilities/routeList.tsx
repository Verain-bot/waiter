import Login, { loginAction } from '../views/login';
import Menu, { MenuListLoader } from '../views/menu';
import RestaurantList, { RestaurantListLoader } from '../views/restaurantList';
import Loading from '../views/loading';
import Cart, { cartLoader } from '../views/cart'
import OrderDetail, { orderDetailLoader } from '../views/orderDetail';
import OrderList, { orderListLoader } from '../views/orderList';
import Credits from '../views/credits'
import OTP, { otpAction } from '../views/otp';
import Register, { registerAction } from '../views/register';
import Address, { addressChangeAction } from '../views/deliveryAddress'
import { ActionFunction, LoaderFunction } from 'react-router-dom';
import { LoginContextType } from '../context/LoginContext';
import AccountDetailsView, { accountDetailsLoader } from '../views/accountDetails';
import AccountDetailsEdit, { accountDetailsEditAction } from '../views/accountDetailsEdit';
import { cartFooterAction } from '../components/cart/cartFooter';
import OrderSuccess from '../views/orderSuccess'
export enum PathType{
    LOGGED_IN,
    LOGGED_OUT,
    NAVBAR
}


type CustomRouteType = {
    path: PATHS,
    element: JSX.Element,
    name: string,
    pathType: PathType[],
    icon: string,
    ldr?: LoaderFunction,
    action?: (val : [LoginContextType, React.Dispatch<React.SetStateAction<LoginContextType>>]) => ActionFunction
}


export enum PATHS {
    LOGIN = '/',
    MENU = '/restaurant/:restaurantID/menu',  // :restaurantID is a parameter
    RESTAURANT_LIST = '/restaurants',
    LOADING = '/loading',
    CART = '/cart',
    ORDER_DETAIL = '/orders/details/:orderID', // :orderID is a parameter
    ORDER_LIST = '/orders/list',
    CREDITS = '/credits',
    OTP = '/otp',
    REGISTER = '/register',
    ADDRESS = '/address',
    ACCOUNT_DETAILS = '/account/details',
    ACCOUNT_DETAILS_EDIT = '/account/edit',
    ORDER_CREATED_SUCCESS = '/order/success/:orderID',
}


const list : CustomRouteType[] = [
    {
      path: PATHS.LOGIN,
      element: <Login />,
      name: 'Login',
      pathType: [PathType.LOGGED_OUT, PathType.NAVBAR],
      icon: "person-fill",
      action: loginAction,
      
    },
    {
      path: PATHS.MENU,
      element: <Menu />,
      name: 'Menu',
      pathType: [PathType.LOGGED_IN, PathType.LOGGED_OUT],
      icon: "grid-fill",
      ldr: MenuListLoader,
    },
    {
      path: PATHS.RESTAURANT_LIST,
      element: <RestaurantList />,
      name: 'Restaurants',
      pathType: [PathType.LOGGED_IN, PathType.NAVBAR, PathType.LOGGED_OUT],
      icon: "house-door-fill",
      ldr: RestaurantListLoader,
    },
    {
      path: PATHS.LOADING,
      element: <Loading />,
      name: 'Loading',
      pathType: [PathType.LOGGED_IN, PathType.LOGGED_OUT],
      icon: "hourglass-split"
    },
    {
      path: PATHS.CART,
      element: <Cart />,
      name: 'Cart',
      pathType: [PathType.LOGGED_IN, PathType.NAVBAR],
      icon: "cart-fill",
      ldr: cartLoader,
      action: cartFooterAction,
    },
    {
      path: PATHS.ORDER_DETAIL,
      element: <OrderDetail />,
      name: 'Order Detail',
      pathType: [PathType.LOGGED_IN],
      icon: "file-earmark-text-fill",
      ldr: orderDetailLoader
    },
    {
      path: PATHS.ORDER_LIST,
      element: <OrderList />,
      name: 'Orders',
      pathType: [PathType.LOGGED_IN, PathType.NAVBAR],
      icon: "list-ul",
      ldr: orderListLoader,
    },
    {
      path: PATHS.CREDITS,
      element: <Credits />,
      name: 'Credits',
      pathType: [PathType.LOGGED_IN, PathType.NAVBAR],
      icon: "credit-card-fill"
    },
    {
      path: PATHS.OTP,
      element: <OTP />,
      name: 'OTP',
      pathType: [PathType.LOGGED_OUT],
      icon: "key-fill",
      action: otpAction,
      
    },
    {
      path: PATHS.REGISTER, 
      element: <Register />,
      name: 'Register',
      pathType: [PathType.LOGGED_OUT],
      icon: "person-plus-fill",
      action: registerAction
    },
    {
      path: PATHS.ADDRESS,
      element: <Address />,
      name: 'Address',
      pathType: [PathType.LOGGED_IN],
      icon: "geo-alt-fill",
      action: addressChangeAction,
    },
    {
      path: PATHS.ACCOUNT_DETAILS,
      element: <AccountDetailsView />,
      name: 'Account Details',
      pathType: [PathType.LOGGED_IN, PathType.NAVBAR],
      icon: "person-circle",
      ldr: accountDetailsLoader,
    },
    {
      path: PATHS.ACCOUNT_DETAILS_EDIT,
      element: <AccountDetailsEdit />,
      name: 'Account Details ',
      pathType: [PathType.LOGGED_IN],
      icon: "person-circle",
      action: accountDetailsEditAction,
    },
    {
      path: PATHS.ORDER_CREATED_SUCCESS,
      element: <OrderSuccess />,
      name: 'Order Created Successfully ',
      pathType: [PathType.LOGGED_IN],
      icon: "person-circle",
    }
  ];
  
                                    
export default list