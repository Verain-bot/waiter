import { useEffect, useState } from "react"
import { FormCard } from "./components/forms/formCard"
import { IntegerInput, Button, LinkFooter, TextInput, Check } from "./components/forms/inputs"

const App = ()=>{

    const [otp, setOtp] = useState('')
    const [disabled, setDisabled] = useState(true)


    useEffect(()=>{
        if (otp.length === 4) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    },[otp])

    return(
        <div class="col-lg-4 col-md-6 col-12 d-flex flex-column align-items-center justify-content-center" style={{'height':'80vh'}}>
        <FormCard title='Register' subtitle='Please enter your details to register'>
            <TextInput name='First Name' value={otp} set={setOtp} type={'text'} />
            <TextInput name='Last Name' value={otp} set={setOtp} type={'text'} />
            <IntegerInput name='Phone' value={otp} set={setOtp} type={'number'} maxlen={10} prepend={'+91'} />
            <Check name='I agree to the Terms and Conditions' />
            <Button name='Submit' disabled={disabled} onClick={()=>{}} />
            <LinkFooter text="Already registered?" linkText="Login" />
        </FormCard>
        </div>
    )
}

export default App