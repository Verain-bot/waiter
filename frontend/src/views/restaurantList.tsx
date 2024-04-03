import { Suspense, useEffect, useState } from "react"
import { SearchResultMessage } from "../components/header/search"
import RestaurantListItem  from "../components/restaurantList/restaurantListItem"
import { getData } from "../utilities/fetchData"
import APIRoutes from "../utilities/APIRoutes"
import Search from "../utilities/search"
import useSearchBar from "../hooks/useSearchBar"
import { Await, Link, defer, useLoaderData, useOutletContext } from "react-router-dom"
import { ErrorBoundary } from "react-error-boundary"
import ErrorComp from "../components/error/ErrorComp"
import Loading from './loading'
import LoaderWrapper from "../components/loader/LoaderWrapper"

export type RestaurantListItemFetch = {
    id: number;
    name: string;
    logo: string | null;
    url: string;
    totalRatings: number
    rating: number
    acceptingOrders: boolean
    phone: string
    restaurantType: string
  };
  
export type ArrayResponseFetch<T> = {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
  };
  

const App = ({data} : {data : ArrayResponseFetch<RestaurantListItemFetch>})=>{

    const search = useSearchBar()
    const filteredRestaurants = Search(data.results,search,['name']).filter((item)=>item.acceptingOrders)
    
    if (filteredRestaurants.length === 0)
        return(
            <div className='col-md-5 col-12 loading-content'>
                <SearchResultMessage />
                <div className="col-12 mt-5">
                    <h2>Not found.</h2>
                    <span>
                        Unable to find restaurants nearby. Please try again later.
                    </span>
                </div>            
            </div>
        )

    return(
            <div className='col-md-5 col-12 loading-content'>
            
            <ErrorBoundary fallbackRender={ErrorComp} onReset={()=>window.location.reload()}>
                <div className="col-12">
                    <h2>Explore</h2>
                </div>            

                <SearchResultMessage />
                {
                    filteredRestaurants.map((item)=>{         
                        return <RestaurantListItem id={item.id} key={item.id} name={item.name} type={item.restaurantType} img={item.logo} totalRatings={item.totalRatings} rating={item.rating} />
                    })
                }
            </ErrorBoundary>
            
            </div>
    )   
}



export const RestaurantListLoader = async ({request }: {request: Request}) =>{
    const data = getData(APIRoutes.RESTAURANT_LIST,request.signal).then((data)=>data.json())
    return defer({data: data})
}

const Main = ()=>LoaderWrapper(App)

export default Main