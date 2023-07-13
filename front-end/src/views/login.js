import React, { useContext, useEffect,useState} from 'react';
import { FormCard } from './components/forms/formCard';
import { Check, Button, IntegerInput, LinkFooter } from './components/forms/inputs';
import { MessageContext } from '../App';
const App = () => {

    const [phone, setPhone] = useState('')
    const [disabled, setDisabled] = useState(true)

    const [message, setMessage] = useContext(MessageContext)

    useEffect(() => {
        if (phone.length === 10) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    },[phone])

    const verify =(e)=>{
        e.preventDefault()
        //regex for phone number

        const regex = new RegExp('^[0-9]{10}$')
        if (!regex.test(phone)){
            setMessage({'heading':'Invalid Phone Number',
            'body':'Please enter a valid phone number',
            'type':'error'
        })
        }
        return false
    }

    return (
        
        <div class="col-lg-4 col-md-6 col-12 d-flex flex-column align-items-center justify-content-center" style={{'height':'80vh'}}>
        <FormCard title='Login' subtitle='Please enter your phone for verification' submitText='Submit'>
            <IntegerInput name='Phone' value={phone} set={setPhone} type={'number'} prepend={'+91'} maxlen={10} />
            <Check name='Remember me' />
            <Button name='Login' disabled={disabled} onClick={verify} />
            <LinkFooter text="Don't have an account?" linkText="Register" />
        </FormCard> 
        </div>
        
        
    );
    }

export default App;