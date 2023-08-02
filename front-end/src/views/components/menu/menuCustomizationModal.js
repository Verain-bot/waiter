import { useCallback, useEffect, useState } from "react"
import { TextInput } from "../forms/inputs"
import { QuantityModifier } from "./menuItem"
import { getData } from "../../../helper"
import { useModal } from "../../../hooks"

export const MenuCustomizationModal = (props)=>{

    const [qty,setQty] = useState()
    const [customizations, setCustomizations] = useState([])
    const [selectedCustomizations, setSelectedCustomizations] = useState([])
    const modal = useModal(props.id, ()=>{onOpen()}, ()=>{onClose()})

    const getCustomizations = async () =>{
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
        
    }

    const onClose = ()=>{
        console.log(qty)
        props.changeQuantity(props.quantity - 1)
    }

    const onOpen= ()=>{
        if(props.useLast)
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
        
    }

    useEffect(()=>{
        getCustomizations()
        
    },[])

    const close = ()=>{
        modal.close()
    }

    const add = ()=>{
        modal.close()
        props.changeQuantity(qty)
        let x = [...props.customizations]
        
        if (props.useLast)
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
    }

    return(
        <div class="modal fade" id={props.id} tabindex="-1" role="dialog" >
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header d-flex align-items-center justify-content-center">
                <h5 class="modal-title" id="exampleModalLongTitle">Customize</h5>
            </div>
            <div class="modal-body">
                
                {customizations.map((customization, key)=>
                    <Form {...customization} 
                        index={key} 
                        selected = {selectedCustomizations} 
                        setSelected = {setSelectedCustomizations} 
                />)}
                
            </div>

            <div class="modal-footer">
                <div class='col-12 d-flex'>
                    <div class='col-3 d-flex align-items-center justify-content-center'>
                    <b>
                        Quantity: 
                    </b>
                    </div>

                    <div class='col-3 d-flex align-items-center justify-content-center'>
                    
                        <QuantityModifier  changeQuantity={setQty} useModal={false} value={qty} />
                        
                    </div>
                    
                    <div class='col-6 text-end'>
                        <button type="button" class="btn btn-dark mx-2" onClick={close} >Close</button>
                        <button type="button" class="btn btn-danger mx-2"  onClick={add} >Add</button>
                    </div>

                </div>
                
            </div>
        </div>
        </div>
        </div>
    )
}


const Form = (props) => {
    const [selections, setSelections] = useState([])

    useEffect(()=>{
        let selectedCpy = [...props.selected]
        const index = props.index
        let options = selectedCpy[index].Options
        
        if(options.length>0){
            if(selections.length === 0)
                setSelections(options.map((option)=>option.id+'-'+option.name))
        }
        else{
            if(selections.length > 0)
                setSelections([])
        }
    })

    const handleChange = useCallback((e)=>{
        
        var newSelections = []

        if (e.target.type === 'radio')
            newSelections = [e.target.value]
        
        if (e.target.type === 'checkbox')
        {
            if (selections.includes(e.target.value))
                newSelections = selections.filter((selection)=>selection !== e.target.value)
            else
                newSelections = [...selections, e.target.value]
        }

        setSelections(newSelections)

        let selectedCpy = [...props.selected]
        const index = props.index
        selectedCpy[index] = {
            ...(selectedCpy[index]),
            'Options': newSelections.map((selection)=>({id: selection.split('-')[0],name: selection.split('-')[1]}))
        }
        props.setSelected(selectedCpy)
        console.log(selectedCpy, 'selected', props.index)


    },[props])

    return(
        <div class="row mb-3">
            <strong>{props.name}</strong>
                <div class="col-12">
                    {props.customizationOptions.map((option)=>
                    <CheckAndRadio {...option} 
                        type={props.customizationType} 
                        for={props.name} 
                        selections={selections}
                        change={handleChange} 
                    />)  }
                </div>
        </div>
    )
}


const CheckAndRadio = (props) =>{
    const [val, setVal] = useState(null)
    const [checked, setChecked] = useState(false)
    useEffect(()=>{
        if(val === null)
            setVal(String(props.id)+'-'+props.name)
        
        if(props.selections.includes(val))
            setChecked(true)
        else
            setChecked(false)

    },[props.selections])

    return(
        <div class="row p-2">
            <div class="col-8">
                <span>{props.name}</span>
            </div>
            <div class="col-4 text-end">
                <label class="form-check-label text-secondary">+ {props.price} &nbsp;</label>
                <input class="form-check-input" 
                    type={props.type} 
                    name={props.for} 
                    value={val} checked={checked} 
                    onChange={props.change}
                />
                
            </div>
        </div>
    )
}