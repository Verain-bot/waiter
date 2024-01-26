import React, { useState, useEffect, useCallback, memo } from "react"
import { QuantityModifier } from "./menuItem"
import { CustomizationFetch, CustomizationOptionFetch } from "./menuCustomizationModal"
import { CustomizationsListType } from "../../context/CartContext"

type Body3Props = {
    qty: number,
    setQty: React.Dispatch<React.SetStateAction<number>>,
    setScreen: React.Dispatch<React.SetStateAction<number>>,
}

export const Body3 = (props : Body3Props)=>{
    const click = ()=>{
        props.setScreen(0)
    }

    return(
        <div className='container'>
            <div className='container'>
            <div className='row py-3'>
                <div className='col-12 d-flex justify-content-center align-items-center'>
                <QuantityModifier value={props.qty} changeQuantity={props.setQty} />
                <button className='btn btn-warning mx-2' style={{width: '100%'}} onClick={click} >
                    Customize
                </button>
                </div>
            </div>
        </div>
        </div>
    )
}

type Body2Props = {
    setScreen: React.Dispatch<React.SetStateAction<number>>,
    setUseLast: React.Dispatch<React.SetStateAction<boolean>>,
}

export const Body2 = (props : Body2Props)=>{
    const setYes = ()=>{
        //props.set(true)
        props.setScreen(2)
        props.setUseLast(true)
    }
    const setNo = ()=>{
        //props.set(false)        
        props.setScreen(0)
        props.setUseLast(false)
    }

    return(
        <div className='container'>
            <div className='row py-3'>
                <div className='col-12 d-flex justify-content-center align-items-center'>
                <button className='btn btn-warning mx-2' style={{width: '100%'}}  onClick={setYes}>
                    Yes
                </button>
                <button className='btn btn-danger mx-2' style={{width: '100%'}} onClick={setNo}>
                    No, Select new
                </button>
                </div>
            </div>
        </div>
    )
}

type Body1Props = {
    customizations: CustomizationFetch[],
    selectedCustomizations: CustomizationsListType[],
    setSelectedCustomizations: React.Dispatch<React.SetStateAction<CustomizationsListType[]>>,

}

export const Body = (props : Body1Props)=>{
    return(
        <>
            {props.customizations.map((customization, key)=>
                <Form {...(customization)} 
                    index={key} 
                    selected = {props.selectedCustomizations} 
                    setSelected = {props.setSelectedCustomizations} 
                    key={customization.id}
            />)}
        </>   
    )
}

type FooterProps = {
    qty: number,
    setQty: React.Dispatch<React.SetStateAction<number>>,
    close: ()=>void,
    add: ()=>void,
}

export  const Footer = (props : FooterProps)=>{
    return(
        <div className='col-12 d-flex'>
            <div className='col-3 d-flex align-items-center justify-content-center'>
            <b>
                Quantity: 
            </b>
            </div>

            <div className='col-3 d-flex align-items-center justify-content-center'>
                <QuantityModifier  changeQuantity={props.setQty} value={props.qty} />
            </div>
            
            <div className='col-6 text-end'>
                <button type="button" className="btn btn-dark mx-2" onClick={props.close} data-bs-dismiss='modal'>Close</button>
                <button type="button" className="btn btn-danger mx-2"  onClick={props.add} data-bs-dismiss='modal'>Add</button>
            </div>

        </div>
    )
}


type FormProps = CustomizationFetch & {
    index: number,
    selected: CustomizationsListType[],
    setSelected: React.Dispatch<React.SetStateAction<CustomizationsListType[]>>,
}

export const Form = memo((props : FormProps) => {
    const [selections, setSelections] = useState<string[]>([])

    useEffect(()=>{
        const selectedCpy = [...props.selected]
        const index = props.index
        const options = selectedCpy[index].Options
        
        if(options.length>0){
            if(selections.length === 0)
                setSelections(options.map((option)=>option.id+'-'+option.name))
        }
        else{
            if(selections.length > 0)
                setSelections([])
        }
    })

    const handleChange = useCallback((e : React.ChangeEvent<HTMLInputElement>)=>{
        
        let newSelections : string[]= []

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

        const selectedCpy = [...props.selected]
        const index = props.index
        if (props.customizationOptions !== undefined && props.customizationOptions.length>0)
        {

            selectedCpy[index] = {
                ...(selectedCpy[index]),
                Options: newSelections.map((selection)=>{

                    const sp : string[] = selection.split('-')
                    const f = props.customizationOptions.find((option)=> String(option.id) == sp[0])
                    let price = 0
                    if (f)
                        price = f.price
                    
                    return {
                        id: parseInt(sp[0]),
                        name: sp[1],
                        price: price
                    }                    
            })
            }
            const r = structuredClone(selectedCpy)
            r.forEach(item=>{
                item.Options.sort((a,b)=>a.id-b.id)
            })
            
            props.setSelected(r)
        }

    },[props])

    return(
        <div className="row mb-3">
            <span><strong>{props.name}</strong> {props.customizationType=='radio'&&<span className="text-muted" style={{fontSize: 13}}>(Atleast 1 selection required)</span>}</span>
                <div className="col-12">
                    {props.customizationOptions.map((option)=>
                    <CheckAndRadio {...option} 
                        type={props.customizationType} 
                        for={props.name} 
                        selections={selections}
                        change={handleChange} 
                        key={option.id}
                    />)  }
                </div>
        </div>
    )
})


type CheckAndRadioProps = CustomizationOptionFetch & {
    selections: string[],
    change: (e: React.ChangeEvent<HTMLInputElement>)=>void,
    type: string,
    for: string
}


export const CheckAndRadio = memo((props : CheckAndRadioProps) =>{
    const [val, setVal] = useState<string | null>(null)
    const [checked, setChecked] = useState(false)
    useEffect(()=>{
        if(val === null)
            setVal(String(props.id)+'-'+props.name)
        
        if(val && props.selections.includes(val))
            setChecked(true)
        else
            setChecked(false)

    },[props.selections])

    return(
        <div className="row p-2">
            <div className="col-8">
                <span>{props.name}</span>
            </div>
            <div className="col-4 text-end">
                <label className="form-check-label text-secondary">+ {props.price} &nbsp;</label>
                <input className="form-check-input" 
                    type={props.type} 
                    name={props.for} 
                    value={String(val)}
                    checked={checked} 
                    onChange={props.change}
                />
                
            </div>
        </div>
    )
})