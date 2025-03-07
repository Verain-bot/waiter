import React, { memo, useEffect, useState } from "react"
import { Stars } from "./stars"
import { MenuCustomizationModal } from "./menuCustomizationModal"
import { MenuItemListFetch } from "../../views/menu"
import { AddOrUpdateAction, useCartContext } from "../../context/CartContext"
import { CartActions, CustomizationsType } from "../../context/CartContext"
import { getCartItemQuantity as getCartQuantity } from "../../utilities/getCartQuantity"
import { useMenuContext } from "../../context/MenuContext"
import MenuDescription from './menuItemDescription'
import { ErrorBoundary } from "react-error-boundary"
import MenuCustModalError from "../error/MenuCustModalError"
import { useMenuCustModalContext } from "../../context/MenuModalContext"
import MenuItemImage from "./menuItemImage"

export const MenuItem : React.FC<MenuItemListFetch> = memo((props) => {
    const RestaurantDetails = useMenuContext()
    const [cart, dispatch] = useCartContext()
    const [customizations, setCustomizations] = useState<CustomizationsType[]>([])
    const [custModal, setCustModal] = useMenuCustModalContext()
    const quantity = getCartQuantity(customizations)
    

    const openCustModal = ()=>{
        setCustModal({
            show: true,
            menuItemID: props.id,
            currentCustomizations: customizations,
            setCurrentCustomizations: AddOrUpdate
        })
    
    }

    useEffect(()=>{        
        
        const cartCopy = [...cart]
        const i = cartCopy.findIndex((cartItem)=>{return cartItem.menuItemID===props.id})

        if (i!==-1 && JSON.stringify(customizations)!==JSON.stringify(cartCopy[i].customizations)){
            setCustomizations(structuredClone(cartCopy[i].customizations))
        }
        if(i==-1 && customizations.length>0)
            setCustomizations([])

    })

    const AddOrUpdate = (customizations: CustomizationsType[]) => {
        const newObj: AddOrUpdateAction = {
          type: CartActions.ADD_OR_UPDATE,
          menuItemID: props.id,
          menuItemName: props.name,
          menuItemPrice: props.price,
          restaurantID: RestaurantDetails.restaurantID,
          customizations: structuredClone(customizations),
        };
      
        dispatch(newObj);
      };
      

    const decreaseQuantity = ()=>{
        dispatch({
            type: CartActions.DECREASE_QUANTITY,
            menuItemID: props.id
        })
    }

    const increaseQuantity = ()=>{
        dispatch({
            type: CartActions.INCREASE_QUANTITY,
            menuItemID: props.id,
            menuItemName: props.name,
            menuItemPrice: props.price,
            restaurantID: RestaurantDetails.restaurantID,
        })
    }



    


    return(
<>
    <div className="row my-0 d-flex align-items-center justify-content-center">
        <div className="col-12 mx-0 p-0 menu-item">

            <div className="row d-flex align-items-center justify-content-center">
                <div className="col-4 mx-auto">
                    <MenuItemImage src={String(props.itemPhoto)} />
                </div>
                
                <div className="col-8 mx-0 mt px-0">
                    <div className='row'>
                        <div className='col-7 pb-2'>
                            <div className='row'>
                                
                                <h1 className='card-title py-0 m-0 medium' >
                                    <i className={`bi bi-dash-square-fill text-${props.dietaryType=="VEG"?'success':props.dietaryType=='NON_VEG'?'danger':'warning'}`} style={{marginRight: 4}} />
                                    {props.name}
                                </h1>
                                <span className='text-muted small'>
                                    Rs. {props.price}
                                    <span className="badge bg-danger-subtle border border-danger-subtle text-danger-emphasis rounded-pill mx-2">{props.category}</span>
                                </span>
                                
                                <span className='small pb-1'>
                                <Stars stars={props.rating} numRatings={props.totalRatings} />
                                
                                </span>

                            </div>

                            <MenuDescription desc={props.description} />
                        </div>

                        <div className='col-4 d-flex flex-column align-items-center justify-content-center' >
                            
                            {RestaurantDetails.restaurantAcceptingOrders? <>
                            <div className='row'>                                

                                {props.hasCustomization && quantity===0 && <i className='bi bi-cart-plus add-to-cart-btn'  onClick={openCustModal}></i>}
                                {!props.hasCustomization && quantity===0 && <i className='bi bi-cart-plus add-to-cart-btn' onClick={increaseQuantity}></i>}

                                {props.hasCustomization && quantity>0&&<QuantityModifier increase={openCustModal} decrease={decreaseQuantity} value={quantity} />}
                                {!props.hasCustomization && quantity>0&&<QuantityModifier increase={increaseQuantity} decrease={decreaseQuantity} value={quantity} />}
                            </div>
                            {props.hasCustomization&&<div className='row'>
                            <span className='small text-secondary'>Customizable+</span>
                            </div>}
                            </>:
                            <span className="small text-secondary text-center">
                                Restaurant is not accepting orders
                            </span>

                        }
                        </div>
                    </div>

                </div>
            </div>
        {/* <ErrorBoundary fallbackRender={MenuCustModalError}>
            <>
                {props.hasCustomization&&
                <MenuCustomizationModal 
                id={`${modalId}`} 
                menuItemID = {props.id} 
                customizations={customizations}
                addOrUpdate = {AddOrUpdate}
                />}
            </>
        </ErrorBoundary> */}
            <hr className='mx-auto'/>
        </div>

    </div>
    </>
    )
})

type QuantityModifierProps = {
    increase?: ()=>void;
    decrease?: ()=>void;
    changeQuantity?: (quantity: number)=>void;
    value: number;
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

            <button className='btn btn-outline-secondary btn-sm' onClick={increase} >
                <i className='bi bi-plus'></i>
            </button>
        </div>
    )
}