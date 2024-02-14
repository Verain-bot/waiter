import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './styles.sass'
import Header from './components/header'
import OrderCard from './components/orderCard'
//import OrderPlaceHolder from './components/orderCardPlaceholder';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { useOrderContext } from './Contexts/orderContext';
import { useEffect, useState } from 'react';
import { BASEUrl, makeRequest } from './helper/fetchData';
import { APIRoutes } from './helper/APIRoutes';
import {  sendPushToken } from './helper/firebase';
import OrderListView from './views/orderListView';
import PromptModal from './components/modals/promptModal';
import ItemListView from './views/itemListView';
import PauseResumeMenuItemModal from './components/modals/pauseResumeMenuItemModal';
import MenuListView from './views/menuListView';
import {Outlet, useNavigate} from 'react-router-dom'

type Item = {
  id: number;
  name: string;
  url: string;
  itemType: string;
  price: number;
  description: string;
  itemPhoto: string | null;
  hasCustomization: boolean;
};

export type CustomizationOption = {
  id: number
  customization: string
  customizationID: number
  name: string
  price: number
}

type Quantity = {
  id: number;
  option: CustomizationOption[];
  qty: number;
  price: number;
  itemDetail: number;
};

type Customer = {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
};

type Restaurant = {
  id: number;
  name: string;
  logo: string | null;
  url: string;
};

type Suborder = {
  id: number;
  item: Item;
  quantity: Quantity[];
  suborder: number;
};

type OrderCustomer = {
  id: number;
  items: Suborder[];
  customer: Customer;
  price: number;
  tip: number;
  order: number;
};

export type OrderType = {
  id: number;
  restaurant: Restaurant;
  customers: OrderCustomer[];
  price: number;
  time: string;
  tableNumber: number;
  orderStatus: OrderStatusType
  tip: number;
  rating: number | null;
  comment: string;
  takeawayOrDinein: number;
  address?: string
};


export enum Views {
  ORDERS = 'orders',
  ITEMS = 'items',
}

export type OrderStatusType = 'NOT_CONFIRMED'|'CONFIRMED'|'PREPARING'|'DISPATCHING'|'READY'|'COMPLETE'|'CANCELLED'

const App = ()=> {

  
  const [name, setName] = useState<string>('Orders')
  const [view,setView] = useState<Views>(Views.ORDERS)

  const getData = async()=>{
    const req = new Request(APIRoutes.ADMIN_GET_DETAILS, { method: 'GET'})
    try{
      const res = await makeRequest(APIRoutes.ADMIN_GET_DETAILS, req, new FormData)
      if (!res.response.ok)
      //@ts-ignore
        window.location = BASEUrl+APIRoutes.ADMIN_LOGIN
    const currentToken = res.json.token
    setName(res.json.restaurant)

    if ('serviceWorker' in navigator && 'PushManager' in window && Notification.permission === 'granted'){
        sendPushToken(currentToken)
      }
    }
    catch(err){
      console.log('error Caught')
      //@ts-ignore
      
      console.log(err)
    }
  }

  useEffect(()=>{
    getData()
  },[])


  return (
    <>
      <Header name={name}/>
      <PromptModal onAccept={getData} />
      <PauseResumeMenuItemModal />
      <Outlet />
    </>
  )
}


export default App
