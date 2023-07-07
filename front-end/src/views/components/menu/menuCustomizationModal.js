import { useEffect, useState } from "react"
import { TextInput } from "../forms/inputs"
import { QuantityModifier } from "./menuItem"

export const MenuCustomizationModal = (props)=>{

    const [qty,setQty] = useState()

    useEffect(()=>{
        setQty(props.quantity)
    },[])

    const close = ()=>{
        props.changeQuantity(qty)
    }

    const add = ()=>{
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
                
                <Form name='Size' type='radio' />
                <Form name='Size 2' type='checkbox' />
                <Form name='Size 2' type='checkbox' />
                <Form name='Size 2' type='checkbox' />
                <Form name='Size 2' type='checkbox' />
                <Form name='Size 2' type='checkbox' />
                <Form name='Size 2' type='checkbox' />
                <Form name='Size 2' type='checkbox' />
                
                
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
                        <button type="button" class="btn btn-dark mx-2" data-bs-dismiss="modal" onClick={close} >Close</button>
                        <button type="button" class="btn btn-danger mx-2" data-bs-dismiss="modal" onClick={add} >Add</button>
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
                    <CheckAndRadio name='One' price='21' for={props.name.replace(' ','')}  type={props.type} />
                    <CheckAndRadio name='One' price='21' for={props.name.replace(' ','')}  type={props.type} />
                    <CheckAndRadio name='One' price='21' for={props.name.replace(' ','')}  type={props.type} />
                </div>
        </div>
    )
}