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
import { fetchUserData, loginUser } from "../utilities/fetchUser"
import { Link } from "react-router-dom"
import { checkUserDetailsEntered } from "../utilities/LoginHelper"

const App = ()=>{

    const err = useActionError()
    const navigate = useNavigate()
    const [login, setLogin] = useLoginContext()

    useEffect(()=>{
        checkUserDetailsEntered(login)&&navigate(PATHS.RESTAURANT_LIST)
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
        <FormCard title='Register' subtitle='Please enter your details to complete registration' error={err} method="PATCH">
            <Input name='First Name' type={'text'} inputName="first_name" defaultValue={login.user?.first_name} />
            <Input name='Last Name' type={'text'} inputName="last_name"  defaultValue={login.user?.last_name} />
            <Input name='Email' type={'email'} inputName="email" defaultValue={login.user?.email} />
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
    const [login,setLogin] = LoginContext
    const [mailCheck, mailMsg] = checkEmail(email)

    if (!mailCheck ){
        return {
            heading: 'Error',
            body: 'Please enter valid details',
            type: 'error',
            // @ts-ignore
            errors: [...mailMsg.errors]
        }
    }


    const {json, message, response} = await makeRequest(APIRoutes.ACCOUNT_VIEW_UPDATE, request, data)
    if (!response.ok) {
        var m : string = json.phone || json.email || message
        m = String(m)
        m = m[0].toUpperCase() + m.slice(1)
            return {
                heading: 'Error',
                body: m,
                type:'error',
            }
    }

    setLogin(prev=>{
        return {
            ...prev,
            user: {
                username: prev.user?.username || 'xxxxxxxxxx',
                first_name: String(data.get('first_name')) ,
                last_name: String(data.get('last_name')) ,
                email: String(data.get('email')) ,
            }
        }
    
    })

    return redirect(PATHS.RESTAURANT_LIST)
}

export default App