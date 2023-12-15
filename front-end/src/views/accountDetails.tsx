import { Link, LoaderFunction, redirect, useLoaderData } from "react-router-dom"
import { FormCard } from "../components/forms/formCard"
import { Button, LinkFooter } from "../components/forms/inputsControlled"
import Table from "../components/table/table"
import { TableItem } from "../components/table/tableItems"
import { fetchUserData } from "../utilities/fetchUser"
import { useEffect } from "react"
import { UserContextType, useLoginContext } from "../context/LoginContext"
import { PATHS } from "../utilities/routeList"

const App = ()=>{
    
    const data  = useLoaderData() as UserContextType
    const [login, setLogin] = useLoginContext()
    
    useEffect(()=>{
        setLogin({
            login: true,
            user: data,
        })
    },[])

    return(
        <div className='col-12 col-md-6 view'>
            <FormCard title='Account' subtitle="View your account information here" >
                <TableItem width={4} left={<strong>First Name</strong>} right={<span>{data?.first_name}</span>} nohr />
                <TableItem width={4} left={<strong>Last Name</strong>} right={<span>{data?.last_name}</span>} nohr />
                <TableItem width={4} left={<strong>Phone</strong>} right={<span>+91 {data?.username}</span>} nohr />
                <TableItem width={4} left={<strong>Email</strong>} right={<span>{data?.email}</span>} nohr />
                <Link to={PATHS.ACCOUNT_DETAILS_EDIT} className="btn btn-primary">Edit Information</Link>
                <LinkFooter text='*Your phone number cannot be modified.' linkText='' />
            </FormCard>
        </div>
    )
}

export const accountDetailsLoader : LoaderFunction= async ({params, request})=>{
    const user = await fetchUserData()

    if(user)
        return user

    return redirect(PATHS.LOGIN)
}


export default App