import {SearchBar,ToggleSearchBar} from './search'
import { AccountDropDown } from './accountDropDown';
import { SideBar, ToggleSideBar } from './sidebar';
import { useRef, useContext, useEffect } from 'react';
import { SearchBarContext } from '../../../App';


export const Header = (props) =>{
    const searchBar = useRef()
    const [searchBarState, setSearchBarState] = useContext(SearchBarContext)    

    return(
        <>
        <header id="header" class="header fixed-top d-flex align-items-center">

            <ToggleSideBar />
            {searchBarState&&<SearchBar cref={searchBar} />}
            <nav class="header-nav ms-auto">
                <ul class="d-flex align-items-center">

                    {searchBarState&&<ToggleSearchBar cref={searchBar} />}
                    <AccountDropDown />

                </ul>
            </nav>

        </header>
        <SideBar />
        </>
    )
}