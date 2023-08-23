import { ActionFunction, Link, redirect, useNavigate } from "react-router-dom"
import { FormCard } from "../components/forms/formCard"
import { Button, LinkFooter } from "../components/forms/inputsControlled"
import { Input } from "../components/forms/inputsUncontrolled"
import { LoginContextType, useLoginContext } from "../context/LoginContext"
import { ActionErrorDataType, useActionError } from "../hooks/useActionError"
import { makeRequest } from "../utilities/fetchData"
import { PATHS } from "../utilities/routeList"
import { checkEmail } from "../utilities/formChecks"

const App = ()=>{
    const err = useActionError()
    const [login, setLogin] = useLoginContext()
    
    return(
        <div className='col-12 col-md-6'>
            <FormCard title='Account' subtitle="Edit your account information" method="PATCH" error={err} >
                <Input name='Name' inputName="name" defaultValue={login.user?.name}  />
                <Input name='Email' inputName="email" defaultValue={login.user?.email} />
                <Button name='Save' />
                <div className="col-12">

                <Link className="btn btn-danger w-100" to={PATHS.ACCOUNT_DETAILS}>
                    Cancel
                </Link>
                </div>
                <LinkFooter text='*Your phone number cannot be modified.' linkText='' />
            </FormCard>
        </div>
    )
}

export const accountDetailsEditAction : ( val:[LoginContextType, React.Dispatch<React.SetStateAction<LoginContextType>>]) => ActionFunction= (LoginContext ) => async ({params, request }) : Promise<ActionErrorDataType | Response> => {

    const data = await request.formData()
    const email  = String(data.get('email'))
    const [chk, mailMsg] = checkEmail(email)

    if (!chk){
        return mailMsg
    }
    
    const {json, message, response} = await makeRequest('api/account/', request, data)

    if(!response.ok){
        return {
            heading: 'Error',
            body: message,
            type: 'error',
        }
    }
    
    return redirect(PATHS.ACCOUNT_DETAILS)
}



export default App