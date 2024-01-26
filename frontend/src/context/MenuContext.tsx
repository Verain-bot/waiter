import React, { SetStateAction, useState } from "react"

type MenuContextType = {
    restaurantID : number
    restaurantAcceptingOrders : boolean
}

const MenuContext = React.createContext<MenuContextType | null>(null)

export const MenuContextProvider = ({children, value} : {children: React.ReactNode, value: MenuContextType}) =>{

    return(
        <MenuContext.Provider value={value}>
            {children}
        </MenuContext.Provider>
    )
}

export const useMenuContext = () =>{
    const context = React.useContext(MenuContext)
    if(context === null){
        throw new Error("useMenuContext must be used within a MenuContextProvider")
    }
    return context
}