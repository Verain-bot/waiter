import useSearchBar from "../hooks/useSearchBar"
import Table from "../components/table/table"
import { TableHeading, TableItem } from "../components/table/tableItems"
import { LoaderFunction, useLoaderData } from "react-router-dom"
import { getData } from "../utilities/fetchData"
import APIRoutes, { makeURL } from "../utilities/APIRoutes"
import { ArrayResponseFetch, RestaurantListItemFetch } from "./restaurantList"
import Search from "../utilities/search"
import { SearchResultMessage } from "../components/header/search"
import { Link } from "react-router-dom"
import { PATHS } from "../utilities/routeList"

type OrderListTypeFetch = {
    id: number
    restaurant: RestaurantListItemFetch
    price: number
    time: string
}

const App = ()=>{

    const search = useSearchBar()
    const data = useLoaderData() as ArrayResponseFetch<OrderListTypeFetch>
    console.log('data',data)
    const results = Search(data.results,search,'restaurant.name')
    if (results.length==0)
        return(
    <div style={{marginTop: '200px'}} className="text-center">
        <h2>
            You don't have any orders yet.
            Please place a order and then come back.
            <br/>
            <br/>
            <Link to={PATHS.RESTAURANT_LIST} className='btn btn-outline-danger'>Browse Restaurants</Link>
        </h2>
    </div>)
    return(
        <>
        <div className='col-12 col-md-6 m-0 p-0'>
            <SearchResultMessage />
            <Table title='Orders' subTitle={'Your orders from all the restaurants available'} info={'Check your order history here. In case you need help, please contact the restaurant.'}  >
                <TableHeading left='Restaurant' right='Amount' width={8} />
                {
                    results.map((item)=>
                    <Link to={makeURL(PATHS.ORDER_DETAIL, {'orderID' : item.id})} className='text-decoration-none text-dark' key={item.id}>
                        <TableItem left={<Left id={item.id} restaurant={item.restaurant.name} time={item.time} />} right={<Right price={item.price} />} width={8}/>
                    </Link>
                    )
                }
                
            </Table>
        </div>
        </>       
    )
}

type OrderListTableRightProps = {
    price: number
}

type OrderListTableLeftProps = {
    id: number
    restaurant: string
    time: string
}

const Right : React.FC<OrderListTableRightProps> = (props )=>{
    return(
    <div className='d-flex flex-column align-items-center justify-content-center'>
        <h6 className='p-0 m-0'>{props.price}</h6>
    </div>
    )
}

const Left : React.FC<OrderListTableLeftProps>= (props)=>{
    const d = new Date(props.time)
    
    return(
        <>
            <span className='text-muted small m-0 p-0'>Order ID: #{props.id}</span>
            <h6 className='p-0 m-0'>{props.restaurant}</h6>
            <span className='small m-0 p-0'>{d.toDateString()}</span>
        </>
    )
}

export const orderListLoader : LoaderFunction = async ({request})=>{
    const data  = await getData(APIRoutes.ORDER_LIST, request.signal)
    const json = await data.json()
    console.log('json',json)
    return json
}


export default App