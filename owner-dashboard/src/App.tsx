import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.sass'
import Header from './components/header'
import OrderCard from './components/orderCard'
//import OrderPlaceHolder from './components/orderCardPlaceholder';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { useOrderContext } from './Contexts/orderContext';
import { useEffect } from 'react';


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

export type OrderStatusType = 'NOT_CONFIRMED'|'CONFIRMED'|'PREPARING'|'DISPATCHING'|'READY'|'COMPLETE'|'CANCELLED'

const App = ()=> {

  const [data, _] = useOrderContext()
  

  return (
    <>
      <Header/>
      <main>
        <div className="col-12 " >

            
            <ResponsiveMasonry columnsCountBreakPoints={{250: 1, 700: 2, 1000: 3, 1200: 4}} >
              <Masonry >
              
              {
                data.map((item )=>
                <OrderCard {...item} key={item.id} />
                )
              }
              
            </Masonry>
            </ResponsiveMasonry>
            
          </div>
      </main>
    </>
  )
}


export default App
