import { useContext, useEffect, useState } from "react"
import useScrollDirection from "../../hooks/useScrollDirection"
import { MenuModal } from "./menuModal"
import { CartActions } from "../../context/CartContext"
import { Link } from "react-router-dom"
import { useCartContext } from "../../context/CartContext"
import { getCartQuantity } from "../../utilities/getCartQuantity"
import { PATHS } from "../../utilities/routeList"

export const MenuCartFooter = () => {

    const [cart, dispatch] = useCartContext()

    const qty = getCartQuantity(cart)
    
    const clearCart = ()=>{
        dispatch({
            type: CartActions.CLEAR
        })
    }

    return(
        
            <div className={`card p-2 rounded fixed-bottom mx-auto my-0 bg-danger col-12 menu-cart-footer text-white ${qty === 0 ? 'hidden' : ''}`}>
            <div className='container'>
                <div className='row menu-footer-row'>
                <div className='col-12 d-flex justify-content-center align-items-center'>
                    <div className="me-auto" >
                        <i className='bi bi-x-circle' style={{ fontSize: '20px', fontWeight: 'bolder' }} onClick={clearCart}></i>
                    </div>
                    <Link to={PATHS.CART}>

                    <div className="text-center text-white" >
                        <i className='bi bi-cart'></i>
                        <b> View Cart </b>({qty})
                    </div>
                    </Link>
                    <div className="ms-auto">
                    
                    </div>
                </div>
                </div>
            </div>
            </div>

        
    )
}

type MenuFooterProps = {
    sections: string[],
}


export const MenuFooter = (props : MenuFooterProps) =>{

    const scroll = useScrollDirection()
    const [show,setShow] = useState(false)

    const handleClick = ()=>{
        setShow(true)
    }

    return(
        <>
        <MenuModal sections={props.sections} show={show} setShow={setShow} />
        <div className={`fixed-bottom d-md-none ${scroll==='up'?'menu-footer-show':'menu-footer-hide'}`} onClick={handleClick}>
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