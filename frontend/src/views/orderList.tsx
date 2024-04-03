import useSearchBar from "../hooks/useSearchBar"
import Table from "../components/table/table"
import { TableHeading, TableItem } from "../components/table/tableItems"
import { LoaderFunction, defer, useLoaderData } from "react-router-dom"
import { getData } from "../utilities/fetchData"
import APIRoutes, { makeURL } from "../utilities/APIRoutes"
import { ArrayResponseFetch, RestaurantListItemFetch } from "./restaurantList"
import Search from "../utilities/search"
import { SearchResultMessage } from "../components/header/search"
import { Link } from "react-router-dom"
import { PATHS } from "../utilities/routeList"
import LoaderWrapper from "../components/loader/LoaderWrapper"

type OrderListTypeFetch = {
    id: number
    restaurant: RestaurantListItemFetch
    price: number
    time: string
}

const App = ({data} : {data : ArrayResponseFetch<OrderListTypeFetch>})=>{

    const search = useSearchBar()
    
    const results = Search(data.results,search,['restaurant.name'])
    
    if (results.length==0 && search.length===0)
        return(
    <div style={{marginTop: '200px'}} className="text-center loading-content">
        <h2>
            You don't have any orders yet.
            Please place a order and then come back.
            <br/>
            <br/>
            <Link to={PATHS.RESTAURANT_LIST} className='btn btn-outline-danger'>Browse Restaurants</Link>
        </h2>
    </div>)

    if (results.length==0 && search.length>0)
        return(
            <div className='col-12 col-md-6 m-0 p-0 loading-content'>
                <SearchResultMessage />
            <div style={{marginTop: '200px'}} className="text-center loading-content">
                <h2>
                    No Search Results Found.
                    <br/>
                </h2>
            </div>
            </div>
    )

    return(
        <>
        <div className='col-12 col-md-6 m-0 p-0 loading-content'>
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
    const data  = getData(APIRoutes.ORDER_LIST, request.signal).then((data)=>data.json())
    return defer({data: data})
}

const Main = ()=>LoaderWrapper(App)
export default Main