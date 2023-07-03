import React, { useRef } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../styles.sass'
import {SearchBar,ToggleSearchBar} from './components/header/search'
import { AccountDropDown } from './components/header/accountDropDown';
const App = () => {

    const searchBar = useRef()

    return (
        <header id="header" class="header fixed-top d-flex align-items-center">


            <div class="d-flex align-items-center justify-content-between">
                <a href="index.html" class="logo d-flex align-items-center">
                    <img src="assets/img/logo.png" alt="" />
                    <span class="d-none d-lg-block">NiceAdmin</span>
                </a>
                <i class="bi bi-list toggle-sidebar-btn"></i>
            </div>

            <SearchBar cref={searchBar} />
            <nav class="header-nav ms-auto">
                <ul class="d-flex align-items-center">


                    <ToggleSearchBar cref={searchBar} />
                    <AccountDropDown />

                    
                </ul>
            </nav>

        </header>


        


    );
    }

export default App;