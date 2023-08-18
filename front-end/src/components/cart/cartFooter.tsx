import { Link } from "react-router-dom"
import { useCartContext } from "../../context/CartContext"

type CartFooterProps = {}

export const CartFooter = (props : CartFooterProps) =>{

    const [cart, dispatch] = useCartContext()
    const url = `/restaurant/${cart[0].restaurantID}/menu`
    
    return(
        <div className='row sticky-bottom d-flex flex-row'>
            <button className='btn btn-dark col-6'>
                <Link to={url} style={{color: "inherit"}}>
                    <strong>
                        Menu
                    </strong>
                </Link>
            </button>

            <button className='btn btn-danger col-6'>
                <strong>
                    Checkout
                </strong>
            </button>

        </div>
    )
}