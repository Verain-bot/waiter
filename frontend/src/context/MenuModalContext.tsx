import React, { SetStateAction, useState } from "react"
import { CustomizationsType } from "./CartContext"
import { MenuCustomizationModal } from "../components/menu/menuCustomizationModal"

type MenuCustModalContextType = {
    show: boolean
    menuItemID?: number
    currentCustomizations: CustomizationsType[]
    setCurrentCustomizations?: (arg: CustomizationsType[])=>void
}

const MenuCustModalContext = React.createContext<[MenuCustModalContextType, React.Dispatch<React.SetStateAction<MenuCustModalContextType>>] | null>(null)

export const MenuCustModalContextProvider = ({children} : {children: React.ReactNode}) =>{

    const [val, setVal] = useState<MenuCustModalContextType>({
        show: false,
        currentCustomizations: [],
    })

    return(
        <MenuCustModalContext.Provider value={[val, setVal]}>
            <MenuCustomizationModal />
            {children}
        </MenuCustModalContext.Provider>
    )
}

export const useMenuCustModalContext = () =>{
    const context = React.useContext(MenuCustModalContext)
    if(context === null){
        throw new Error("useMenuContext must be used within a MenuContextProvider")
    }
    return context
}