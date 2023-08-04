import { useState, useEffect, useCallback, memo } from "react"
import { QuantityModifier } from "./menuItem"
export const Body3 = (props)=>{
    const click = ()=>{
        props.setScreen(0)
    }

    return(
        <div class='container'>
            <div class='container'>
            <div class='row py-3'>
                <div class='col-12 d-flex justify-content-center align-items-center'>
                <QuantityModifier value={props.qty} changeQuantity={props.setQty} />
                <button class='btn btn-warning mx-2' style={{width: '100%'}} onClick={click} >
                    Customize
                </button>
                </div>
            </div>
        </div>
        </div>
    )
}

export const Body2 = (props)=>{
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
        <div class='container'>
            <div class='row py-3'>
                <div class='col-12 d-flex justify-content-center align-items-center'>
                <button class='btn btn-warning mx-2' style={{width: '100%'}}  onClick={setYes}>
                    Yes
                </button>
                <button class='btn btn-danger mx-2' style={{width: '100%'}} onClick={setNo}>
                    No, Select new
                </button>
                </div>
            </div>
        </div>
    )
}

export const Body = (props)=>{
    return(
        <>
            {props.customizations.map((customization, key)=>
                <Form {...(customization)} 
                    index={key} 
                    selected = {props.selectedCustomizations} 
                    setSelected = {props.setSelectedCustomizations} 
            />)}
        </>   
    )
}

export  const Footer = memo((props)=>{
    return(
        <div class='col-12 d-flex'>
            <div class='col-3 d-flex align-items-center justify-content-center'>
            <b>
                Quantity: 
            </b>
            </div>

            <div class='col-3 d-flex align-items-center justify-content-center'>
                <QuantityModifier  changeQuantity={props.setQty} useModal={false} value={props.qty} />
            </div>
            
            <div class='col-6 text-end'>
                <button type="button" class="btn btn-dark mx-2" onClick={props.close} >Close</button>
                <button type="button" class="btn btn-danger mx-2"  onClick={props.add} >Add</button>
            </div>

        </div>
    )
})

export const Form = memo((props) => {
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
})

export const CheckAndRadio = memo((props) =>{
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
})