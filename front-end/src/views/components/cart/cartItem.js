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
                        
                        {
                            props.fixed&&<span class='text-secondary small'>
                                {quantity} x
                            </span>
                        }
                        <span class='card-text mx-2 medium'>
                            {props.price}
                        </span>
                        {!props.fixed&&<QuantityModifier value={quantity} changeQuantity={setQuantity} />}
                        
                    </div>

                </div>
            </div>
            
        </div>
    )
}


export const CartTotalItem = (props) =>{
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