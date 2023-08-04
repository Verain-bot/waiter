import { memo, useEffect, useState } from "react"
import { Stars } from "./stars"
import { MenuCustomizationModal } from "./menuCustomizationModal"
import { useStorage } from "../../../hooks"

export const MenuItem = (props) => {
    const modalId = `menu-itemcutomizationModal-${props.id}`
    const [quantity, setQuantity] = useState(0)
    const [cart, setCart] = useStorage('cart')
    const [customizations, setCustomizations] = useState([])

    const getQuantity = ()=>{
        //sum of all customizations
        let qty = 0
        if (customizations.length===0)
            return qty
        customizations.forEach((customization)=>{
            qty+=customization.quantity
        }
        )
        return qty
    }

    useEffect(()=>{        
        console.log(customizations, 'selected customizations')
        let q = getQuantity()
        if (q!==quantity)
        {
            setQuantity(q)
        }
    })

    const decreaseQuantity = ()=>{
        //decrease quantity of last customization
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
        //create new customization with quantity 1 and add to customizations
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
    <div class="row my-0 d-flex align-items-center justify-content-center">
        <div class="col-12 col-md-9 col-xl-8 mx-0 p-0 menu-item">

            <div class="row d-flex align-items-center justify-content-center">
                <div class="col-4 mx-auto">
                    <img class='rounded img-thumbnail shadow-sm border-0' src={props.itemPhoto} />
                </div>
                <div class="col-8 mx-0 mt-2 px-0">
                    <div class='row'>
                        <div class='col-7 pb-2'>
                            <div class='row'>
                                
                                <h1 class='card-title py-0 m-0 medium' ><i class='bi bi-dash-square-fill text-success' /> {props.name}</h1>
                                <span class='text-muted small'>Rs. {props.price}</span>
                                
                                <span class='small pb-1'>
                                <Stars stars={3.4} numRatings={21} />
                                </span>
                                

                            </div>

                            <div class='row'>
                                <span class='card-text text-secondary small'>{props.description}</span>
                            </div>
                        </div>

                        <div class='col-4 d-flex flex-column align-items-center justify-content-center'>
                            
                            <div class='row'>
                                {props.hasCustomization && quantity===0 && <i class='bi bi-cart-plus add-to-cart-btn'  data-bs-toggle="modal" data-bs-target={`#${modalId}`}></i>}
                                {!props.hasCustomization && quantity===0 && <i class='bi bi-cart-plus add-to-cart-btn' onClick={increaseQuantity}></i>}

                                {props.hasCustomization && quantity>0&&<QuantityModifier useModal={true} modalId={`#${modalId}`} decrease={decreaseQuantity} value={quantity} />}
                                {!props.hasCustomization && quantity>0&&<QuantityModifier increase={increaseQuantity} decrease={decreaseQuantity} useModal={false} value={quantity} />}
                            </div>

                            {props.hasCustomization&&<div class='row'>
                                <span class='small text-secondary'>Customizable+</span>
                            </div>}
                        </div>
                    </div>

                </div>
            </div>
            <hr class='mx-auto'/>
        </div>

    </div>
        {props.hasCustomization&&
        <MenuCustomizationModal 
            id={`${modalId}`} 
            menuItemID = {props.id} 
            customizations={customizations}
            setCustomizations = {setCustomizations} 
            useLast = {false}
        />}
    </>
    )
}

export const QuantityModifier = (props) => {
    const increase = () => {
        if(props.value<10)
        {

            if(props.increase)
               props.increase()
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
        <div class='input-group d-flex'>
            <button class='btn btn-outline-secondary btn-sm' onClick={decrease}>
                <i class='bi bi-dash'></i>
            </button>
            <input type='number' class='form-control cart-input' value={props.value} />
            {props.useModal&&<button class='btn btn-outline-secondary btn-sm' onClick={increase} data-bs-toggle="modal" data-bs-target={props.modalId}>
                <i class='bi bi-plus'></i>
            </button>}

            {!props.useModal&&<button class='btn btn-outline-secondary btn-sm' onClick={increase} >
                <i class='bi bi-plus'></i>
            </button>}
        </div>
    )
}