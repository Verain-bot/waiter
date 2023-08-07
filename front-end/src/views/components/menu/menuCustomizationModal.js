import { useCallback, useEffect, useState } from "react"
import { getData } from "../../../helper"
import { useModal } from "../../../hooks"
import { ModalLayout } from "../modal/modal"
import {Body, Body2, Body3, Footer} from './menuCustomizationComponents.js' 
export const MenuCustomizationModal = (props)=>{

    const [qty,setQty] = useState()
    const [useLast, setUseLast] = useState(false)
    const [customizations, setCustomizations] = useState([])
    const [selectedCustomizations, setSelectedCustomizations] = useState([])
    const [screen, setScreen] = useState(1)
    const modal = useModal(props.id, ()=>{onOpen()}, ()=>{onClose()})

    const getCustomizations = useCallback(async () =>{
        const response =await getData(`api/menu/details/${props.menuItemID}`)
        const json = await response.json()
        const cust = json.customizations
        setCustomizations(cust)
        setSelectedCustomizations(cust.map((customization)=>{return {
            CustomizationID: customization.id,
            CustomizationName: customization.name,
            Options: [],
        }
        }))
    }, [])

    const onClose = useCallback(()=>{
        setUseLast(false)
    },[modal.show])

    const onOpen= useCallback(()=>{
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
        if(customizations.length===0)
            getCustomizations()

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
        props.setCustomizations(x)
    })
    
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
            footer={<button type="button" class="btn btn-dark" data-bs-dismiss="modal">Close</button>}
        />
    )

    if (screen==2)
    return(
        <ModalLayout 
            id={props.id}
            title = 'Update'
            body={<Body3 setScreen={setScreen} setUseLast={setUseLast} qty={qty} setQty={setQty} />}
            footer={<button type="button" class="btn btn-danger" onClick={add}>Update</button>}
        />
    )
}

