import { useEffect, useState } from "react"
import { FormCard } from "../components/forms/formCard"
import { Button, LinkFooter} from "../components/forms/inputsControlled"
import { Check, Input } from "../components/forms/inputsUncontrolled"
import { LoginContextType } from "../context/LoginContext"
import { ActionFunction, redirect } from "react-router-dom"
import { ActionErrorDataType, useActionError } from "../hooks/useActionError"
import { checkEmail, checkPhone } from "../utilities/formChecks"
import { makeRequest } from "../utilities/fetchData"
import { PATHS } from "../utilities/routeList"

const App = ()=>{

    const err = useActionError()

    return(
        <div className="col-lg-4 col-md-6 col-12 d-flex flex-column align-items-center justify-content-center" style={{'height':'80vh'}}>
        <FormCard title='Register' subtitle='Please enter your details to register' error={err} method="POST">
            <Input name='First Name' type={'text'} inputName="firstName" />
            <Input name='Last Name' type={'text'} inputName="lastName" />
            <Input name='Email' type={'text'} inputName="email" />
            <Input name='Phone' type={'number'} maxLength={10} prepend={'+91'} inputName="phone" />
            <Check name='I agree to the Terms and Conditions' inputName="tnc" />
            <Button name='Submit' />
            <LinkFooter text="Already registered?" linkText="Login" href={PATHS.LOGIN} />
        </FormCard>
        </div>
    )
}

export const registerAction : (val : [LoginContextType, React.Dispatch<React.SetStateAction<LoginContextType>>]) => ActionFunction = (LoginContext ) => async({request, params}) : Promise<ActionErrorDataType | Response>=>{
    console.log('asda')
    const data = await request.formData()
    const firstName = String(data.get('firstName'))
    const lastName = String(data.get('lastName'))
    const phone = String(data.get('phone'))
    const email = String(data.get('email'))

    const [mailCheck, mailMsg] = checkEmail(email)
    const [phoneCheck, phoneMsg] = checkPhone(phone)
    
    console.log()

    if (!mailCheck || !phoneCheck ){
        return {
            heading: 'Error',
            body: 'Please enter valid details',
            type: 'error',
            // @ts-ignore
            errors: [...mailMsg.errors, ...phoneMsg.errors]
        }
    }

    const formData = new FormData()
    formData.append('name', `${firstName} ${lastName}`)
    formData.append('email', email)
    formData.append('phone', phone)

    const {json, message, response} = await makeRequest('api/create/', request, formData)
    var m : string = json.phone || json.email || message
    m = String(m)
    m = m[0].toUpperCase() + m.slice(1)

    if (!response.ok) {
        return {
            heading: 'Error',
            body: m,
            type:'error',
        }
    }

    alert(`User created successfully. Please login to continue.`)

    return redirect(PATHS.LOGIN, {status: 201})
}


export default App