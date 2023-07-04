import {SearchBar,ToggleSearchBar} from './search'
import { AccountDropDown } from './accountDropDown';
import { SideBar, ToggleSideBar } from './sidebar';
import { useRef } from 'react';

export const Header = (props) =>{
    const searchBar = useRef()

    return(
        <>
        <header id="header" class="header fixed-top d-flex align-items-center">

            <ToggleSideBar />
            <SearchBar cref={searchBar} />
            <nav class="header-nav ms-auto">
                <ul class="d-flex align-items-center">

                    <ToggleSearchBar cref={searchBar} />
                    <AccountDropDown />

                </ul>
            </nav>

        </header>
        <SideBar />
        </>
    )
}