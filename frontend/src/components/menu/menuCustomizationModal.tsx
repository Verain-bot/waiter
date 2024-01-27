import { useCallback, useEffect, useId, useMemo, useState } from "react"
import { getData } from "../../utilities/fetchData"
import {Body, Body2, Body3, Footer} from './menuCustomizationComponents' 
import { CustomizationsListType, CustomizationsType } from "../../context/CartContext"
import APIRoutes, { makeURL } from "../../utilities/APIRoutes"
import { useMessageContext } from "../../context/MessageContext"
import { PlaceHolder, PlaceHolderSimple } from "../../views/loading"
import { useMenuCustModalContext } from "../../context/MenuModalContext"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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
    


export const MenuCustomizationModal = ()=>{

    const [qty,setQty] = useState(0)
    const [useLast, setUseLast] = useState(false)
    const [customizations, setCustomizations] = useState<CustomizationFetch[]>([])
    const [selectedCustomizations, setSelectedCustomizations] = useState<CustomizationsListType[]>([])
    const [screen, setScreen] = useState(1)
    const [isLoading,setIsLoading] = useState(true)
    const [message, setMessage] = useMessageContext()
    const [props, setProps] = useMenuCustModalContext()
    const [lastItem, setLastItem] = useState<number>(-1)
    let controller = new AbortController()
    const getCustomizations = useCallback(async () =>{
        const URLid =String(props.menuItemID)
        let response
        try {
            setIsLoading(true)
            response = await getData(makeURL(APIRoutes.MENU_DETAILS, {pk : URLid}), controller.signal)
        } catch (error : any) {
            console.error(error)
            setIsLoading(false)
            if (controller.signal.aborted)
                return
            setMessage({heading:'Error', body:'Something went wrong', type:'error'})
            return
        }
        
        const json : MenuItemDetailFetch = await response.json()
        const cust = json.customizations
        setCustomizations(cust)
        setIsLoading(false)
        setSelectedCustomizations(cust.map((customization)=>{
                if (customization.customizationOptions.length===0)
                {
                    setMessage({heading:'Error', body:'Something went wrong', type:'error'})
                    setProps({...props, show: false})
                    return {
                        CustomizationID: customization.id,
                        CustomizationName: customization.name,
                        Options: []
                    }
                }
                    
                const initialOption = customization.customizationType == 'radio'? [customization.customizationOptions[0]] : []
                return {
                CustomizationID: customization.id,
                CustomizationName: customization.name,
                Options: initialOption
            }
        }
        ))
        if (props.menuItemID)
            setLastItem(props.menuItemID)
    }, [props.menuItemID])


    const onOpen= useCallback(()=>{
        //Fetch customizations from server if not exist
        if(customizations.length===0 || String(lastItem)!==String(props.menuItemID))
        {
            getCustomizations()
        }

        // If already selected customizations, set to screen 1 (Option to select new or repeat last customization)
        if (props.currentCustomizations.length>0){
            setScreen(1)
        }

        // Select screen 0 (New customization) if no customizations selected
        else{
            setScreen(0)
        }

    },[selectedCustomizations.length, props.show, customizations.length,JSON.stringify(props.currentCustomizations), props.menuItemID])
    
    useEffect(()=>{
        
        if(useLast && props.currentCustomizations.length>0)
        {
            const last = props.currentCustomizations[props.currentCustomizations.length-1]
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

        
    },[useLast, screen, props.menuItemID])


    const closeModal = ()=>{
        controller.abort()
        setProps({...props, show: false})
        setUseLast(false)
    }

    const add = useCallback( ()=>{
        closeModal()
        const x = [...props.currentCustomizations]
        
        // If using the last customization, update the last customization
        if (useLast)
        {
            if (qty>0)
            {
                x[x.length-1]={
                    quantity: qty,
                    customizations: selectedCustomizations,
                }
            }
            // If quantity is 0, remove the last customization
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

        if(props.setCurrentCustomizations)
            props.setCurrentCustomizations(x)

    },[qty, selectedCustomizations])
    

        let title = ''
        let body
        let footer
        switch(screen){
            case 0:
                title = 'Customizations'
                body = <Body customizations={customizations} selectedCustomizations={selectedCustomizations} setSelectedCustomizations={setSelectedCustomizations}   />
                footer = <Footer qty={qty} setQty={setQty} close={closeModal} add={add} />
                break
            case 1:
                title =  'Repeat last customization?'
                body = <Body2  setScreen={setScreen} setUseLast={setUseLast} />
                footer = <button type="button" className="btn btn-dark" onClick={closeModal}>Close</button>
                break
            case 2:
                title = 'Customizations'
                body = <Body customizations={customizations} selectedCustomizations={selectedCustomizations} setSelectedCustomizations={setSelectedCustomizations}   />
                footer = <Footer qty={qty} setQty={setQty} close={closeModal} add={add} />
                break
            default:
                throw Error('Invalid screen')
        }

    return(
        
        <Modal show={props.show} onHide={closeModal} onShow={onOpen} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            
            <Modal.Body className="cust-modal">
                {isLoading? 
                <>
                    <PlaceHolderSimple />
                    <PlaceHolderSimple />
                    <PlaceHolderSimple />
                    <PlaceHolderSimple />
                </>:
                <div className="loading-content">
                    {body}
                </div>
                }
                
            </Modal.Body>
            
            <Modal.Footer>
                {isLoading?<Button variant="danger" onClick={closeModal}>
                    Close
                </Button>:footer}
            </Modal.Footer>
            

            
                
            
            
        </Modal>
    )
}