import { useState,useEffect } from "react";
import { OutlinedCheck} from "../forms/inputs";
import { useScrollDirection } from "../../../hooks";

export const MenuHeader = () => {

    const show = useScrollDirection() === 'up' ? true : false

    return(
        <div class={`container d-flex flex-row overflow-auto sticky-top shadow card p-2 m-0 my-5 menu-header-${show?'show':'hide'}`}>
            
                    
            <OutlinedCheck name='Veg'  buttonClass='btn-outline-success' />
            <OutlinedCheck name='NonVeg' buttonClass='btn-outline-danger' />
            <OutlinedCheck name='Egg' buttonClass='btn-outline-warning' />
            <OutlinedCheck name='Bestsellers' buttonClass='btn-outline-dark' />
            <OutlinedCheck name='Popular' buttonClass='btn-outline-primary' />
            
        
        </div>
    )
}