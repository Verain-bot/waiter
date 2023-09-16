import { CartItem, CartItemLeft, CartTotalItem } from "../components/cart/cartItem"
import { useContext, useEffect } from "react"
import Table from "../components/table/table"
import { TableHeading, TableItem } from "../components/table/tableItems"
import { useRatingContext } from "../context/RatingContext"
import { LoaderFunction, redirect, useLoaderData } from "react-router-dom"
import APIRoutes, { makeURL } from "../utilities/APIRoutes"
import { getData } from "../utilities/fetchData"
import { PATHS } from "../utilities/routeList"
import { MenuItemListFetch } from "./menu"
import { RestaurantListItemFetch } from "./restaurantList"

  
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
    orderStatus: string;
    rating: number | null;
    comment: string;
    takeawayOrDinein: number;
};
  


const App = ()=>{

    const [rate, setRate]= useRatingContext()
    const data = useLoaderData() as OrderData
    const review = ()=>{
        setRate({...rate,canRate:true, title: 'Rate order'})
    }

    const items = data.customers.flatMap(customer=>{
        return customer.items.flatMap(item=>{
            const itemDetails = item.item
            
            
            return item.quantity.flatMap(q =>{
                
                var d : ItemOptionFetch[]= []
                var {price} = q
                q.option.forEach(o=>{
                    const index = d.findIndex((element)=>element.customization==o.customization)

                    var s = o.price >0? `${o.name} +(${o.price})` : `${o.name}`
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


    console.log(JSON.stringify(data), items)

    return(
    <>
    <div className='col-12 col-md-6'>

        <Table title="Order Details" subTitle={`Order no.: #${data.id}`} info={`Order details for Order Number #${data.id}`}>
            <TableItem left='Restaurant' right={data.restaurant.name} width={4} nohr/>
            <TableItem left='Time' right={time.toLocaleString()} width={4} nohr />
            <TableItem left='Order ID' right={data.id} width={4} nohr />
            
        </Table>

        <Table title="Item Details" subTitle={`Order no.: #${data.id}`} info={`Items for Order Number #${data.id}`}>

                <TableHeading left='Item' right='Price' width={9} />
                
                {
                    items.map((item, index)=>
                        <TableItem left={<CartItemLeft name={item.itemDetails.name} custString={item.option} price={item.price} />} right={<Right price={item.price*item.qty} qty={item.qty} />} width={8} key={index} />
                    )
                }

            
                <hr />
                <CartTotalItem name='Grand Total' amount={data.price} strong />
                <br />

        </Table>

        <Table title='Order Status' >
            <TableItem right={<strong className='text-success'>{data.orderStatus}</strong>} left='Status' width={7} />
        </Table>


        <div className='row card shadow p-1 pb-3 pointer' onClick={review}>
            <h2 className='card-title mb-0 pb-2'>Rate order</h2>
            <h6 className='card-subtitle mb-0 pb-1'>Click here to provide feedback</h6>
        </div>
    </div>
    </>
    )
}

const Right = (props: {price: string | number, qty: string|number})=>{
    return(
        <div className='col-12'>
            <div className="row">
                <div className="col-6 small text-muted d-flex m-0 p-0 align-items-center">
                    <span>
                        Qty: {props.qty}
                    </span>
                </div>
                <div className="col-6">
                    {props.price}
                </div>
            </div>
        </div>
    )
}

export const orderDetailLoader : LoaderFunction = async ({params, request})=>{
    const url = makeURL(APIRoutes.ORDER_DETAILS, {'pk' : String(params.orderID)})
    const data = await getData(url, request.signal)
    const json = await data.json()
    return json
}

export default App