import { Link } from "react-router-dom"
import { PATHS } from "../../utilities/routeList"
import { useCartContext } from "../../context/CartContext"
import { getCartQuantity } from "../../utilities/getCartQuantity"
import { useLoginContext } from "../../context/LoginContext"

const App = ()=>{
    const cart = useCartContext()[0]
    const login = useLoginContext()[0]
    const qty = getCartQuantity(cart)
    if(login.login)
    return (
        <li className="nav-item d-block d-lg-none">
        <Link to={PATHS.CART} className="nav-link nav-icon search-bar-toggle" >
            <i className="bi bi-bag"></i>
            {qty > 0 && (
                <div className="cart-badge">{qty}</div>
            )}
        </Link>
    </li>
    )
    return(
        <></>
    )
}

export default App