import { CartItemType, CustomizationsType } from "../context/CartContext"

export const getCartItemQuantity = (customizations: CustomizationsType[] )=>{
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

export const getCartQuantity = (cart : CartItemType[] )=>{
    
    let q = 0
    cart.forEach(item=>{
        item.customizations.forEach(customization=>{
            q += customization.quantity
        })
    })
    return q
    
}