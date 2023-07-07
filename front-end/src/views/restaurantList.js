import { useContext, useEffect, useState } from "react"
import { Header } from "./components/header/header"
import { Stars } from "./components/menu/stars"
import { SearchContext } from "../App"
import { SearchResultMessage } from "./components/header/search"
import { RestaurantListItem } from "./components/restaurantList/restaurantListItem"
import { makeRegex } from "../helper"
const App = ()=>{

    const [restaurants,setRestaurants] = useState([])
    const [search,setSearch] = useContext(SearchContext)

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

    const getFilteredRestaurants = ()=>{
        var result1 = restaurants.filter((item)=> makeRegex(item.name).includes(makeRegex(search)))

        var remaining = restaurants.filter((item)=> !makeRegex(item.name).includes(makeRegex(search)))

        var result2 = remaining.filter((item)=>{
            var itemWords = item.name.split(' ')
            var searchWords = search.split(' ')
            if (itemWords.length === searchWords.length)
            {
                for (var i=0;i<itemWords.length;i++)
                {
                    if (!makeRegex(itemWords[i]).startsWith(makeRegex(searchWords[i])))
                        return false
                }
                return true
            }
            return false

        })
        

        return  result1.concat(result2)
    }

    useEffect(()=>{
        if (restaurants.length===0)
            getRestaurants()
        
    },[search])

    return(
        <>
        <Header /> 
        <main id="main" class="main">
            
            <h2>Explore</h2>
            <SearchResultMessage />
            <div class="container p-0">
            {
                getFilteredRestaurants().map((item)=>{
                    return <RestaurantListItem name={item.name} type={item.type} img={item.img} />
                })
            }
            
            </div>
        </main>
        </>
    )
}




export default App