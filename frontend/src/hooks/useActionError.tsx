import { useEffect } from "react"
import { RedirectFunction, useActionData } from "react-router-dom"
import { useMessageContext } from "../context/MessageContext"

export type ActionErrorDataType = undefined | null | {
    heading: string,
    body: string,
    type: 'error' | 'success' | 'warning' | 'info',
    errors?: string[],
}

export const useActionError  = ()=>{
    
    const data = useActionData() as ActionErrorDataType

    const [message, setMessage] = useMessageContext()


    useEffect(()=>{
        if (data && data.type === 'error'){
            setMessage({
                heading: data.heading,
                body: data.body,
                type: data.type
            })        
        }
    },[data])

    const errors = data?.errors || []

    return errors
}