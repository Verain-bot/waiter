import { useState } from "react"
import { Stars } from "./stars"
import { MenuCustomizationModal } from "./menuCustomizationModal"

export const MenuItem = (props) => {

    const [quantity, setQuantity] = useState(0)

    const increaseQuantity = () => {
        setQuantity(quantity+1)
    }

    return(

    <div class="row my-0 d-flex align-items-center justify-content-center">
        <div class="col-12 col-md-9 col-xl-8 mx-0 p-0 menu-item">

            <div class="row d-flex align-items-center justify-content-center">
                <div class="col-4 mx-auto">
                    <img class='rounded img-thumbnail shadow-sm border-0' src='https://media.istockphoto.com/id/938742222/photo/cheesy-pepperoni-pizza.jpg?s=612x612&w=0&k=20&c=D1z4xPCs-qQIZyUqRcHrnsJSJy_YbUD9udOrXpilNpI=' />
                </div>
                <div class="col-8 mx-0 mt-2 px-0">
                    <div class='row'>
                        <div class='col-7 pb-2'>
                            <div class='row'>
                                
                                <h1 class='card-title py-0 m-0 medium' ><i class='bi bi-dash-square-fill text-success' /> {props.name}</h1>
                                <span class='text-muted small'>Rs. 209</span>
                                
                                <span class='small pb-1'>
                                <Stars stars={3.4} numRatings={21} />
                                </span>
                                

                            </div>

                            <div class='row'>
                                <span class='card-text text-secondary small'>Freshly baked pizza with cheese and pepperoni</span>
                            </div>
                        </div>

                        <div class='col-4 d-flex flex-column align-items-center justify-content-center'>
                            
                            <div class='row'>
                                {quantity===0 && <i class='bi bi-cart-plus add-to-cart-btn' onClick={increaseQuantity} data-bs-toggle="modal" data-bs-target={`#MenuItemModal${props.name.replace(' ','')}`}></i>}

                                {quantity>0&&<QuantityModifier changeQuantity={setQuantity} useModal={true} modalId={`#MenuItemModal${props.name.replace(' ','')}`} value={quantity} />}
                            </div>

                            <div class='row'>
                                <span class='small text-secondary'>Customizable+</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <hr class='mx-auto'/>
        </div>

        <MenuCustomizationModal id={`MenuItemModal${props.name.replace(' ','')}`} quantity={quantity}  changeQuantity={setQuantity} />
    </div>
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