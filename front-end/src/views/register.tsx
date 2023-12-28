import { useEffect, useState } from "react"
import { FormCard } from "../components/forms/formCard"
import { Button, LinkFooter} from "../components/forms/inputsControlled"
import { Check, Input } from "../components/forms/inputsUncontrolled"
import { LoginContextType, useLoginContext } from "../context/LoginContext"
import { ActionFunction, redirect, useNavigate } from "react-router-dom"
import { ActionErrorDataType, useActionError } from "../hooks/useActionError"
import { checkEmail, checkPhone } from "../utilities/formChecks"
import { makeRequest } from "../utilities/fetchData"
import { PATHS } from "../utilities/routeList"
import APIRoutes from "../utilities/APIRoutes"
import { loginUser } from "../utilities/fetchUser"
import { Link } from "react-router-dom"

const App = ()=>{

    const err = useActionError()
    const navigate = useNavigate()
    const [login, setLogin] = useLoginContext()

    useEffect(()=>{
        if(!('temp' in login) || !login.temp?.verified || !login.temp?.phone)
            navigate(PATHS.LOGIN)

    })

    return(
        <div className="col-lg-4 col-md-6 col-12 d-flex flex-column align-items-center justify-content-center">
            <div className="row mb-3">
                <div className="col-12">
                    <h2 className="mb-3">Almost there!</h2>
                    <img src="/progress.svg" alt="Almost complete" style={{width: '100%'}} />
                </div>
                <div className="col-3 text-start medium">
                    Start
                </div>
                <div className="col-3 text-center medium">
                    Enter Phone
                </div>
                <div className="col-3 text-center medium">
                    Verify OTP
                </div>
                <div className="col-3 text-end medium">
                    Finish
                </div>
            </div>
        <FormCard title='Register' subtitle='Please enter your details to register' error={err} method="POST">
            <Input name='First Name' type={'text'} inputName="first_name" />
            <Input name='Last Name' type={'text'} inputName="last_name" />
            <Input name='Email' type={'email'} inputName="email" />
            <Input name='Phone' type={'number'} maxLength={10} prepend={'+91'} inputName="username" defaultValue={String(login.temp?.phone)} readonly />
            <Check name={<> I agree to the <Link to={PATHS.TERMS}>Terms and Conditions</Link> </>} inputName="tnc" required invalidText='Please accept to continue' />
            <Button name='Submit' />
            <LinkFooter text="Already registered?" linkText="Login" href={PATHS.LOGIN} />
        </FormCard>
        </div>
    )
}

export const registerAction : (val : [LoginContextType, React.Dispatch<React.SetStateAction<LoginContextType>>]) => ActionFunction = (LoginContext ) => async({request, params}) : Promise<ActionErrorDataType | Response>=>{
    const data = await request.formData()
    const email = String(data.get('email'))

    const [mailCheck, mailMsg] = checkEmail(email)
    
    console.log()

    if (!mailCheck ){
        return {
            heading: 'Error',
            body: 'Please enter valid details',
            type: 'error',
            // @ts-ignore
            errors: [...mailMsg.errors]
        }
    }


    const {json, message, response} = await makeRequest(APIRoutes.CREATE, request, data)
    var m : string = json.phone || json.email || message
    m = String(m)
    m = m[0].toUpperCase() + m.slice(1)
    console.log(json)
    if (!response.ok) {
        return {
            heading: 'Error',
            body: m,
            type:'error',
        }
    }

    return loginUser(LoginContext[1])
}

export default App