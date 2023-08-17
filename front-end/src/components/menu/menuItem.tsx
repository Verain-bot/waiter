import React, { memo, useEffect, useState, useContext } from "react"
import { Stars } from "./stars"
import { MenuCustomizationModal } from "./menuCustomizationModal"

import { MenuItemListFetch } from "../../views/menu"
import { useCartContext } from "../../context/CartContext"
import { CartActions, CustomizationsType } from "../../context/CartContext"
import { getCartItemQuantity as getCartQuantity } from "../../utilities/getCartQuantity"

export type MenuItemProps = MenuItemListFetch & {
    restaurantID: number;
}

export const MenuItem : React.FC<MenuItemProps> = (props) => {
    const modalId = `menu-itemcutomizationModal-${props.id}`
    const [cart, dispatch] = useCartContext()
    const [customizations, setCustomizations] = useState<CustomizationsType[]>([])
    const [firstLoad, setFirstLoad] = useState(true)
    
    const quantity = getCartQuantity(customizations)

    useEffect(()=>{        
        console.log(cart, 'as')

        if (firstLoad)
            setFirstLoad(false)

        let cartCopy = [...cart]
        let i = cartCopy.findIndex((cartItem)=>{return cartItem.menuItemID===props.id})
        if (i!==-1 && firstLoad){
            setCustomizations(structuredClone(cartCopy[i].customizations))
        }

        const newObj = {
            type: CartActions.ADD_OR_UPDATE,
            menuItemID: props.id,
            menuItemName: props.name,
            menuItemPrice: props.price,
            restaurantID: props.restaurantID,
            customizations: structuredClone(customizations),
        }

        if (i!==-1 ){
            
            
            if (JSON.stringify(cartCopy[i].customizations)!==JSON.stringify(customizations) && quantity>0)
            {   
                dispatch(newObj)
            }
            else if (quantity===0)
            {
                dispatch({
                    type: CartActions.DECREASE_QUANTITY,
                    menuItemID: props.id,
                })
            }
        }
        else if (quantity>0)
        {
            dispatch(newObj)
        }
        

    })

    const decreaseQuantity = ()=>{
        let customizationsCopy = [...customizations]
        let last = customizationsCopy[customizationsCopy.length-1]
        if (last.quantity>1)
        {
            last.quantity--
        }
        else{
            customizationsCopy.pop()
        }
        setCustomizations(customizationsCopy)
    }

    const increaseQuantity = ()=>{
        
        if(customizations.length===0)
        {
            setCustomizations([{
                quantity: 1,
                customizations: [],
            }])
        }
        else{
            let customizationsCopy = [...customizations]
            customizationsCopy[customizationsCopy.length-1].quantity++
            setCustomizations(customizationsCopy)
        }

    }


    return(
<>
    <div className="row my-0 d-flex align-items-center justify-content-center">
        <div className="col-12 col-md-9 col-xl-8 mx-0 p-0 menu-item">

            <div className="row d-flex align-items-center justify-content-center">
                <div className="col-4 mx-auto">
                    <img className='rounded img-thumbnail shadow-sm border-0' src={String(props.itemPhoto)} />
                </div>
                <div className="col-8 mx-0 mt-2 px-0">
                    <div className='row'>
                        <div className='col-7 pb-2'>
                            <div className='row'>
                                
                                <h1 className='card-title py-0 m-0 medium' ><i className='bi bi-dash-square-fill text-success' /> {props.name}</h1>
                                <span className='text-muted small'>Rs. {props.price}</span>
                                
                                <span className='small pb-1'>
                                <Stars stars={3.4} numRatings={21} />
                                </span>
                                

                            </div>

                            <div className='row'>
                                <span className='card-text text-secondary small'>{props.description}</span>
                            </div>
                        </div>

                        <div className='col-4 d-flex flex-column align-items-center justify-content-center'>
                            
                            <div className='row'>
                                {props.hasCustomization && quantity===0 && <i className='bi bi-cart-plus add-to-cart-btn'  data-bs-toggle="modal" data-bs-target={`#${modalId}`}></i>}
                                {!props.hasCustomization && quantity===0 && <i className='bi bi-cart-plus add-to-cart-btn' onClick={increaseQuantity}></i>}

                                {props.hasCustomization && quantity>0&&<QuantityModifier useModal={true} modalId={`#${modalId}`} decrease={decreaseQuantity} value={quantity} />}
                                {!props.hasCustomization && quantity>0&&<QuantityModifier increase={increaseQuantity} decrease={decreaseQuantity} useModal={false} value={quantity} />}
                            </div>

                            {props.hasCustomization&&<div className='row'>
                                <span className='small text-secondary'>Customizable+</span>
                            </div>}
                        </div>
                    </div>

                </div>
            </div>
            <hr className='mx-auto'/>
        </div>

    </div>
        {props.hasCustomization&&
        <MenuCustomizationModal 
            id={`${modalId}`} 
            menuItemID = {props.id} 
            customizations={customizations}
            setCustomizations = {setCustomizations}
        />}
    </>
    )
}

type QuantityModifierProps = {
    increase?: ()=>void;
    decrease?: ()=>void;
    changeQuantity?: (quantity: number)=>void;
    value: number;
    useModal?: boolean;
    modalId?: string;

}

export const QuantityModifier : React.FC<QuantityModifierProps> = (props) => {
    const increase = () => {
        if(props.value<10)
        {

            if(props.increase){
                props.increase()
            }
               
            else
                if(props.changeQuantity)
                    props.changeQuantity(props.value+1)
        }
    }

    const decrease = () => {


        if (props.value>0)
        {
            if(props.decrease)
                props.decrease()
            else
                if (props.changeQuantity)
                    props.changeQuantity(props.value-1)
        }
    }

    return(
        <div className='input-group d-flex'>
            <button className='btn btn-outline-secondary btn-sm' onClick={decrease}>
                <i className='bi bi-dash'></i>
            </button>
            <input type='number' className='form-control cart-input' value={props.value} readOnly />
            {props.useModal&&<button className='btn btn-outline-secondary btn-sm' onClick={increase} data-bs-toggle="modal" data-bs-target={props.modalId}>
                <i className='bi bi-plus'></i>
            </button>}

            {!props.useModal&&<button className='btn btn-outline-secondary btn-sm' onClick={increase} >
                <i className='bi bi-plus'></i>
            </button>}
        </div>
    )
}