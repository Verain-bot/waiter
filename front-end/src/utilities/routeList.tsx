import Login, { loginAction } from '../views/login';
import Menu, { MenuListLoader } from '../views/menu';
import RestaurantList, { RestaurantListLoader } from '../views/restaurantList';
import Loading from '../views/loading';
import Cart, { cartLoader } from '../views/cart'
import OrderDetail, { orderDetailAction, orderDetailLoader } from '../views/orderDetail';
import OrderList, { orderListLoader } from '../views/orderList';
import Credits from '../views/credits'
import OTP, { otpAction } from '../views/otp';
import Register, { registerAction } from '../views/register';
import { ActionFunction, LoaderFunction } from 'react-router-dom';
import { LoginContextType } from '../context/LoginContext';
import AccountDetailsView, { accountDetailsLoader } from '../views/accountDetails';
import AccountDetailsEdit, { accountDetailsEditAction } from '../views/accountDetailsEdit';
import { cartFooterAction } from '../components/cart/cartFooter';
import OrderSuccess from '../views/orderSuccess'
import ContactUs from '../views/contact'
import AboutUs from '../views/about';
import PrivacyPolicy from '../views/privacyPolicy'
import Terms from '../views/tnc'
import PWAInfo from '../views/pwainfo'

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
    ACCOUNT_DETAILS = '/account/details',
    ACCOUNT_DETAILS_EDIT = '/account/edit',
    ORDER_CREATED_SUCCESS = '/order/success/:orderID',
    CONTACT = '/contact',
    ABOUT = '/about',
    PRIVACY_POLICY = '/privacy-policy',
    TERMS = '/terms-and-conditions',
    PWA_INFO = '/pwa-info',
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
      ldr: orderDetailLoader,
      action: orderDetailAction
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
    },
    {
      path: PATHS.CONTACT,
      element: <ContactUs />,
      name: 'Contact Us',
      pathType: [PathType.LOGGED_IN, PathType.NAVBAR, PathType.LOGGED_OUT],
      icon: "telephone-fill",
    },
    {
      path: PATHS.ABOUT,
      element: <AboutUs />,
      name: 'About Us',
      pathType: [PathType.LOGGED_IN, PathType.NAVBAR, PathType.LOGGED_OUT],
      icon: "at",
    },
    {
      path: PATHS.PRIVACY_POLICY,
      element: <PrivacyPolicy />,
      name: 'Privacy Policy',
      pathType: [PathType.LOGGED_IN, PathType.LOGGED_OUT],
      icon: "at",
    },
    {
      path: PATHS.TERMS,
      element: <Terms />,
      name: 'Terms and Conditions',
      pathType: [PathType.LOGGED_IN, PathType.LOGGED_OUT],
      icon: "at",
    },
    {
      path: PATHS.PWA_INFO,
      element: <PWAInfo />,
      name: 'PWA Info',
      pathType: [PathType.LOGGED_IN, PathType.LOGGED_OUT],
      icon: "at",
    },
  ];

  
                                    
export default list