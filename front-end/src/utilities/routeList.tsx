import Login, { loginAction } from '../views/login';
import Menu, { MenuListLoader } from '../views/menu';
import RestaurantList, { RestaurantListLoader } from '../views/restaurantList';
import Loading from '../views/loading';
import Cart from '../views/cart'
import OrderDetail from '../views/orderDetail';
import OrderList from '../views/orderList';
import Credits from '../views/credits'
import OTP, { otpAction } from '../views/otp';
import Register from '../views/register';
import Address from '../views/deliveryAddress'
import { ActionFunction, LoaderFunction } from 'react-router-dom';
import { LoginContextType } from '../context/LoginContext';
import AccountDetailsView, { accountDetailsLoader } from '../views/accountDetails';
import AccountDetailsEdit, { accountDetailsEditAction } from '../views/accountDetailsEdit';

export const LOGGED_IN = 'LOGGED_IN'
export const LOGGED_OUT = 'LOGGED_OUT'
export const NAV = 'NAV'

type CustomRouteType = {
    path: PATHS,
    element: JSX.Element,
    name: string,
    nav: string[],
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
    ORDER_DETAIL = '/order/detail',
    ORDER_LIST = '/orderList',
    CREDITS = '/credits',
    OTP = '/otp',
    REGISTER = '/register',
    ADDRESS = '/address',
    ACCOUNT_DETAILS = '/account/details',
    ACCOUNT_DETAILS_EDIT = '/account/edit'
}


const list : CustomRouteType[] = [
    {
      path: PATHS.LOGIN,
      element: <Login />,
      name: 'Login',
      nav: [LOGGED_OUT, NAV],
      icon: "person-fill",
      action: loginAction
    },
    {
      path: PATHS.MENU,
      element: <Menu />,
      name: 'Menu',
      nav: [LOGGED_IN, NAV, LOGGED_OUT],
      icon: "grid-fill",
      ldr: MenuListLoader,
    },
    {
      path: PATHS.RESTAURANT_LIST,
      element: <RestaurantList />,
      name: 'Restaurants',
      nav: [LOGGED_IN, NAV, LOGGED_OUT],
      icon: "house-door-fill",
      ldr: RestaurantListLoader,
    },
    {
      path: PATHS.LOADING,
      element: <Loading />,
      name: 'Loading',
      nav: [LOGGED_IN, LOGGED_OUT],
      icon: "hourglass-split"
    },
    {
      path: PATHS.CART,
      element: <Cart />,
      name: 'Cart',
      nav: [LOGGED_IN, NAV],
      icon: "cart-fill"
    },
    {
      path: PATHS.ORDER_DETAIL,
      element: <OrderDetail />,
      name: 'Order Detail',
      nav: [LOGGED_IN],
      icon: "file-earmark-text-fill"
    },
    {
      path: PATHS.ORDER_LIST,
      element: <OrderList />,
      name: 'OrderList',
      nav: [LOGGED_IN, NAV],
      icon: "list-ul"
    },
    {
      path: PATHS.CREDITS,
      element: <Credits />,
      name: 'Credits',
      nav: [LOGGED_IN, NAV],
      icon: "credit-card-fill"
    },
    {
      path: PATHS.OTP,
      element: <OTP />,
      name: 'OTP',
      nav: [LOGGED_OUT],
      icon: "key-fill",
      action: otpAction,
      
    },
    {
      path: PATHS.REGISTER, 
      element: <Register />,
      name: 'Register',
      nav: [LOGGED_OUT, NAV],
      icon: "person-plus-fill"
    },
    {
      path: PATHS.ADDRESS,
      element: <Address />,
      name: 'Address',
      nav: [LOGGED_IN],
      icon: "geo-alt-fill"
    },
    {
      path: PATHS.ACCOUNT_DETAILS,
      element: <AccountDetailsView />,
      name: 'Account Details',
      nav: [LOGGED_IN],
      icon: "person-circle",
      ldr: accountDetailsLoader,
    },{
      path: PATHS.ACCOUNT_DETAILS_EDIT,
      element: <AccountDetailsEdit />,
      name: 'Account Details ',
      nav: [LOGGED_IN],
      icon: "person-circle",
      action: accountDetailsEditAction,
    }
  ];
  
                                    
export default list