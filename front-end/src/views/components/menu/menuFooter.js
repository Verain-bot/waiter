import { useContext, useEffect, useState } from "react"
import { useScrollDirection } from "../../../hooks"
import { MenuModal } from "./menuModal"
import { CartContext } from "../../../App"
import { Link } from "react-router-dom"

export const MenuCartFooter = () => {

    const [cart, setCart] = useContext(CartContext)
    
    const getQty = ()=>{
        let q = 0
        cart.forEach(item=>{
            item.customizations.forEach(customization=>{
                q += customization.quantity
            })
        })
        return q
    }

    const qty = getQty()
    
    return(
        <Link to={'/cart'}>
            <div class={`card p-2 rounded fixed-bottom mx-auto my-0 bg-danger col-12 menu-cart-footer text-white ${qty===0?'hidden':''}`}>
                <div class='container'>
                    <div class='row menu-footer-row'>
                        <div class='col-12 text-center'>
                        <i class='bi bi-cart'></i>
                            <b> View Cart </b>({qty})
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export const MenuFooter = (props) =>{

    const scroll = useScrollDirection()

    return(
        <>
        <MenuModal id='MenuModal' sections={props.sections} />
        <div class={`fixed-bottom ${scroll==='up'?'menu-footer-show':'menu-footer-hide'}`} data-bs-toggle="modal" data-bs-target="#MenuModal">
            <div class='container d-flex align-items-center justify-content-center'>
                <div class='col-3 bg-dark text-white rounded p-2 text-center pointer'>
                    <i class='bi bi-card-list'></i>
                    <span> Menu</span>
                </div>
            </div>
        </div>
        </>
    )
}