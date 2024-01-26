import { UserContextType } from "../context/LoginContext";
import APIRoutes from "./APIRoutes";
import { makeRequest } from "./fetchData"
import { PATHS } from "./routeList";
import { LoginContextType } from "../context/LoginContext";
import { redirect } from "react-router-dom";
import { ActionErrorDataType } from "../hooks/useActionError";
import {sendPushToken} from "./firebase";

export const fetchUserData = async () : Promise<null | UserContextType> => {

    const request = new Request(APIRoutes.ACCOUNT_VIEW_UPDATE, {
        method: 'GET',
    })
    let req
    try {
        req = await makeRequest(APIRoutes.ACCOUNT_VIEW_UPDATE, request, new FormData())        
    } catch (error) {
        return null
    }
    
    if (req.response.ok) {
        const jsonData = await req.json as UserContextType & {token: string}
        sendPushToken(jsonData.token)

        return jsonData as UserContextType
    }

    return null
}


export const loginUser = async (setLogin : React.Dispatch<React.SetStateAction<LoginContextType>>) =>{
    const req = new Request(APIRoutes.LOGIN, {
        method: 'POST',
    })
    const a = await makeRequest(APIRoutes.LOGIN, req, new FormData())
    if(!a.response.ok){
        return {
            heading:'Error',
            body:a.message,
            type:'error',
        } as ActionErrorDataType
    }
    const x = await fetchUserData()
    if(x)
    {
        setLogin({login: true, user: x})
        return redirect(PATHS.RESTAURANT_LIST)
    }
    else{
        throw new Response('Something went wrong', {status: 500, statusText: 'Internal Server Error'})
    }
}