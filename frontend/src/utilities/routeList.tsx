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
import RefundPolicy from '../views/refundPolicy'

export enum PathType{
    LOGGED_IN,
    LOGGED_OUT,
    NAVBAR
}

type CustomRouteType = {
    viewFileName: string
    path: PATHS,
    element: JSX.Element,
    name: string,
    pathType: PathType[],
    icon?: string,
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
    REGISTER = '/complete-registration',
    ACCOUNT_DETAILS = '/account/details',
    ACCOUNT_DETAILS_EDIT = '/account/edit',
    ORDER_CREATED_SUCCESS = '/order/success/:orderID',
    CONTACT = '/contact',
    ABOUT = '/about',
    PRIVACY_POLICY = '/privacy-policy',
    TERMS = '/terms-and-conditions',
    PWA_INFO = '/pwa-info',
    REFUND_POLICY = '/return-policy',
}


const list : CustomRouteType[] = [
    {
      path: PATHS.LOGIN,
      element: <Login />,
      name: 'Login',
      pathType: [PathType.LOGGED_OUT, PathType.NAVBAR],
      icon: "person-fill",
      action: loginAction,
      viewFileName: 'login.tsx',
    },
    {
      path: PATHS.MENU,
      element: <Menu />,
      name: 'Menu',
      pathType: [PathType.LOGGED_IN, PathType.LOGGED_OUT],
      ldr: MenuListLoader,
      viewFileName:'menu.tsx'
    },
    {
      path: PATHS.RESTAURANT_LIST,
      element: <RestaurantList />,
      name: 'Restaurants',
      pathType: [PathType.LOGGED_IN, PathType.NAVBAR, PathType.LOGGED_OUT],
      icon: "house-door-fill",
      ldr: RestaurantListLoader,
      viewFileName: 'restaurantList.tsx'
    },
    {
      path: PATHS.CART,
      element: <Cart />,
      name: 'Cart',
      pathType: [PathType.LOGGED_IN, PathType.NAVBAR],
      icon: "cart-fill",
      ldr: cartLoader,
      action: cartFooterAction,
      viewFileName: 'cart.tsx'
    },
    {
      path: PATHS.ORDER_DETAIL,
      element: <OrderDetail />,
      name: 'Order Detail',
      pathType: [PathType.LOGGED_IN],
      ldr: orderDetailLoader,
      action: orderDetailAction,
      viewFileName: 'orderDetail.tsx'
    },
    {
      path: PATHS.ORDER_LIST,
      element: <OrderList />,
      name: 'Orders',
      pathType: [PathType.LOGGED_IN, PathType.NAVBAR],
      icon: "list-ul",
      ldr: orderListLoader,
      viewFileName: 'orderList.tsx'
    },
    {
      path: PATHS.CREDITS,
      element: <Credits />,
      name: 'Credits',
      pathType: [PathType.LOGGED_IN, PathType.NAVBAR],
      icon: "credit-card-fill",
      viewFileName: 'credits.tsx'
    },
    {
      path: PATHS.OTP,
      element: <OTP />,
      name: 'OTP',
      pathType: [PathType.LOGGED_OUT],
      action: otpAction,
      viewFileName: 'otp.tsx'
      
    },
    {
      path: PATHS.REGISTER, 
      element: <Register />,
      name: 'Register',
      pathType: [PathType.LOGGED_IN],
      action: registerAction,
      viewFileName: 'register.tsx'
    },
    {
      path: PATHS.ACCOUNT_DETAILS,
      element: <AccountDetailsView />,
      name: 'Account Details',
      pathType: [PathType.LOGGED_IN, PathType.NAVBAR],
      icon: "person-circle",
      ldr: accountDetailsLoader,
      viewFileName: 'accountDetails.tsx'
    },
    {
      path: PATHS.ACCOUNT_DETAILS_EDIT,
      element: <AccountDetailsEdit />,
      name: 'Account Details ',
      pathType: [PathType.LOGGED_IN],
      icon: "person-circle",
      action: accountDetailsEditAction,
      viewFileName: 'accountDetailsEdit.tsx'
    },
    {
      path: PATHS.ORDER_CREATED_SUCCESS,
      element: <OrderSuccess />,
      name: 'Order Created Successfully ',
      pathType: [PathType.LOGGED_IN],
      viewFileName: 'orderSuccess.tsx'
    },
    {
      path: PATHS.CONTACT,
      element: <ContactUs />,
      name: 'Contact Us',
      pathType: [PathType.LOGGED_IN, PathType.NAVBAR, PathType.LOGGED_OUT],
      icon: "telephone-fill",
      viewFileName: 'contact.tsx'
    },
    {
      path: PATHS.ABOUT,
      element: <AboutUs />,
      name: 'About Us',
      pathType: [PathType.LOGGED_IN, PathType.NAVBAR, PathType.LOGGED_OUT],
      icon: "at",
      viewFileName: 'about.tsx'
    },
    {
      path: PATHS.PRIVACY_POLICY,
      element: <PrivacyPolicy />,
      name: 'Privacy Policy',
      pathType: [PathType.LOGGED_IN, PathType.LOGGED_OUT],
      viewFileName: 'privacyPolicy.tsx'
    },
    {
      path: PATHS.TERMS,
      element: <Terms />,
      name: 'Terms and Conditions',
      pathType: [PathType.LOGGED_IN, PathType.LOGGED_OUT],
      viewFileName: 'tnc.tsx'
    },
    {
      path: PATHS.PWA_INFO,
      element: <PWAInfo />,
      name: 'PWA Info',
      pathType: [PathType.LOGGED_IN, PathType.LOGGED_OUT],
      viewFileName: 'pwainfo.tsx'
    },
    {
      path: PATHS.REFUND_POLICY,
      element: <RefundPolicy />,
      name: 'Refund Policy',
      pathType: [PathType.LOGGED_IN, PathType.LOGGED_OUT],
      viewFileName: 'refundPolicy.tsx'
    },{
      path: PATHS.LOADING,
      element: <Loading />,
      name: 'Loading',
      pathType: [PathType.LOGGED_IN, PathType.LOGGED_OUT],
      viewFileName: 'loading.tsx'
    }
  ];

  
                                    
export default list