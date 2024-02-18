import { ActionFunction, Form, Link, redirect, useNavigate, useNavigation } from "react-router-dom"
import { CartItemType, useCartContext } from "../../context/CartContext"
import { FormCard } from "../forms/formCard"
import { LoginContextType, useLoginContext } from "../../context/LoginContext"
import { ActionErrorDataType, useActionError } from "../../hooks/useActionError"
import APIRoutes, { makeURL } from "../../utilities/APIRoutes"
import { makeRequest } from "../../utilities/fetchData"
import { PATHS } from "../../utilities/routeList"
import useRazorpay from "react-razorpay"
import { useActionData } from "react-router-dom"
import { useEffect, useState } from "react"
import { payUsingRazorPay } from "../../utilities/payRZP"
import { RazorpayInitiateResponse } from "../orders/paymentBar"

type CartFooterProps = {}

export const CartFooter = (props : CartFooterProps) =>{
    const [Razorpay] = useRazorpay()
    const err = useActionError()
    const actionData = useActionData() as (RazorpayInitiateResponse | null)
    const [user, setUser] = useLoginContext()
    const navigate = useNavigate()
    const navigation = useNavigation()
    const disabled =  !(navigation.state=='idle')
    //actionData?.loading ||

    const onPay = (response: Object)=>{
        if (actionData)
        navigate(makeURL(PATHS.ORDER_CREATED_SUCCESS, {'orderID': actionData.orderID}),
        {
            state:{
                ...response
            }
        })
        
    }

    const makePayment = ()=>{
        if (actionData && err.length == 0){
            const RZP_orderID = actionData.RZP_Order_ID
            payUsingRazorPay(RZP_orderID, Razorpay, onPay, user.user)
        }
    }

    useEffect(()=>{
        makePayment()
    },[actionData])

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (actionData){
            makePayment()
            e.preventDefault()
        }
    }

    const [cart, dispatch] = useCartContext()
    const url = makeURL(PATHS.MENU, {restaurantID: cart[0].restaurantID})
    
    return(
        <div className='sticky-bottom d-flex flex-row ' style={{zIndex: 900}}>
                <Link to={url} className='btn btn-dark col-6 text-light' style={{color: "inherit"}}>
                    <strong>
                        Menu
                    </strong>
                </Link>

            <Form className="col-6" method="POST" >
                <button className='btn btn-danger w-100' disabled={disabled} onClick={handleClick}>
                {navigation.state != 'idle' && <span className="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span>}
                    <strong>
                        Checkout
                    </strong>
                </button>
            </Form>

        </div>
    )
}

export const cartFooterAction : ( val:[LoginContextType, React.Dispatch<React.SetStateAction<LoginContextType>>]) => ActionFunction= (LoginContext ) => async ({params, request }) : Promise<ActionErrorDataType | Response> => {

    const r = localStorage.getItem('cart')
    if (!r){
        return null
    }
    const cart = JSON.parse(r) as CartItemType[]


    const fd = new FormData()
    fd.append('cart', r)
    fd.append('restaurantID', cart[0].restaurantID.toString())

    const {json, response, message} = await makeRequest(APIRoutes.ORDER_CREATE,request, fd )

    const requestForPayment = new Request(APIRoutes.PHONE_PE_INITITATE,{
        method: 'POST',
    })

    const fd2 = new FormData()
    fd2.append('order_id', json.orderID)

    const x = await makeRequest(APIRoutes.RAZORPAY_INITIATE,requestForPayment, fd2)

    if(!x.response.ok){
        localStorage.setItem('cart', '[]')
        return {
            heading: "Something went wrong",
            body: x.message,
            type: "error",
            errors: [x.message]
        }
    }

    return {...x.json, orderID: json.orderID}
}