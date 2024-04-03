import React, { useRef, useState} from 'react';
import { SearchBar, ToggleSearchBar } from './search';
import { AccountDropDown } from './accountDropDown';
import { SideBar, ToggleSideBar } from './sidebar';
import { useSearchBarContext } from '../../context/SearchBarContext';
import CartHeader from './cartHeaderButton'
import ReloadHeaderBtn from './ReloadHeaderBtn';

type HeaderProps = {};

export const Header: React.FC<HeaderProps> = (props) => {
    const [searchBarVisible, setSearchBarVisible] = useState(false)

    const searchBarState = useSearchBarContext()[0]
    
    return (
        <>
            <header id="header" className="header fixed-top d-flex align-items-center">
                <ToggleSideBar />
                {searchBarState && <SearchBar visible={searchBarVisible} setVisible={setSearchBarVisible} />}
                <nav className="header-nav ms-auto">
                    <ul className="d-flex align-items-center">
                        {searchBarState && <ToggleSearchBar visible={searchBarVisible} setVisible={setSearchBarVisible} />}
                        <ReloadHeaderBtn />
                        <CartHeader />
                        <AccountDropDown />
                    </ul>
                </nav>
            </header>
            <SideBar />
        </>
    );
};

type ErrHeaderProps = {};

export const ErrHeader: React.FC<ErrHeaderProps> = (props) => {
    return (
        <>
            <header id="header" className="header fixed-top d-flex align-items-center">
                <ToggleSideBar />
            </header>
            <SideBar />
        </>
    );
};
