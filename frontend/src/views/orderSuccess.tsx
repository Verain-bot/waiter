import { useEffect } from "react"
import { useLocation, useNavigate, useNavigation, useParams, useSearchParams } from "react-router-dom"
import APIRoutes, { makeURL } from "../utilities/APIRoutes"
import { PATHS } from "../utilities/routeList"
import { CartActions, useCartContext } from "../context/CartContext"
import { makeRequest } from "../utilities/fetchData"

const App = ()=>{

    const {orderID} = useParams()
    const navigate = useNavigate()
    const [cart, dispatch] = useCartContext()

    const loc = useLocation()

    const confirmPayment = async ()=>{
        const response = loc.state as Object
        const req = new Request(APIRoutes.RAZORPAY_CALLBACK,{method:"POST"})
        const fd = new FormData()

        for (const [key, value] of Object.entries(response)) {
            fd.append(key, String(value))
        }

        await makeRequest(APIRoutes.RAZORPAY_CALLBACK,req, fd)
        navigate(makeURL(PATHS.ORDER_DETAIL, {'orderID': String(orderID)}))
    }

    useEffect(()=>{
        
        dispatch({
            type: CartActions.CLEAR
        })

        //check payment status

        
        confirmPayment()
        

        // const t = setTimeout(()=>{
        //     navigate(makeURL(PATHS.ORDER_DETAIL, {'orderID': String(orderID)}))
        // },5000  )

        // return()=>{
        //     clearTimeout(t)
        // }
    },[])

    return(
            <div className='col-md-6 col-12 d-flex align-items-center justify-content-center flex-column' style={{paddingBottom: 200}}>
                <i className="bi bi-check-circle text-success" style={{fontSize: '100px'}}></i>
                <h1 className="text-success">
                    <strong>
                        Order Placed
                    </strong>
                </h1>
                <span className="text-center text-sucess-emphasis">
                    Your Order #{orderID} has been placed successfully. You will be redirected to the order page.
                </span>
            </div>
    )
}



export default App