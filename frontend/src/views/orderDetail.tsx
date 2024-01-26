import { CartTotalItem } from "../components/cart/cartItem"
import Table from "../components/table/table"
import { TableHeading, TableItem } from "../components/table/tableItems"
import { useRatingContext } from "../context/RatingContext"
import { ActionFunction, LoaderFunction, defer, redirect, useLoaderData, useNavigation } from "react-router-dom"
import APIRoutes, { makeURL } from "../utilities/APIRoutes"
import { getData, makeRequest } from "../utilities/fetchData"
import { PATHS } from "../utilities/routeList"
import { MenuItemListFetch } from "./menu"
import { RestaurantListItemFetch } from "./restaurantList"
import { LoginContextType } from "../context/LoginContext"
import { ActionErrorDataType } from "../hooks/useActionError"
import OrderDetailItem from "../components/orders/orderDetailItem"
import PaymentBar from "../components/orders/paymentBar"
import NotificationPromptModal from "../components/modal/allowNotificationPromptModal"
import LoaderWrapper from "../components/loader/LoaderWrapper"


export type ItemOptionFetch = {
    id: number;
    customization: string;
    name: string;
    price: number;
    customizationID: number;
  }

export type ItemQuantityFetch = {
    id: number;
    option: ItemOptionFetch[];
    qty: number;
    price: number;
    itemDetail: number;
  };
  
export type SuborderFetch = {
    id: number;
    item: MenuItemListFetch;
    quantity: ItemQuantityFetch[];
    //price: number;
    suborder: number;
  };
  
export type CustomerListItemFetch = {
    id: number;
    first_name: string;
    last_name: string;
  };
  
export type CustomerOrderThroughFetch = {
    id: number;
    items: SuborderFetch[];
    customer: CustomerListItemFetch;
    price: number;
    tip: number;
    order: number;
  };
  
export type OrderData = {
    id: number;
    restaurant: RestaurantListItemFetch;
    customers: CustomerOrderThroughFetch[];
    price: number;
    time: string;
    tableNumber: number;
    tip: number;
    orderStatus: OrderStatusType;
    rating: number | null;
    comment: string;
    address: string;
    paymentStatus: string;
    takeawayOrDinein: number;
};
  
type OrderStatusType = 'NOT_CONFIRMED'|'CONFIRMED'|'PREPARING'|'DISPATCHING'|'READY'|'COMPLETE'|'CANCELLED'

const App = ({data} : {data : OrderData})=>{

    const [rate, setRate]= useRatingContext()
    
    const review = ()=>{
        setRate({...rate,
            canRate:true,
            title: 'Rate order',
            starFieldName: 'rating',
            url: makeURL(APIRoutes.ORDER_DETAILS,{'pk' : String(data.id)}),
            bodyFieldName: 'comment',
            showReviews: false,
            actionURL: makeURL(PATHS.ORDER_DETAIL, {orderID: data.id}),
            starsSelected: data.rating??0,
            reviewWritten: data.comment?data.comment:'',
            })
    }

    const items = data.customers.flatMap(customer=>{
        return customer.items.flatMap(item=>{
            const itemDetails = item.item
            
            return item.quantity.flatMap(q =>{
                
                const d : ItemOptionFetch[]= []
                const {price} = q
                q.option.forEach(o=>{
                    const index = d.findIndex((element)=>element.customization==o.customization)

                    const s = o.price >0? `${o.name} +(${o.price})` : `${o.name}`
                    if(index==-1)
                        d.push({...o, name: `${o.customization} : ${s}`})

                    else
                        d[index] = {...d[index], name: `${d[index].name}, ${s}`}
                })



                return { qty: q.qty, itemDetails: itemDetails,option: d.map(x=>x.name).join('; '), price: price/q.qty}
            })
        })
    })


    const time = new Date(data.time)

    return(
    <div className='col-12 col-md-6 loading-content'>
        <NotificationPromptModal />
        <Table title="Order Details" subTitle={`Order no.: #${data.id}`} info={`Order details for Order Number #${data.id}`}>
            <TableItem left='Restaurant' right={data.restaurant.name} width={4} nohr/>
            <TableItem left='Time' right={time.toLocaleString()} width={4} nohr />
            <TableItem left='Order ID' right={data.id} width={4} nohr />
            <TableItem left='Need Help?' right={<a href={`tel:${data.restaurant.phone}`} className="">Call Restaurant</a>} width={4} nohr />
        </Table>
        
        <PaymentBar paymentStatus={data.paymentStatus} orderID={data.id} />
        
        <Table title="Item Details" subTitle={`Order no.: #${data.id}`} info={`Items for Order Number #${data.id}`}>
                <TableHeading left='Item' right='Price' width={9} />
                {
                    items.map((item, index)=>
                        <OrderDetailItem name={item.itemDetails.name} custString={item.option} price={item.price} qty={item.qty} key={index}/>
                    )
                }
                <hr />
                <CartTotalItem name='Grand Total' amount={data.price} strong />
                <br />

        </Table>

        <Table title='Order Status' >
            <TableItem right={<strong className='text-dark'>{data.orderStatus.split('_').join(' ')}</strong>} left='Status' width={7} />
        </Table>


        {data.orderStatus == 'COMPLETE' && <div className='row card shadow p-1 pb-3 pointer' onClick={review}>
            <h1 className='card-title mb-0 pb-2'>Rate order</h1>
            <hr/>
            <h6 className='card-subtitle mb-0 pb-1'><strong>Click here to provide feedback</strong></h6>
        </div>
        }

    </div>
    )
}

export const orderDetailLoader : LoaderFunction = async ({params, request})=>{
    const url = makeURL(APIRoutes.ORDER_DETAILS, {'pk' : String(params.orderID)})
    const data =  getData(url, request.signal).then((data)=>data.json())
    return defer({data: data})
}

export const orderDetailAction : (val : [LoginContextType, React.Dispatch<React.SetStateAction<LoginContextType>>]) => ActionFunction = (LoginContext ) => async({request, params}) : Promise<ActionErrorDataType | Response>=>{
    const data= await request.formData()
    const {json, response, message} = await makeRequest(makeURL(APIRoutes.ORDER_DETAILS, {'pk': params.orderID as string}), request, data)
    if(!response.ok){
        return {
            heading: "Something went wrong",
            body: message,
            type: "error"
        }
    }

    return redirect(makeURL(PATHS.ORDER_DETAIL, {'orderID': params.orderID as string}))
}

const Main = ()=>LoaderWrapper(App)
export default Main