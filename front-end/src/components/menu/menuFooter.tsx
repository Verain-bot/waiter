import { useContext, useEffect, useState } from "react"
import useScrollDirection from "../../hooks/useScrollDirection"
import { MenuModal } from "./menuModal"

import { Link } from "react-router-dom"
import { useCartContext } from "../../context/CartContext"
import { getCartQuantity } from "../../utilities/getCartQuantity"

export const MenuCartFooter = () => {

    const [cart, dispatch] = useCartContext()

    const qty = getCartQuantity(cart)
    
    return(
        <Link to={'/cart'}>
            <div className={`card p-2 rounded fixed-bottom mx-auto my-0 bg-danger col-12 menu-cart-footer text-white ${qty===0?'hidden':''}`}>
                <div className='container'>
                    <div className='row menu-footer-row'>
                        <div className='col-12 text-center'>
                        <i className='bi bi-cart'></i>
                            <b> View Cart </b>({qty})
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

type MenuFooterProps = {
    sections: string[],
}


export const MenuFooter = (props : MenuFooterProps) =>{

    const scroll = useScrollDirection()

    return(
        <>
        <MenuModal id='MenuModal' sections={props.sections} />
        <div className={`fixed-bottom ${scroll==='up'?'menu-footer-show':'menu-footer-hide'}`} data-bs-toggle="modal" data-bs-target="#MenuModal">
            <div className='container d-flex align-items-center justify-content-center'>
                <div className='col-3 bg-dark text-white rounded p-2 text-center pointer'>
                    <i className='bi bi-card-list'></i>
                    <span> Menu</span>
                </div>
            </div>
        </div>
        </>
    )
}