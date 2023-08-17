import { useEffect, useState } from "react"
import { FormCard } from "../components/forms/formCard"
import { IntegerInput, Button, LinkFooter } from "../components/forms/inputsControlled"

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
        <FormCard title='Verify Phone' subtitle='Please enter the OTP sent to your phone'>
            <IntegerInput name='OTP' value={otp} set={setOtp} type={'number'} maxlen={4} />
            <Button name='Submit' disabled={disabled} onClick={()=>{}} />
            <LinkFooter text="Didn't recieve OTP?" linkText="Resend OTP" />
        </FormCard>
        </div>
    )
}

export default App