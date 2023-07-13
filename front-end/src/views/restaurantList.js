import { useEffect, useState } from "react"
import { SearchResultMessage } from "./components/header/search"
import { RestaurantListItem } from "./components/restaurantList/restaurantListItem"
import { Search } from "../helper"
import { useSearchBar } from "../hooks"
const App = ()=>{

    const [restaurants,setRestaurants] = useState([])
    const search = useSearchBar()
    
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

        setRestaurants(res)
    }

    useEffect(()=>{
        if (restaurants.length===0)
            getRestaurants()
    },[search])

    return(
        <>
        
            <div class='col-md-6 col-12'>

            <div class="col-12">
                <h2>Explore</h2>
            </div>
            <SearchResultMessage />
            {
                Search(restaurants,search,'name').map((item)=>{
                    return <RestaurantListItem name={item.name} type={item.type} img={item.img} />
                })
            }
            
            </div>
        </>
    )
}




export default App