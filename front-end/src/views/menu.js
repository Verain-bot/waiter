import { useState } from "react";
import { MenuCartFooter, MenuFooter } from "./components/menu/menuFooter";
import { MenuHeader } from "./components/menu/menuFilterHeader";
import { MenuTitle } from "./components/menu/menuTitle";
import { MenuSection } from "./components/menu/menuSubSection";
import { useSearchBar } from "../hooks";
import { useLoaderData, useParams } from "react-router-dom";
import { Search, getData } from "../helper";
import { SearchResultMessage } from "./components/header/search";

const getSectionsFromMenu = (menu)=>{
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
    const data = useLoaderData()

    return(
    
        <div class='col-md-6 col-12'>
            <MenuTitle name={data.name} type={data.restaurantType.split(',')} />
            <MenuHeader />
            <SearchResultMessage /> 
            {getSectionsFromMenu(Search(data.menu,search,'name')).map((section)=>(<MenuSection name={section.name} items={section.items} />))}

            <MenuFooter sections={getSectionsFromMenu(data.menu).map((item)=>item.name)} />
            <MenuCartFooter />

        </div>
    )
}


export const MenuListLoader = async ({params})=>{
    const data = await getData(`api/restaurants/details/${params.restaurantID}`)
    return data.json()
}

export default App;