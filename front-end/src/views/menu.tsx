import { MenuCartFooter, MenuFooter } from "../components/menu/menuFooter";
import { MenuHeader } from "../components/menu/menuFilterHeader";
import { MenuTitle } from "../components/menu/menuTitle";
import { MenuSection } from "../components/menu/menuSubSection";
import useSearchBar from "../hooks/useSearchBar"
import { useLoaderData, useParams, LoaderFunction } from "react-router-dom";
import { getData } from "../utilities/fetchData";
import Search from "../utilities/search";
import { SearchResultMessage } from "../components/header/search";
import APIRoutes, { makeURL } from "../utilities/APIRoutes";
import { RestaurantListItemFetch } from "./restaurantList";
import { MenuContextProvider } from "../context/MenuContext";
import { useEffect, useState } from "react";

export type MenuItemListFetch = {
    id: number;
    name: string;
    url: string;
    itemType: string;
    price: number;
    description: string;
    itemPhoto: string | null;
    hasCustomization: boolean;
    rating: number
    totalRatings: number
    dietaryType: string
    category: string
};

type RestaurantDetailsFetch1  = {
    id: number;
    name: string;
    phone: number;
    email: string;
    logo: string | null;
    restaurantType: string;
    menu: MenuItemListFetch[];

};

type RestaurantDetailsFetch = RestaurantDetailsFetch1 & RestaurantListItemFetch

const getSectionsFromMenu = (menu : MenuItemListFetch[])=>{
    const sections = new Set(menu.map((item)=>item.itemType))
    //filter out the items that are not in the section 
    const filteredMenu = [...sections].map((section)=>{
        return {
            name: section,
            items: menu.filter((item)=>item.itemType===section)
        }
    })
    return filteredMenu
}


const App = () =>{
    const search = useSearchBar()
    const data = useLoaderData() as RestaurantDetailsFetch
    const [filterSelections, setFilterSelections] = useState(new Set<string>())
    const [menuItems, setMenuItems] = useState<MenuItemListFetch[]>(data.menu)
    
    const MItoDisplay = getSectionsFromMenu(Search(menuItems,search,'name'))
    
    useEffect(()=>{

        const DTSet = new Set([...filterSelections].filter((item)=>item.split(',')[1]=='dt').map((item)=>item.split(',')[0]))
        const SISet = new Set([...filterSelections].filter((item)=>item.split(',')[1]=='si').map((item)=>item.split(',')[0]))

        console.log('Calllledddd', DTSet, SISet)
        if (filterSelections.size===0){
            setMenuItems(data.menu)
        }
        else if (SISet.size === 0){
            const fm = data.menu.filter((item)=>DTSet.has(item.dietaryType))
            setMenuItems(fm)
        }
        else if (DTSet.size ===0){
            const fm = data.menu.filter((item)=> SISet.has(item.category))
            setMenuItems(fm)
        }
        else{
            const fm = data.menu.filter((item)=> SISet.has(item.category) && DTSet.has(item.dietaryType) )
            setMenuItems(fm)
        }

    },[filterSelections])

    return(
    
        <div className='col-md-5 col-12'>
            <MenuTitle name={data.name} type={data.restaurantType.split(',')} stars={data.rating} numRatings={data.totalRatings} />
            <MenuHeader  selections={filterSelections} setSelections={setFilterSelections} />

            <SearchResultMessage /> 
            <MenuContextProvider value={{ restaurantAcceptingOrders: data.acceptingOrders, restaurantID: data.id}}>
                {MItoDisplay.map((section)=>(<MenuSection name={section.name} items={section.items} key={section.name} />))}
            </MenuContextProvider>
            <MenuFooter sections={getSectionsFromMenu(data.menu).map((item)=>item.name)} />
            <MenuCartFooter />

        </div>
    )
}


export const MenuListLoader  : LoaderFunction = async ({params, request})=>{
    let id = params.restaurantID as string
    const data = await getData(makeURL(APIRoutes.RESTAURANT_DETAILS, {"pk" : id}), request.signal)
    return data.json()
}

export default App;