import { useEffect, useState } from "react"
import { Stars } from "./stars"
import { MenuCustomizationModal } from "./menuCustomizationModal"
import { useStorage } from "../../../hooks"

export const MenuItem = (props) => {

    const [quantity, setQuantity] = useState(0)
    const [cart, setCart] = useStorage('cart')
    const [cartItem, setCartItem] = useState(null)
    const [customizations, setCustomizations] = useState([])


    const increaseQuantity = () => {
        setQuantity(quantity+1)
    }

    useEffect(()=>{
        //find the item in the cart
        console.log('cart',cart)
        if (cart!==null){
            const item = cart.find((item)=>item.id===props.id)
            if (!item && quantity>0){
                const newItem = {
                    'id': props.id,
                    'name': props.name,
                    'customizations': [{quantity:quantity, price:props.price}],
                }

                setCart([...cart, newItem])
                console.log('added new item',cart)
            }

        }
        
        
    },[quantity])


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
                                {props.hasCustomization && quantity===0 && <i class='bi bi-cart-plus add-to-cart-btn' onClick={increaseQuantity} data-bs-toggle="modal" data-bs-target={`#MenuItemModal${props.name.replace(' ','')}`}></i>}
                                {!props.hasCustomization && quantity===0 && <i class='bi bi-cart-plus add-to-cart-btn' onClick={increaseQuantity}></i>}

                                {props.hasCustomization && quantity>0&&<QuantityModifier changeQuantity={setQuantity} useModal={true} modalId={`#MenuItemModal${props.name.replace(' ','')}`} value={quantity} />}
                                {!props.hasCustomization && quantity>0&&<QuantityModifier changeQuantity={setQuantity} useModal={false} value={quantity} />}
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

        {props.hasCustomization&&<MenuCustomizationModal id={`MenuItemModal${props.name.replace(' ','')}`} quantity={quantity}  changeQuantity={setQuantity} menuItemID = {props.id} customizationList={{customizations, setCustomizations}} />}
    </>
    )
}

export const QuantityModifier = (props) => {
    const increase = () => {
        props.changeQuantity(props.value+1)
    }

    const decrease = () => {
        if (props.value>0)
            props.changeQuantity(props.value-1)
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