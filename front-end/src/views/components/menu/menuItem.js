import { useState } from "react"

export const MenuItem = (props) => {

    const [quantity, setQuantity] = useState(0)

    const increaseQuantity = () => {
        setQuantity(quantity+1)
    }

    const decreaseQuantity = () => {
        if (quantity>0)
            setQuantity(quantity-1)
    }

    return(

    <div class="row">
        <div class="col-11 col-md-9 card col-xl-8 mx-auto p-1 shadow menu-item">

            <div class="row d-flex align-items-center justify-content-center">
                <div class="col-4 mx-auto">
                    <img class='rounded img-thumbnail shadow border-0' src='https://media.istockphoto.com/id/938742222/photo/cheesy-pepperoni-pizza.jpg?s=612x612&w=0&k=20&c=D1z4xPCs-qQIZyUqRcHrnsJSJy_YbUD9udOrXpilNpI=' />
                </div>
                <div class="col-8 mx-auto mt-2 px-3">
                    <div class='row'>
                        <div class='col-7 pb-2'>
                            <h4>Pizza</h4>
                            Freshly baked pizza with cheese and pepperoni
                        </div>

                        <div class='col-5 d-flex align-items-center justify-content-center'>
                            
                            {quantity===0 && <i class='bi bi-cart-plus add-to-cart-btn' onClick={increaseQuantity}></i>}

                            {quantity>0&&<div class='input-group d-flex'>
                                <button class='btn btn-outline-secondary btn-sm' onClick={decreaseQuantity}>
                                    <i class='bi bi-dash'></i>
                                </button>
                                <input type='number' class='form-control center-input' value={quantity} />
                                <button class='btn btn-outline-secondary btn-sm' onClick={increaseQuantity}>
                                    <i class='bi bi-plus'></i>
                                </button>
                            </div>}

                        </div>
                    </div>

                </div>
            </div>
        </div>


    </div>
    )
}