import React, { createContext, useEffect, useReducer } from "react";

export type CustomizationsListType = {
  CustomizationID: number;
  CustomizationName: string;
  Options: {
    id: number;
    name: string;
    price: number;
  }[]
}

export type CustomizationsType = {
    quantity: number;
    customizations: CustomizationsListType[];
  }
  
export type CartItemType = {
    menuItemID : number;
    menuItemName: string;
    restaurantID: number;
    menuItemPrice: number;
    customizations: CustomizationsType[];
  }


export enum CartActions {
  CLEAR,
  DECREASE_QUANTITY,
  ADD_OR_UPDATE,
  INCREASE_QUANTITY,
  INCREASE_CUSTOMIZATION_QUANTITY,
  DECREASE_CUSTOMIZATION_QUANTITY
}

type ClearAction = {
  type: CartActions.CLEAR
}

type DecreaseQuantityAction = {
  type: CartActions.DECREASE_QUANTITY,
  menuItemID: number
}

export type AddOrUpdateAction = CartItemType & {
  type: CartActions.ADD_OR_UPDATE
}

type IncreaseQuantityAction = Omit<CartItemType, 'customizations'> & {
  type: CartActions.INCREASE_QUANTITY,
}

type IncreaseOrDecreaseCustomizationQuantityAction = {
  type: CartActions.INCREASE_CUSTOMIZATION_QUANTITY | CartActions.DECREASE_CUSTOMIZATION_QUANTITY,
  menuItemID: number,
  index: number
}

type CartActionType = AddOrUpdateAction | ClearAction | DecreaseQuantityAction | IncreaseQuantityAction | IncreaseOrDecreaseCustomizationQuantityAction

  
const CartContext = createContext<[CartItemType[], React.Dispatch<CartActionType>] | undefined>(undefined);
  
  
  const cartReducer = (state: CartItemType[], action: CartActionType) => {
    let newState = structuredClone(state)
    
    switch (action.type) {
      case CartActions.CLEAR:{
        newState = []
        break
      }
  
      case CartActions.DECREASE_QUANTITY:{
        const itemIndex = newState.findIndex((item) => item.menuItemID === action.menuItemID);
        if (itemIndex >= 0) {
          var item = newState.splice(itemIndex, 1)
          const l = item[0].customizations.length
          if(l > 0 && item[0].customizations[l-1].quantity > 1){
            item[0].customizations[l-1].quantity -= 1
            newState.push(item[0])
          }
          else if(l>0){
            item[0].customizations.splice(l-1,1)

            if(item[0].customizations.length !== 0)
              newState.push(item[0])
          }
        }
        break
      }
      
      case CartActions.ADD_OR_UPDATE: {
        const itemIndex = newState.findIndex((item) => item.menuItemID === action.menuItemID)

        

        if (itemIndex >= 0) {

          var item = newState.splice(itemIndex, 1)
          if(item[0].customizations.length > 0 && action.customizations){
            item[0].customizations = structuredClone(action.customizations)
            newState.push(item[0])
            
          }
        }

        else{
          const newItem = structuredClone(action) as Partial<AddOrUpdateAction>
          //delete type property
          delete newItem.type
          newState.push(newItem as CartItemType)
        }
        break
      }

      case CartActions.INCREASE_QUANTITY:{
        const itemIndex = newState.findIndex((item) => item.menuItemID === action.menuItemID);
        if (itemIndex >= 0) {
          var item = newState.splice(itemIndex, 1)
          if(item[0].customizations.length > 0){
            item[0].customizations[0].quantity += 1
            newState.push(item[0])
            
          }
        }
        else{
          const newItem1 = structuredClone(action) as Partial<IncreaseQuantityAction> & {customizations?: CustomizationsType[]}
          //delete type property
          delete newItem1.type
          newItem1.customizations = [{
            quantity: 1,
            customizations: []
          }]
          newState.push(newItem1 as CartItemType)
        }
        break
      }

      case CartActions.INCREASE_CUSTOMIZATION_QUANTITY:{
        const itemIndex = newState.findIndex((item) => item.menuItemID === action.menuItemID)
        if (itemIndex >= 0) {
          newState[itemIndex].customizations[action.index].quantity += 1
        }
        break
      }

      case CartActions.DECREASE_CUSTOMIZATION_QUANTITY:{
        const itemIndex = newState.findIndex((item) => item.menuItemID === action.menuItemID)
        if (itemIndex >= 0) {
          newState[itemIndex].customizations[action.index].quantity -= 1

          if(newState[itemIndex].customizations[action.index].quantity === 0){
            newState[itemIndex].customizations.splice(action.index,1)
          }
          if(newState[itemIndex].customizations.length === 0){
            newState.splice(itemIndex,1)
          }
        }
        break
      }

      default:
        break;
    } 

    if (action.type == CartActions.INCREASE_QUANTITY || action.type == CartActions.ADD_OR_UPDATE) {
      newState = newState.filter((item)=>{
        return item.restaurantID == action.restaurantID
      });
    }
    
    
    for(let i = 0; i<newState.length ; i++)
      for(let j=0; j<newState[i].customizations.length ; j++)
      {
        let move = false
        for(let k=j; k<newState[i].customizations.length ; k++)
        {
          //compare JSON.stringify(customizations)
          if(j!==k && JSON.stringify(newState[i].customizations[j].customizations) === JSON.stringify(newState[i].customizations[k].customizations) )
          {
            newState[i].customizations[k].quantity += newState[i].customizations[j].quantity
            newState[i].customizations.splice(j,1)
            move = true
            break
          }
        }
        if (move)
          break
      }
      
    
    localStorage.setItem('cart', JSON.stringify(newState))
    return newState;
  }

export const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, dispatch] = useReducer(cartReducer, [] ,(arg)=>{
        const item = localStorage.getItem('cart')
        if(item){
            return JSON.parse(item)
        }
        else{
          localStorage.setItem('cart', JSON.stringify(arg))
        }
        return arg
    })

    useEffect(()=>{

    })


    return(
        <CartContext.Provider value={[cart, dispatch]}>
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = ()=>{
    const context = React.useContext(CartContext)
    if(context === undefined){
        throw new Error('useCartContext must be used within a CartContextProvider')
    }
    return context
}
