import  {useState} from 'react'
import { QuantityModifier } from '../menu/menuItem'

export const CartItem = (props)=>{

    const [quantity, setQuantity] = useState(0)

    return(
        <div class='list-group-item pointer'>
            <div class='row'>
                <div class='col-6 d-flex flex-column justify-content-center'>
                    <span class='card-text'>
                        {props.name}
                    </span>
                    <span class='card-text text-muted small'>
                    Large, Extra Cheese, Large, Extra Cheese, Large, Extra Cheese, Large, Extra Cheese
                    </span>        
                </div>
                <div class='col-6 d-flex flex-row-reverse'>
                    <div class='d-flex align-items-center'>
                        <span class='card-text mx-2 medium'>
                            {props.price}
                        </span>
                        <QuantityModifier value={quantity} changeQuantity={setQuantity} />
                    </div>

                </div>
            </div>
            
        </div>
    )
}

export const CartTotal = (props) =>{
    return(
        <div class='list-group-item'>
            <CartTotalItem name='Subtotal' amount={1000} /> 
            <CartTotalItem name='GST(18%)' small amount={"180"} />
            <CartTotalItem name='Service Tax(10%)' small  amount={100} />
            <CartTotalItem name='Delivery Charge' small  amount={50} />
            <CartTotalItem name='Grand Total' amount={1330} strong={true} />
        </div>
    )
}

const CartTotalItem = (props) =>{
    return(
        <div class='row m-0 p-0'>
            <div class='col-6 p-0 m-0'>
                <span class={`card-text ${props.small?'small':'medium'} m-0 p-0`}>
                    
                    {props.strong?<strong>{props.name}</strong>:props.name}
                    
                </span>
            </div>

            <div class='col-6 p-0 m-0 text-end'>
                <span class={`card-text ${props.small?'small':'medium'} m-0 p-0`}>
                    {props.strong?<strong>{props.amount}</strong>:props.amount}
                </span>
            </div>

        </div>
    )
}