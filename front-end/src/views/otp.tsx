import { FormCard } from "../components/forms/formCard"
import { Button, LinkFooter } from "../components/forms/inputsControlled"
import { Input } from "../components/forms/inputsUncontrolled"
import { ActionFunction, redirect, useNavigate } from "react-router-dom"
import { ActionErrorDataType, useActionError } from "../hooks/useActionError"
import { makeRequest } from "../utilities/fetchData"
import { LoginContextType, LoginTempDataType, useLoginContext } from "../context/LoginContext"
import { fetchUserData, loginUser } from "../utilities/fetchUser"
import { PATHS } from "../utilities/routeList"
import APIRoutes from "../utilities/APIRoutes"
import { useEffect, useState } from "react"

const App = ()=>{ 
    const error = useActionError()
    const navigate = useNavigate()
    const [login, setLogin] = useLoginContext()
    const [valid, setValid] = useState<number>(0)
    useEffect(()=>{
        if(!('temp' in login))
            navigate(PATHS.LOGIN)

        if (login.temp && login.temp.isOTPCorrect){
            setValid(login.temp.isOTPCorrect)
        }
        
        console.log(login.temp)
    }, [error])
    

    return(
        <div className="col-lg-4 col-md-6 col-12 d-flex flex-column align-items-center justify-content-center view" >
        <FormCard title='Verify Phone' subtitle={`Please enter the OTP sent to +91 ${login.temp?.phone}`} method="POST" error={error} action={'/otp'} noStyle>
            <Input name='OTP' type={'number'} maxLength={4} inputName="otp" valid={valid} />
            <Button name='Submit' />
            <LinkFooter text="Didn't recieve OTP?" linkText="Resend OTP" href={PATHS.LOGIN} />
        </FormCard>
        </div>
    )
}

export const otpAction : (val : [LoginContextType, React.Dispatch<React.SetStateAction<LoginContextType>>]) => ActionFunction = (LoginContext ) => async({request, params}) : Promise<ActionErrorDataType | Response>=>{
    const data= await request.formData()
    
    const [login, setLogin] = LoginContext
    
    const otp = String(data.get('otp'))
    console.log(otp.length)
    if (otp.length !== 6) {
        return{
            heading:'Invalid OTP',
            body:'Please enter a valid OTP',
            type:'error',
            errors:['OTP will be 6 digits long']
        }
    }

    const {json, message, response} = await makeRequest(APIRoutes.ENTER_OTP, request, data)

    if (!response.ok) {
        setLogin((prev)=>({
            ...prev,
            temp:{
                ...prev.temp as LoginTempDataType,
                verified: false,
                isOTPCorrect: -1
            }
        }))
        return {
            heading:'Invalid OTP',
            body:message,
            type:'error',
        }
    }

    console.log(json)

    if(json.existingUser){
        return loginUser(setLogin)
    }

    setLogin((prev)=>({
        ...prev,
        temp:{
            ...prev.temp as LoginTempDataType,
            verified: true,
            isOTPCorrect: 1
        }
    }))

    return redirect(PATHS.REGISTER)
}

export default App