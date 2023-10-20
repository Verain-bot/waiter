import React, { ChangeEvent, FormEvent, useContext, useEffect,useState} from 'react';
import { FormCard } from '../components/forms/formCard';
import {  Button, IntegerInput, LinkFooter } from '../components/forms/inputsControlled';
import { Check, Input } from '../components/forms/inputsUncontrolled';
import { useMessageContext } from '../context/MessageContext';
import { ActionFunction, Form, RedirectFunction, redirect, useParams } from 'react-router-dom';
import { ActionErrorDataType, useActionError } from '../hooks/useActionError';
import { makeRequest } from '../utilities/fetchData';
import { LoginContextType } from '../context/LoginContext';
import { PATHS } from '../utilities/routeList';
import { checkPhone } from '../utilities/formChecks';
import APIRoutes from '../utilities/APIRoutes';

const App = () => {
    const err = useActionError()

    return (
        
        <div className="col-lg-4 col-md-6 col-12 d-flex flex-column align-items-center justify-content-center" style={{'height':'80vh'}}>
        <FormCard title='Enter Phone' subtitle='Please enter your phone for verification' method='POST' error={err} >

                <Input name='Phone'  type={'number'} prepend={'+91'} maxLength={10} inputName='phone' />
                <Check name='Remember me' inputName='remember'  />
                <Button name='Login'  />
                
        </FormCard> 
        </div>
        
        
    );
    }

export const loginAction : ( val:[LoginContextType, React.Dispatch<React.SetStateAction<LoginContextType>>]) => ActionFunction= (LoginContext ) => async ({params, request }) : Promise<ActionErrorDataType | Response> => {

    const data = await request.formData()
    const phone  = String(data.get('phone'))
    const [chk, phMsg] = checkPhone(phone)
    const [login, setLogin] = LoginContext
    

    if (!chk){
        return phMsg
    }
    
    const {json, message, response} = await makeRequest(APIRoutes.SEND_OTP, request, data)

    if(!response.ok){
        return {
            heading: 'Error',
            body: message,
            type: 'error',
        }
    }

    setLogin((prev)=>{
        return{
            ...prev,
            temp: {
                phone: parseInt(phone),
                verified: false
            }
        }
    })

    return redirect(PATHS.OTP)
}

export default App;