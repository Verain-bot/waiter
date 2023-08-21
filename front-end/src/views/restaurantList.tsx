import { useEffect, useState } from "react"
import { SearchResultMessage } from "../components/header/search"
import RestaurantListItem  from "../components/restaurantList/restaurantListItem"
import { getData } from "../utilities/fetchData"
import Search from "../utilities/search"
import useSearchBar from "../hooks/useSearchBar"
import { Link, useLoaderData, useOutletContext } from "react-router-dom"

type RestaurantListItemFetch = {
    id: number;
    name: string;
    logo: string | null;
    url: string;
  };
  
type ArrayResponseFetch = {
    count: number;
    next: string | null;
    previous: string | null;
    results: RestaurantListItemFetch[];
  };
  
  

const App = ()=>{
    
    const data = useLoaderData() as ArrayResponseFetch
    const search = useSearchBar()
    const filteredRestaurants = Search(data.results,search,'name')
    
    const getRestaurants = ()=>
    {
        var res = [
            {
                name:'McDonald\'s',
                type:'Fast food',
                img: 'https://scontent-bom1-2.xx.fbcdn.net/v/t1.6435-9/210158628_4402613093111913_4842840202788729308_n.jpg?_nc_cat=1&cb=99be929b-59f725be&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=srP1XtYsUz0AX8eOTeY&_nc_ht=scontent-bom1-2.xx&oh=00_AfAk0vMU-7dzPr26e-91kvXGOm3YkirY9yPdmE90CfFbWQ&oe=64CF6295',
            },
            {
                name:'KFC',
                type:'Fast food',
                img: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/KFC_logo.svg/340px-KFC_logo.svg.png',
            },
            {
                name:'Burger King',
                type:'Fast food',
                img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Burger_King_2020.svg/300px-Burger_King_2020.svg.png'
            },
            {
                name:'Pizza Hut',
                type:'Pizza',
                img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Pizza_Hut_classic_logo.svg/220px-Pizza_Hut_classic_logo.svg.png'
            },
            {
                name:'Dominos',
                type:'Pizza',
                img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Dominos_pizza_logo.svg/240px-Dominos_pizza_logo.svg.png'
            },
            {
                name:'Papa Johns',
                type:'Pizza',
                img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Papa_John%27s_Logo_2019.svg/400px-Papa_John%27s_Logo_2019.svg.png'
            },
            {
                name:'Subway',
                type:'Sandwiches',
                img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Subway_2016_logo.svg/440px-Subway_2016_logo.svg.png'
            },
            {
                name:'Jimmy Johns',
                type:'Sandwiches',
            }
        ]
        return res
    }

    return(
            <div className='col-md-6 col-12'>

            <div className="col-12">
                <h2>Explore</h2>
            </div>
            <SearchResultMessage />
            {
                filteredRestaurants.map((item)=>{
                    return <RestaurantListItem id={item.id} key={item.id} name={item.name} type={item.type} img={item.img} />
                })
            }
            
            </div>
    )
}


export const RestaurantListLoader = async ({request }: {request: Request}) =>{
    const data = await getData('api/restaurants',request.signal)
    return data.json()
}



export default App