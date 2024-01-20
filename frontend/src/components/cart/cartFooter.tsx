import { ActionFunction, Form, Link, redirect, useNavigate } from "react-router-dom"
import { CartItemType, useCartContext } from "../../context/CartContext"
import { FormCard } from "../forms/formCard"
import { LoginContextType, useLoginContext } from "../../context/LoginContext"
import { ActionErrorDataType } from "../../hooks/useActionError"
import APIRoutes, { makeURL } from "../../utilities/APIRoutes"
import { makeRequest } from "../../utilities/fetchData"
import { PATHS } from "../../utilities/routeList"
import useRazorpay from "react-razorpay"
import { useActionData } from "react-router-dom"
import { useEffect } from "react"
import { payUsingRazorPay } from "../../utilities/payRZP"
import { RazorpayInitiateResponse } from "../orders/paymentBar"

type CartFooterProps = {}

export const CartFooter = (props : CartFooterProps) =>{
    const [Razorpay] = useRazorpay()
    const actionData = useActionData() as RazorpayInitiateResponse
    const [user, setUser] = useLoginContext()
    const navigate = useNavigate()

    const onPay = (response: Object)=>{
        navigate(makeURL(PATHS.ORDER_CREATED_SUCCESS, {'orderID': actionData.orderID}),
        {
            state:{
                ...response
            }
        })
        
    }

    useEffect(()=>{
        if (actionData){
            const RZP_orderID = actionData.RZP_Order_ID
            payUsingRazorPay(RZP_orderID, Razorpay, onPay, user.user)
        }
    })

    const [cart, dispatch] = useCartContext()
    const url = `/restaurant/${cart[0].restaurantID}/menu`
    
    return(
        <div className='sticky-bottom d-flex flex-row '>
            <button className='btn btn-dark col-6'>
                <Link to={url} style={{color: "inherit"}}>
                    <strong>
                        Menu
                    </strong>
                </Link>
            </button>

            <Form className="col-6" method="POST" >
                <button className='btn btn-danger w-100'>
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

    if(!response.ok){
        localStorage.setItem('cart', '[]')
        return {
            heading: "Something went wrong",
            body: message,
            type: "error"
        }
    }

    return {...x.json, orderID: json.orderID}
}