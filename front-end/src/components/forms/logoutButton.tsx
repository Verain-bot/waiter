import React from 'react'
import { useLoginContext } from '../../context/LoginContext'
import { makeRequest } from '../../utilities/fetchData'

type LogoutButtonProps = {
    className: string
    children: React.ReactNode
}

export const LogoutButton = (props: LogoutButtonProps ) => {
    const [login, setLogin] = useLoginContext()

    const logout = async ()=>{
        const request = new Request('api/login/', {
            method: 'POST',
        })

        const data = new FormData()

        data.append('logout', 'true')

        const {json, message, response} = await makeRequest('api/login/', request, data)

        if (response.ok) {
            setLogin({login: false, user: null})
        }

        else{
            console.log(message)
        }
        console.log(json)
    }

    return (
        <a className={props.className} onClick={logout} >
            {props.children}
        </a>
    )
    }

export default LogoutButton