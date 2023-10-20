import  {useState} from 'react'
import { QuantityModifier } from '../menu/menuItem'
import { CartActions, CartItemType, CustomizationsType, useCartContext } from '../../context/CartContext'

type CartItemPropsType = CustomizationsType & Omit<CartItemType , 'customizations'> & {
    index: number;
}

export const CartItem = (props : CartItemPropsType)=>{

    const quantity = props.quantity
    const BasePrice =  props.customizations.reduce((a,b)=>a+ b.Options.reduce((c,d)=>c+d.price,0),props.menuItemPrice)
    const custString = props.customizations.map(c =>{
        const optString  = c.Options.map( o => `${o.name} (+${o.price})`).join(', ')
        return `${c.CustomizationName} : ${optString}`
    }).join('; ')

    const [cart, dispatch] = useCartContext()

    const increase = ()=>{
        //console.log(props.index, props.menuItemID)
        console.log('increased')
        dispatch({
            type: CartActions.INCREASE_CUSTOMIZATION_QUANTITY,
            menuItemID: props.menuItemID,
            index: props.index
        })
    }

    const decrease = ()=>{
        console.log('decreased')
        dispatch({
            type: CartActions.DECREASE_CUSTOMIZATION_QUANTITY,
            menuItemID: props.menuItemID,
            index: props.index
        })
    }

    return(
        <div className='list-group-item pointer'>
            <div className='row'>
                <CartItemLeft name={props.menuItemName} price={BasePrice} custString={custString} />
                <div className='col-4 d-flex flex-row-reverse'>
                    <div className='d-flex flex-column-reverse align-items-end'>
                        
                        
                        <span className='card-text medium mt-2'>
                            <strong>
                                {BasePrice*quantity}
                            </strong>
                            
                        </span>
                         <QuantityModifier value={quantity} increase={increase} decrease={decrease} />
                        
                    </div>

                </div>
            </div>
            
        </div>
    )
}

type CartItemLeftPropsType = {
    name: string;
    price?: string | number;
    custString: string;
}

export const CartItemLeft = (props : CartItemLeftPropsType)=>{
    return(
        <div className='col-8 d-flex flex-column justify-content-center'>
                    <span className='card-text py-0 my-0'>
                        {props.name}
                    </span>

                    {props.price&&<span className='card-text small py-0 my-0 text-secondary mb-2'>
                        <strong>
                        Rs. {props.price}
                        </strong>
                    </span>}
                    <span className='card-text text-muted small'>
                    {props.custString}
                    </span>        
            </div>
    )
}


type CartTotalItemPropsType = {
    name: string;
    amount: string | number;
    small?: boolean;
    strong?: boolean;
}

export const CartTotalItem = (props : CartTotalItemPropsType) =>{
    return(
        <div className='row px-2'>
            <div className='col-6 p-0 m-0'>
                <span className={`card-text ${props.small?'small':'medium'} mx-0 p-0`}>
                    {props.strong?<strong>{props.name}</strong>:props.name}
                </span>
            </div>

            <div className='col-6 p-0 m-0 text-end'>
                <span className={`card-text ${props.small?'small':'medium'} m-0 p-0`}>
                    {props.strong?<strong>{props.amount}</strong>:props.amount}
                </span>
            </div>

        </div>
    )
}