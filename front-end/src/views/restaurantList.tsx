import { useEffect, useState } from "react"
import { SearchResultMessage } from "../components/header/search"
import RestaurantListItem  from "../components/restaurantList/restaurantListItem"
import { getData } from "../utilities/fetchData"
import APIRoutes from "../utilities/APIRoutes"
import Search from "../utilities/search"
import useSearchBar from "../hooks/useSearchBar"
import { Link, useLoaderData, useOutletContext } from "react-router-dom"

export type RestaurantListItemFetch = {
    id: number;
    name: string;
    logo: string | null;
    url: string;
    totalRatings: number
    rating: number
  };
  
export type ArrayResponseFetch<T> = {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
  };
  
  

const App = ()=>{
    
    const data = useLoaderData() as ArrayResponseFetch<RestaurantListItemFetch>
    const search = useSearchBar()
    const filteredRestaurants = Search(data.results,search,'name')
    

    return(
            <div className='col-md-6 col-12'>

            <div className="col-12">
                <h2>Explore</h2>
            </div>
            <SearchResultMessage />
            {
                filteredRestaurants.map((item)=>{
                    return <RestaurantListItem id={item.id} key={item.id} name={item.name} type={item.type} img={item.img} totalRatings={item.totalRatings} rating={item.rating} />
                })
            }
            
            </div>
    )
}


export const RestaurantListLoader = async ({request }: {request: Request}) =>{
    const data = await getData(APIRoutes.RESTAURANT_LIST,request.signal)
    return data.json()
}



export default App