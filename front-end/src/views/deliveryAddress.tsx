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
            <FormCard title='Table' subtitle='Please enter the table number' method="POST">
                <Input name='Table' inputName="addr" type="text" />
                <Button name='Save'/>
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