import React, { useContext, useEffect,useState} from 'react';

import { Header } from './components/header/header';
import { FormCard } from './components/forms/formCard';
import { Check, TextInput, Button, IntegerInput } from './components/forms/inputs';
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

    const Inputs = [
        <IntegerInput name='Phone' value={phone} set={setPhone} type={'number'} />,
        <Check name='Remember me' />,
        <Button name='Login' disabled={disabled} onClick={verify} />
    ]

    return (
        <>
            
            <FormCard title='Login' subtitle='Please enter your phone for verification' submitText='Submit' inputs={Inputs} />
            
        </>
        
    );
    }

export default App;