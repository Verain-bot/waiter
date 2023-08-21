import { useEffect, useState } from "react"
import { FormCard } from "../components/forms/formCard"
import { Button, LinkFooter } from "../components/forms/inputsControlled"
import { Input } from "../components/forms/inputsUncontrolled"
import { ActionFunction } from "react-router-dom"
import { ActionErrorDataType, useActionError } from "../hooks/useActionError"
import { makeRequest } from "../utilities/fetchData"
import { LoginContextType } from "../context/LoginContext"
import { fetchUserData } from "../utilities/fetchUser"

const App = ()=>{
    const error = useActionError()

    return(
        <div className="col-lg-4 col-md-6 col-12 d-flex flex-column align-items-center justify-content-center" style={{'height':'80vh'}}>
        <FormCard title='Verify Phone' subtitle='Please enter the OTP sent to your phone' method="POST" error={error} action={'/otp'}>
            <Input name='OTP' type={'number'} maxLength={4} inputName="otp" />
            <Button name='Submit' />
            <LinkFooter text="Didn't recieve OTP?" linkText="Resend OTP" />
        </FormCard>
        </div>
    )
}

export const otpAction : (val : [LoginContextType, React.Dispatch<React.SetStateAction<LoginContextType>>]) => ActionFunction = (LoginContext ) => async({request, params}) : Promise<ActionErrorDataType | Response>=>{
    const data= await request.formData()
    
    const [login, setLogin] = LoginContext
    
    const otp = String(data.get('otp'))
    console.log(otp.length)
    if (otp.length !== 4) {
        return{
            heading:'Invalid OTP',
            body:'Please enter a valid OTP',
            type:'error',
            errors:['OTP will be 4 digits long']
        }
    }

    console.log('req', request)

    const {json, message, response} = await makeRequest('api/otp/', request, data)

    if (!response.ok) {
        return {
            heading:'Invalid OTP',
            body:message,
            type:'error',
        }
    }


    const x = await fetchUserData()
    
    if(x.response.ok)
        setLogin({login: true, user: {
            name: x.json.name,
            email: x.json.email,
            phone: x.json.phone
        }})
    
    
    return null
}

export default App