import { Link, LoaderFunction, defer, redirect, useLoaderData, useNavigate } from "react-router-dom"
import { FormCard } from "../components/forms/formCard"
import { Button, LinkFooter } from "../components/forms/inputsControlled"
import Table from "../components/table/table"
import { TableItem } from "../components/table/tableItems"
import { fetchUserData } from "../utilities/fetchUser"
import { useEffect } from "react"
import { UserContextType, useLoginContext } from "../context/LoginContext"
import { PATHS } from "../utilities/routeList"
import { checkUserDetailsEntered } from "../utilities/LoginHelper"
import LoaderWrapper from "../components/loader/LoaderWrapper"

const App = ({data} : {data: UserContextType})=>{
    
    
    const [login, setLogin] = useLoginContext()
    const navigate = useNavigate()

    
    useEffect(()=>{
        if(data)
        {
            setLogin({
                login: true,
                user: data,
            })
            
            !checkUserDetailsEntered(login) && navigate(PATHS.REGISTER)
        }
        else
        navigate(PATHS.LOGIN)

    },[data])

    return(
        <div className='col-12 col-md-6 loading-content'>
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
    const user = fetchUserData()
    return defer({data: user})
}

const Main = ()=>LoaderWrapper(App)

export default Main