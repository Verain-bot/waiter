import { useCallback, useEffect, useState } from "react"
import { TextInput } from "../forms/inputs"
import { QuantityModifier } from "./menuItem"
import { getData } from "../../../helper"
import { useModal } from "../../../hooks"

export const MenuCustomizationModal = (props)=>{

    const [qty,setQty] = useState()
    const [customizations, setCustomizations] = useState([])
    const [selectedCustomizations, setSelectedCustomizations] = useState([])
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
    const modal = useModal(props.id, null, null, getCustomizations)

    useEffect(()=>{
        setQty(props.quantity)
    },[props.quantity])

    const close = ()=>{
        modal.close()
        props.changeQuantity(qty)
    }

    const add = ()=>{
        modal.close()
        setQty(props.quantity)
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
                    
                        <QuantityModifier  changeQuantity={props.changeQuantity} useModal={false} value={props.quantity} />
                        
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