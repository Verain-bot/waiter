import { FormCard } from "../components/forms/formCard"
import { Input } from "../components/forms/inputsUncontrolled"
import {Button} from '../components/forms/inputsControlled'
import { LoginContextType } from "../context/LoginContext"
import { ActionFunction, redirect } from "react-router-dom"
import { ActionErrorDataType } from "../hooks/useActionError"
import { PATHS } from "../utilities/routeList"

const App = ()=>{
    return(
        <div className='col-12 col-md-6'>
            <FormCard title='Address' subtitle='Please enter the delivery address' method="POST">
                <Input name='Address' inputName="addr" />
                <Button name='Save' onClick={()=>{}} />
            </FormCard>
        </div>
    )
}

export const addressChangeAction : ( val:[LoginContextType, React.Dispatch<React.SetStateAction<LoginContextType>>]) => ActionFunction= (LoginContext ) => async ({params, request }) : Promise<ActionErrorDataType | Response> => {
    const data = await request.formData()
    const a = data.get('addr')
    localStorage.setItem('address', String(a))
    return redirect(PATHS.CART)
}

export default App