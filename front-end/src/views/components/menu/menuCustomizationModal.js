import { useEffect, useState } from "react"
import { TextInput } from "../forms/inputs"
import { QuantityModifier } from "./menuItem"
import { getData } from "../../../helper"
import { useModal } from "../../../hooks"

export const MenuCustomizationModal = (props)=>{

    const [qty,setQty] = useState()
    const [customizations, setCustomizations] = useState([])
    
    const getCustomizations = async () =>{
        const response =await getData(`api/menu/details/${props.menuItemID}`)
        const json = await response.json()
        setCustomizations(json.customizations)
        console.log(json.customizations)
    }
    const modal = useModal(props.id, null, null, getCustomizations)

    useEffect(()=>{
        setQty(props.quantity)
    },[])

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
                
                {customizations.map((customization)=><Form {...customization} />)}
                
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

const CheckAndRadio = (props) =>{
    return(
        <div class="row p-2">
            <div class="col-8">
                <span>{props.name}</span>
            </div>
            <div class="col-4 text-end">
                <label class="form-check-label text-secondary">+ {props.price} &nbsp;</label>
                <input class="form-check-input" type={props.type} name={props.for} value="true" />
            </div>
        </div>
    )
}

const Form = (props) => {
    return(
        <div class="row mb-3">
            <strong>{props.name}</strong>
                <div class="col-12">
                    {props.customizationOptions.map((option)=><CheckAndRadio {...option} type={props.customizationType} for={props.name} />)  }
                </div>
        </div>
    )
}