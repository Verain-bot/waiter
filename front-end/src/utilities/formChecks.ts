import { ActionErrorDataType } from "../hooks/useActionError"

export const checkEmail = (email : string) : [boolean, ActionErrorDataType ] =>{
    const errObj : ActionErrorDataType = {
        heading:'Invalid Email',
        body:'Please enter a valid email address',
        type:'error',
        errors:['Please enter a valid email address']
    }

    const notErr : ActionErrorDataType = {
        heading:'',
        body:'',
        type:'success',
        errors:[]
    }

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const r = regex.test(email)
    return [r, r? notErr : errObj]
}

export const checkPhone = (phone : string | number) : [boolean, ActionErrorDataType ] =>{
    const errObj : ActionErrorDataType =  {
        heading:'Invalid Phone Number',
        body:'Please enter a valid phone number',
        type:'error',
        errors:['Please enter a valid phone number']
    }

    const notErr : ActionErrorDataType = {
        heading:'',
        body:'',
        type:'success',
        errors:[]
    }

    return [true, notErr]

    const regex = new RegExp('^[0-9]{10}$')
    const r = regex.test(String(phone))
    return [r, r? notErr : errObj]
}