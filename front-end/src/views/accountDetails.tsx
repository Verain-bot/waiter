import { Link, LoaderFunction, redirect, useLoaderData } from "react-router-dom"
import { FormCard } from "../components/forms/formCard"
import { Button, LinkFooter } from "../components/forms/inputsControlled"
import Table from "../components/table/table"
import { TableItem } from "../components/table/tableItems"
import { fetchUserData } from "../utilities/fetchUser"
import { useEffect } from "react"
import { useLoginContext } from "../context/LoginContext"
import { PATHS } from "../utilities/routeList"

const App = ()=>{
    
    const data  = useLoaderData() as {name: string, phone: string, email:string}
    const [login, setLogin] = useLoginContext()
    
    useEffect(()=>{
        setLogin({
            login: true,
            user:{
                name: data?.name,
                phone: data?.phone,
                email: data?.email
            }
        })
    },[])

    return(
        <div className='col-12 col-md-6'>
            <FormCard title='Account' subtitle="View your account information here" >
                <TableItem width={4} left={<strong>Name</strong>} right={<span>{data?.name}</span>} nohr />
                <TableItem width={4} left={<strong>Phone</strong>} right={<span>+91 {data?.phone}</span>} nohr />
                <TableItem width={4} left={<strong>Email</strong>} right={<span>{data?.email}</span>} nohr />
                <Link to={PATHS.ACCOUNT_DETAILS_EDIT} className="btn btn-primary">Edit Information</Link>
                <LinkFooter text='*Your phone number cannot be modified.' linkText='' />
            </FormCard>
        </div>
    )
}

export const accountDetailsLoader : LoaderFunction= async ({params, request})=>{
    const {json, response, message } = await fetchUserData()

    if(response.ok)
        return json

    return redirect(PATHS.LOGIN)
}


export default App