import React from 'react'
import { useLoginContext } from '../../context/LoginContext'
import { makeRequest } from '../../utilities/fetchData'
import { useNavigate } from 'react-router-dom'
import { PATHS } from '../../utilities/routeList'
import APIRoutes from '../../utilities/APIRoutes'
import { useMessageContext } from '../../context/MessageContext'

type LogoutButtonProps = {
    className: string
    children: React.ReactNode
}

export const LogoutButton = (props: LogoutButtonProps ) => {
    const [login, setLogin] = useLoginContext()
    const navigate = useNavigate()
    const [msg, setMsg]  = useMessageContext()

    const logout = async ()=>{
        const request = new Request(APIRoutes.LOGOUT, {
            method: 'GET',
        })

        const data = new FormData()
        let r
        try{
            r = await makeRequest(APIRoutes.LOGOUT, request, data)
        }
        catch(error){
            setMsg({heading:'Error', body:'Something went wrong', type:'error'})
            return
        }

        const {json, message, response} = r

        if (response.ok) {
            setLogin({login: false, user: null})
            navigate(PATHS.LOGIN)
        }

        else{
            
            setMsg({heading:'Error', body:message, type:'error'})
        }
        
    }

    return (
        <a className={props.className + ' pointer'} onClick={logout} >
            {props.children}
        </a>
    )
    }

export default LogoutButton