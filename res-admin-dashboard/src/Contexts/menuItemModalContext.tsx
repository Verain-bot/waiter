import React, { createContext, useEffect } from "react";

type PauseResumeItemModalType ={
    show: boolean
    menuItemID: string | number
    itemName: string
    currentlyActive: boolean
  }
  
type PauseResumeItemModalContextType = [PauseResumeItemModalType , React.Dispatch<React.SetStateAction<PauseResumeItemModalType>>]

const PauseResumeItemModalContext = createContext<PauseResumeItemModalContextType | null>(null)

export const PauseResumeItemModalProvider = ({children}: {children: React.ReactNode})=>{
    const x = React.useState<PauseResumeItemModalType>({show: false, menuItemID: '', itemName: '', currentlyActive: false})

    return(
        <PauseResumeItemModalContext.Provider value={x}>
            {children}
        </PauseResumeItemModalContext.Provider>
    )
}

export const usePauseResumeItemModal = ()=>{
    const context = React.useContext(PauseResumeItemModalContext)
    if(context === null)
        throw new Error('usePauseResumeItemModal must be used inside PauseResumeItemModalContextProvider')
    return context
}