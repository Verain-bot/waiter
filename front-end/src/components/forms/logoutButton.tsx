import React from 'react'
import { useLoginContext } from '../../context/LoginContext'
import { makeRequest } from '../../utilities/fetchData'
import { useNavigate } from 'react-router-dom'
import { PATHS } from '../../utilities/routeList'

type LogoutButtonProps = {
    className: string
    children: React.ReactNode
}

export const LogoutButton = (props: LogoutButtonProps ) => {
    const [login, setLogin] = useLoginContext()
    const navigate = useNavigate()

    const logout = async ()=>{
        const request = new Request('api/login/', {
            method: 'POST',
        })

        const data = new FormData()

        data.append('logout', 'true')

        const {json, message, response} = await makeRequest('api/login/', request, data)

        if (response.ok) {
            setLogin({login: false, user: null})
            navigate(PATHS.LOGIN)
        }

        else{
            console.log(message)
        }
        console.log(json)
    }

    return (
        <a className={props.className + ' pointer'} onClick={logout} >
            {props.children}
        </a>
    )
    }

export default LogoutButton