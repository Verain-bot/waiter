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
}

type ClearAction = {
  type: CartActions.CLEAR
}

type DecreaseQuantityAction = {
  type: CartActions.DECREASE_QUANTITY,
  menuItemID: number
}

type AddOrUpdateAction = CartItemType & {
  type: CartActions.ADD_OR_UPDATE,
}

type IncreaseQuantityAction = Omit<CartItemType, 'customizations'> & {
  type: CartActions.INCREASE_QUANTITY,
}


type CartActionType = AddOrUpdateAction | ClearAction | DecreaseQuantityAction | IncreaseQuantityAction

  
const CartContext = createContext<[CartItemType[], React.Dispatch<CartActionType>] | undefined>(undefined);
  
  
  const cartReducer = (state: CartItemType[], action: CartActionType) => {
    var newState = structuredClone(state)
    
    switch (action.type) {
      case CartActions.CLEAR:{
        newState = []
        break
      }
  
      case CartActions.DECREASE_QUANTITY:{
        console.log('decrease quantity' , action)
        const itemIndex = newState.findIndex((item) => item.menuItemID === action.menuItemID);
        if (itemIndex >= 0) {
          var item = newState.splice(itemIndex, 1)
          if(item[0].customizations.length > 0 && item[0].customizations[0].quantity > 1){
            item[0].customizations[0].quantity -= 1
            newState.push(item[0])
          }
        }
        break
      }
      
      case CartActions.ADD_OR_UPDATE: {
        console.log('add or update', action)
        const itemIndex = newState.findIndex((item) => item.menuItemID === action.menuItemID)

        

        if (itemIndex >= 0) {
          var done = false

          newState[itemIndex].customizations.forEach((customization1, index)=>{
            action.customizations.forEach((customization2, index)=>{
              if(JSON.stringify(customization1.customizations) == JSON.stringify(customization2.customizations))
              {
                customization1.quantity += customization2.quantity
                done = true
              }
            })
          })

          if(done)
            break

          var item = newState.splice(itemIndex, 1)
          if(item[0].customizations.length > 0 && action.customizations){
            item[0].customizations = structuredClone(action.customizations)
            newState.push(item[0])
            
          }
        }

        else{
          var newItem = structuredClone(action) as Partial<AddOrUpdateAction>
          //delete type property
          delete newItem.type
          newState.push(newItem as CartItemType)
        }
        break
      }

      case CartActions.INCREASE_QUANTITY:{
        console.log('increase quantity', action)
        const itemIndex = newState.findIndex((item) => item.menuItemID === action.menuItemID);
        if (itemIndex >= 0) {
          var item = newState.splice(itemIndex, 1)
          if(item[0].customizations.length > 0){
            item[0].customizations[0].quantity += 1
            newState.push(item[0])
            
          }
        }
        else{
          var newItem1 = structuredClone(action) as Partial<IncreaseQuantityAction> & {customizations?: CustomizationsType[]}
          //delete type property
          delete newItem1.type
          newItem1.customizations = [{
            quantity: 1,
            customizations: []
          }]
          newState.push(newItem1 as CartItemType)
        }
      }

      default:
        break;
    } 

    if (action.type == CartActions.INCREASE_QUANTITY || action.type == CartActions.ADD_OR_UPDATE) {
      newState = newState.filter((item)=>{
        return item.restaurantID == action.restaurantID
      });
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
