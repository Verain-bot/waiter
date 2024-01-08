import { ActionFunction, Form, Link, redirect } from "react-router-dom"
import { CartItemType, useCartContext } from "../../context/CartContext"
import { FormCard } from "../forms/formCard"
import { LoginContextType } from "../../context/LoginContext"
import { ActionErrorDataType } from "../../hooks/useActionError"
import APIRoutes, { makeURL } from "../../utilities/APIRoutes"
import { makeRequest } from "../../utilities/fetchData"
import { PATHS } from "../../utilities/routeList"

type CartFooterProps = {}

export const CartFooter = (props : CartFooterProps) =>{

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
    const windowReference = window.open();
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

    const x = await makeRequest(APIRoutes.PHONE_PE_INITITATE,requestForPayment, fd2)

    windowReference?.location.assign(x.json.url)

    if(!response.ok){
        localStorage.setItem('cart', '[]')
        return {
            heading: "Something went wrong",
            body: message,
            type: "error"
        }
    }
    return redirect(makeURL(PATHS.ORDER_CREATED_SUCCESS, {'orderID': json.orderID}))
}