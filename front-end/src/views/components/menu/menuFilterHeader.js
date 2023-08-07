import { useState,useEffect } from "react";
import { OutlinedCheck} from "../forms/inputs";
import { useScrollDirection } from "../../../hooks";

export const MenuHeader = () => {

    const show = useScrollDirection() === 'up' ? true : false

    return(
        <div class={`container d-flex flex-row overflow-auto sticky-top shadow card p-2 m-0 my-5 menu-header-${show?'show':'hide'}`}>
            
                    
            <OutlinedCheck name='Veg'  buttonClass='btn-outline-success rounded-pill btn-badge' />
            <OutlinedCheck name='NonVeg' buttonClass='btn-outline-danger rounded-pill btn-badge' />
            <OutlinedCheck name='Egg' buttonClass='btn-outline-warning rounded-pill btn-badge' />
            <OutlinedCheck name='Bestsellers' buttonClass='btn-outline-dark rounded-pill btn-badge' />
            <OutlinedCheck name='Popular' buttonClass='btn-outline-primary rounded-pill btn-badge' />
            
        
        </div>
    )
}