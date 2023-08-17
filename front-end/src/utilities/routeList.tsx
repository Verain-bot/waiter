import Login from '../views/login';
import Menu, { MenuListLoader } from '../views/menu';
import RestaurantList, { RestaurantListLoader } from '../views/restaurantList';
import Loading from '../views/loading';
import Cart from '../views/cart'
import OrderDetail from '../views/orderDetail';
import OrderList from '../views/orderList';
import Credits from '../views/credits'
import OTP from '../views/otp';
import Register from '../views/register';
import Address from '../views/deliveryAddress'

export const LOGGED_IN = 'LOGGED_IN'
export const LOGGED_OUT = 'LOGGED_OUT'
export const NAV = 'NAV'

type CustomRouteType = {
    path: string,
    element: JSX.Element,
    name: string,
    nav: string[],
    icon: string,
    ldr?: any 
}

const list : CustomRouteType[] = [
    {
      path: '/',
      element: <Login />,
      name: 'Login',
      nav: [LOGGED_OUT, NAV],
      icon: "person-fill"
    },
    {
      path: '/restaurant/:restaurantID/menu',
      element: <Menu />,
      name: 'Menu',
      nav: [LOGGED_IN, NAV, LOGGED_OUT],
      icon: "grid-fill",
      ldr: MenuListLoader,
    },
    {
      path: '/restaurants',
      element: <RestaurantList />,
      name: 'Restaurants',
      nav: [LOGGED_IN, NAV, LOGGED_OUT],
      icon: "house-door-fill",
      ldr: RestaurantListLoader,
    },
    {
      path: '/loading',
      element: <Loading />,
      name: 'Loading',
      nav: [LOGGED_IN, LOGGED_OUT],
      icon: "hourglass-split"
    },
    {
      path: '/cart',
      element: <Cart />,
      name: 'Cart',
      nav: [LOGGED_IN, NAV],
      icon: "cart-fill"
    },
    {
      path: '/orderDetail',
      element: <OrderDetail />,
      name: 'OrderDetail',
      nav: [LOGGED_IN],
      icon: "file-earmark-text-fill"
    },
    {
      path: '/orderList',
      element: <OrderList />,
      name: 'OrderList',
      nav: [LOGGED_IN, NAV],
      icon: "list-ul"
    },
    {
      path: '/credits',
      element: <Credits />,
      name: 'Credits',
      nav: [LOGGED_IN, NAV],
      icon: "credit-card-fill"
    },
    {
      path: '/otp',
      element: <OTP />,
      name: 'OTP',
      nav: [LOGGED_OUT],
      icon: "key-fill"
    },
    {
      path: '/register',
      element: <Register />,
      name: 'Register',
      nav: [LOGGED_OUT, NAV],
      icon: "person-plus-fill"
    },
    {
      path: '/address',
      element: <Address />,
      name: 'Address',
      nav: [LOGGED_IN],
      icon: "geo-alt-fill"
    }
  ];
  
                                    
export default list