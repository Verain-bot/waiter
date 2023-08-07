import  {useState} from 'react'
import { QuantityModifier } from '../menu/menuItem'

export const CartItem = (props)=>{

    const [quantity, setQuantity] = useState(props.quantity)
    
    const custString = props.customization.map(cust=>{
        let optionString = cust.Options.map(option=> `${option.name} `).join(', ')
        return `${cust.CustomizationName} : ${optionString}`
    }).join('; ')

    const BasePrice = props.customization.reduce((acc, cust)=>{
        return acc + cust.Options.reduce((acc, option)=>{
            return acc+option.price
        },0)
    },props.price)


    return(
        <div class='list-group-item pointer'>
            <div class='row'>
                <div class='col-6 d-flex flex-column justify-content-center'>
                    <span class='card-text py-0 my-0'>
                        {props.name}
                    </span>
                    <span class='card-text small py-0 my-0 text-muted'>
                        <strong>
                        Rs. {BasePrice}
                        </strong>
                    </span>
                    <span class='card-text text-muted small'>
                    {custString}
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
                            {BasePrice*quantity}
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