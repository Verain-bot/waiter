import React, { useEffect,useState} from 'react';

import { Header } from './components/header/header';
import { FormCard } from './components/forms/formCard';
import { Check, TextInput, Button } from './components/forms/inputs';

const App = () => {

    const [phone, setPhone] = useState('')
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        if (phone.length === 10) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    },[phone])

    const Inputs = [
        <TextInput name='Phone' value={phone} set={setPhone} type={'number'} />,
        <Check />,
        <Button name='Login' disabled={disabled} onClick={()=>alert('as')} />
    ]

    return (
        <>
            <Header />
            <FormCard title='Login' subtitle='Please enter your phone for verification' submitText='Submit' inputs={Inputs} />
            
        </>
        
    );
    }

export default App;