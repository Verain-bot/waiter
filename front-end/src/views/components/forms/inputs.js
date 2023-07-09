import { useEffect, useState } from "react"

export const TextInput = (props) => {

    const handleChange = (e) => {
        props.set(e.target.value)
    }

    return(
        <div class="col-12">
        <label for="yourUsername" class="form-label">{props.name}</label>
        <div class="input-group has-validation">
          
          <input type={props.type} name="username" class="form-control" id="yourUsername" required value={props.value} onChange={handleChange} />
        </div>
      </div>
    )
}

export const IntegerInput = (props) => {
    const handleChange = (e) => {
        props.set(e.target.value)
    }

    return(
        <div class="col-12">
        <label for="yourUsername" class="form-label">{props.name}</label>
        <div class="input-group has-validation">
          <span class="input-group-text" id="inputGroupPrepend">+91</span>
          <input type='number' pattern="[0-9]*" name="username" class="form-control" id="yourUsername" required value={props.value} onChange={handleChange} />
        </div>
      </div>
    )
}

export const Check = (props) => {
    return(
        
            <div class="form-check">
                <input class={`form-check-input ${props.name===null?"m-0":''}`} type="checkbox" name="remember" value="true" id="rememberMe" />
                <label class="form-check-label" for="rememberMe">{props.name}</label>
            </div>
        
    )
}

export const OutlinedCheck = (props) => {
    const [id, setId] = useState('')

    useEffect(() => {
        var newID = 'OutlinedCheckbox'+props.name
        setId(newID)
        
    },[id,props.name])

    return(
        <div class='mx-2'>
        <input type="checkbox" class="btn-check" id={id} autocomplete="off"/>
        <label class={`btn ${props.buttonClass}`} for={id}>{props.name}</label><br/>
        </div>
    )
}

export const Button = (props) => {
    return(
        <div class="col-12">
            <button class="btn btn-primary w-100" type="submit" disabled={props.disabled} onClick={props.onClick} >{props.name}</button>
        </div>
    )
}