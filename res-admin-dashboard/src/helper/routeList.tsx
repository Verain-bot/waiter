import { ActionFunction, LoaderFunction } from "react-router";
import OrderListView from "../views/orderListView";
import ItemListView from "../views/itemListView";
import MenuListView, { MenuListLoader } from "../views/menuListView";
import { MenuPauseResumeAction } from "../components/modals/pauseResumeMenuItemModal";

type CustomRouteType = {
    path: PATHS,
    element: JSX.Element,
    ldr?: LoaderFunction,
    action?: ActionFunction
}


export enum PATHS {
    ORDER_LIST = '/',
    ITEM_LIST = '/items',
    MENU_LIST = '/menu',
}


const RouteList : CustomRouteType[] = [
    {
        path: PATHS.ORDER_LIST,
        element: <OrderListView />,
    },
    {
        path: PATHS.ITEM_LIST,
        element: <ItemListView />,
    },
    {
        path: PATHS.MENU_LIST,
        element: <MenuListView />,
        ldr: MenuListLoader,
        action: MenuPauseResumeAction,
    }
  ];

  
                                    
export default RouteList