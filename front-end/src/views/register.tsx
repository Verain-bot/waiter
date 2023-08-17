import { useEffect, useState } from "react"
import { FormCard } from "../components/forms/formCard"
import { IntegerInput, Button, LinkFooter, TextInput } from "../components/forms/inputsControlled"
import { Check } from "../components/forms/inputsUncontrolled"

const App = ()=>{

    const [otp, setOtp] = useState<string>('')
    const [disabled, setDisabled] = useState<boolean>(true)

    useEffect(()=>{
        if (otp.length === 4) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    },[otp])

    return(
        <div className="col-lg-4 col-md-6 col-12 d-flex flex-column align-items-center justify-content-center" style={{'height':'80vh'}}>
        <FormCard title='Register' subtitle='Please enter your details to register'>
            <TextInput name='First Name' value={otp} set={setOtp} type={'text'} />
            <TextInput name='Last Name' value={otp} set={setOtp} type={'text'} />
            <IntegerInput name='Phone' value={otp} set={setOtp} type={'number'} maxlen={10} prepend={'+91'} />
            <Check name='I agree to the Terms and Conditions' inputName="tnc" />
            <Button name='Submit' disabled={disabled} onClick={()=>{}} />
            <LinkFooter text="Already registered?" linkText="Login" />
        </FormCard>
        </div>
    )
}

export default App