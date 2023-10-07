import { useCallback, useEffect, useMemo, useState } from "react"
import { getData } from "../../utilities/fetchData"
import useModal from "../../hooks/useModal"
import { ModalLayout } from "../modal/modal"
import {Body, Body2, Body3, Footer} from './menuCustomizationComponents' 
import { CustomizationsListType, CustomizationsType } from "../../context/CartContext"
import APIRoutes, { makeURL } from "../../utilities/APIRoutes"
import { useMessageContext } from "../../context/MessageContext"
import { PlaceHolder } from "../../views/loading"

export type CustomizationOptionFetch = {
    id: number;
    customization: string;
    name: string;
    price: number;
    dependencies: any[]; // You can replace "any" with a more specific type if needed
  };
  
export type CustomizationFetch = {
    id: number;
    customizationOptions: CustomizationOptionFetch[];
    name: string;
    customizationType: string;
    item: number;
  };
  
  type MenuItemDetailFetch = {
    id: number;
    customizations: CustomizationFetch[];
    name: string;
    price: number;
    description: string;
    totalOrders: number;
    rating: number | null;
    totalRatings: number;
    itemPhoto: string;
    restaurant: number;
    itemType: number;
    category: number;
  };
    

type MenuCustomizationModalProps = {
    id: string;
    menuItemID: number;
    customizations: CustomizationsType[];
    addOrUpdate: (c: CustomizationsType[]) => void
}

export const MenuCustomizationModal = (props : MenuCustomizationModalProps)=>{

    const [qty,setQty] = useState(0)
    const [useLast, setUseLast] = useState(false)
    const [customizations, setCustomizations] = useState<CustomizationFetch[]>([])
    const [selectedCustomizations, setSelectedCustomizations] = useState<CustomizationsListType[]>([])
    const [screen, setScreen] = useState(1)
    const modal = useModal(props.id, ()=>{onOpen()}, ()=>{onClose()})
    const [isLoading,setIsLoading] = useState(true)
    const controller = new AbortController()
    
    const [message, setMessage] = useMessageContext()

    const getCustomizations = useCallback(async () =>{
        const URLid =String(props.menuItemID)
        let response
        try {
            setIsLoading(true)
            response = await getData(makeURL(APIRoutes.MENU_DETAILS, {pk : URLid}), controller.signal)
            setIsLoading(false)
        } catch (error) {
            setMessage({heading:'Error', body:'Something went wrong', type:'error'})
            return
        }
        const json : MenuItemDetailFetch = await response.json()
        const cust = json.customizations
        setCustomizations(cust)
        setSelectedCustomizations(cust.map((customization)=>{
                const initialOption = customization.customizationType == 'radio'? [customization.customizationOptions[0]] : []
                return {
                CustomizationID: customization.id,
                CustomizationName: customization.name,
                Options: initialOption
            }
        }
        
        ))
    }, [])

    const onClose = ()=>{
        setUseLast(false)
        controller.abort()
        
    }

    const onOpen= useCallback(()=>{
        if(customizations.length===0)
            getCustomizations()

        if (props.customizations.length>0){
            setScreen(1)
        }

        else{
            setScreen(0)
        }

        if(useLast && props.customizations.length>0)
        {
            let last = props.customizations[props.customizations.length-1]
            setSelectedCustomizations(last.customizations)
            setQty(last.quantity)
        }
        else{
            setSelectedCustomizations(customizations.map((customization)=>{return {
                CustomizationID: customization.id,
                CustomizationName: customization.name,
                Options: [],
            }
        }))
        
        setQty(1)

        }
        
    },[selectedCustomizations.length, modal.show, customizations.length,JSON.stringify(props.customizations)])
    
    useEffect(()=>{
        

        if(useLast && props.customizations.length>0)
        {
            let last = props.customizations[props.customizations.length-1]
            setSelectedCustomizations(last.customizations)
            setQty(last.quantity)
        }
        else{
            setSelectedCustomizations(customizations.map((customization)=>{return {
                CustomizationID: customization.id,
                CustomizationName: customization.name,
                Options: [],
            }
        }))
        
        setQty(1)

        }

        
    },[useLast, screen])


    const close = ()=>{
        modal.close()
    }

    const add = useCallback( ()=>{
        modal.close()
        let x = [...props.customizations]
        
        if (useLast)
        {
            if (qty>0)
            {
                x[x.length-1]={
                    quantity: qty,
                    customizations: selectedCustomizations,
                }
            }
            else{
                x.pop()
            }
        }
        else{
            if (qty>0)
            {
                x.push({
                    quantity: qty,
                    customizations: selectedCustomizations,
                })
            }
            
        }
        props.addOrUpdate(x)
    },[qty, selectedCustomizations])
    
    if(isLoading)
        return(
        <ModalLayout 
            id = {props.id}
            title = 'Customizations'
            body = {<PlaceHolder />}            
        />
        )

    if (screen==0)
    return(
        <ModalLayout 
            id = {props.id}
            title = 'Customizations'
            body = {<Body customizations={customizations} selectedCustomizations={selectedCustomizations} setSelectedCustomizations={setSelectedCustomizations}   />}
            footer = {<Footer qty={qty} setQty={setQty} close={close} add={add} />}
        />
    )

    if (screen==1)
    return(
        <ModalLayout 
            id = {props.id}
            title = 'Repeat last customization?'
            body = {<Body2  setScreen={setScreen} setUseLast={setUseLast} />}  
            footer={<button type="button" className="btn btn-dark" data-bs-dismiss="modal">Close</button>}
        />
    )

    if (screen==2)
    return(
        <ModalLayout 
            id={props.id}
            title = 'Update'
            body={<Body3 setScreen={setScreen} qty={qty} setQty={setQty} />}
            footer={<button type="button" className="btn btn-danger" onClick={add} data-bs-dismiss='modal'>Update</button>}
        />
    )
}