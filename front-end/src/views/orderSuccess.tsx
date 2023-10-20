import { useEffect } from "react"
import { useNavigate, useNavigation, useParams, useSearchParams } from "react-router-dom"
import APIRoutes, { makeURL } from "../utilities/APIRoutes"
import { PATHS } from "../utilities/routeList"
import { CartActions, useCartContext } from "../context/CartContext"

const App = ()=>{

    const {orderID} = useParams()
    const navigate = useNavigate()
    const [cart, dispatch] = useCartContext()

    useEffect(()=>{
        
        dispatch({
            type: CartActions.CLEAR
        })

        const t = setTimeout(()=>{
            navigate(makeURL(PATHS.ORDER_DETAIL, {'orderID': String(orderID)}))
        },5000  )

        return()=>{
            clearTimeout(t)
        }
    },[])

    return(
            <div className='col-md-6 col-12 d-flex align-items-center justify-content-center flex-column' style={{paddingTop: '170px'}}>
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