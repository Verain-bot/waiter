import { MenuCartFooter, MenuFooter } from "../components/menu/menuFooter";
import { MenuHeader } from "../components/menu/menuFilterHeader";
import { MenuTitle } from "../components/menu/menuTitle";
import { MenuSection } from "../components/menu/menuSubSection";
import useSearchBar from "../hooks/useSearchBar"
import { useLoaderData, useParams, LoaderFunction } from "react-router-dom";
import { getData } from "../utilities/fetchData";
import Search from "../utilities/search";
import { SearchResultMessage } from "../components/header/search";

export type MenuItemListFetch = {
    id: number;
    name: string;
    url: string;
    itemType: string;
    price: number;
    description: string;
    itemPhoto: string | null;
    hasCustomization: boolean;
};

type RestaurantDetailsFetch = {
    id: number;
    name: string;
    phone: number;
    email: string;
    logo: string | null;
    restaurantType: string;
    menu: MenuItemListFetch[];
};


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
    
    const menuItems = getSectionsFromMenu(Search(data.menu,search,'name'))
    
    return(
    
        <div className='col-md-6 col-12'>
            <MenuTitle name={data.name} type={data.restaurantType.split(',')} />
            <MenuHeader />
            <SearchResultMessage /> 
            {menuItems.map((section)=>(<MenuSection name={section.name} items={section.items} restaurantID={data.id} key={section.name} />))}

            <MenuFooter sections={getSectionsFromMenu(data.menu).map((item)=>item.name)} />
            <MenuCartFooter />

        </div>
    )
}


export const MenuListLoader  : LoaderFunction = async ({params, request})=>{
    const data = await getData(`api/restaurants/details/${params.restaurantID}`, request.signal)
    return data.json()
}

export default App;