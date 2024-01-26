import { MenuCartFooter, MenuFooter } from "../components/menu/menuFooter";
import { MenuHeader } from "../components/menu/menuFilterHeader";
import { MenuTitle } from "../components/menu/menuTitle";
import { MenuSection } from "../components/menu/menuSubSection";
import useSearchBar from "../hooks/useSearchBar"
import { useLoaderData, LoaderFunction, useNavigate, useNavigation, defer } from "react-router-dom";
import { getData } from "../utilities/fetchData";
import Search from "../utilities/search";
import { SearchResultMessage } from "../components/header/search";
import APIRoutes, { makeURL } from "../utilities/APIRoutes";
import { RestaurantListItemFetch } from "./restaurantList";
import { MenuContextProvider } from "../context/MenuContext";
import { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorComp from "../components/error/ErrorComp";
import { PATHS } from "../utilities/routeList";
import { MenuCustModalContextProvider } from "../context/MenuModalContext";
import LoaderWrapper from "../components/loader/LoaderWrapper";

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


const App = ({data} : {data: RestaurantDetailsFetch}) =>{
    const search = useSearchBar()
    
    const [filterSelections, setFilterSelections] = useState(new Set<string>())
    const [menuItems, setMenuItems] = useState<MenuItemListFetch[]>(data.menu)
    
    const MItoDisplay = getSectionsFromMenu(Search(menuItems,search,'name'))
    const navigate = useNavigate()
    
    useEffect(()=>{

        const DTSet = new Set([...filterSelections].filter((item)=>item.split(',')[1]=='dt').map((item)=>item.split(',')[0]))
        const SISet = new Set([...filterSelections].filter((item)=>item.split(',')[1]=='si').map((item)=>item.split(',')[0]))

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
    
        <div className='col-md-7 col-12 p-0 loading-content'>
            <ErrorBoundary fallbackRender={ErrorComp} onReset={()=>navigate(PATHS.RESTAURANT_LIST)}>

                <MenuTitle name={data.name} type={data.restaurantType.split(',')} stars={data.rating} numRatings={data.totalRatings} phone={data.phone} />
                {data.menu.length>0&&<MenuHeader  selections={filterSelections} setSelections={setFilterSelections} />}
                <SearchResultMessage /> 

                {data.menu.length===0&&<div className="col-12 mt-5">
                    <h2>
                        <strong>
                            Not found.
                        </strong>
                    </h2>
                    <span>
                        Unable to find menu items. Please try again later.
                    </span>
                </div>}

                <MenuCustModalContextProvider>

                {data.menu.length>0&&<MenuContextProvider value={{ restaurantAcceptingOrders: data.acceptingOrders, restaurantID: data.id}}>
                    {MItoDisplay.map((section)=>(<MenuSection name={section.name} items={section.items} key={section.name} />))}
                </MenuContextProvider>}
                </MenuCustModalContextProvider>
                {data.menu.length>0&&<MenuFooter sections={getSectionsFromMenu(data.menu).map((item)=>item.name)} />}
                <MenuCartFooter />
            </ErrorBoundary>

        </div>
    )
}


export const MenuListLoader  : LoaderFunction = async ({params, request})=>{
    const id = params.restaurantID as string
    const data = getData(makeURL(APIRoutes.RESTAURANT_DETAILS, {"pk" : id}), request.signal).then((data)=>data.json())
    return defer({data: data})
}

const Main = ()=>LoaderWrapper(App)
export default Main