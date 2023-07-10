import { Header } from "./components/header/header"
import { CartItem, CartTotal } from "./components/cart/cartItem"
import { useContext } from "react"
import { RatingsContext } from "../App"

const App = ()=>{

    const [data, setData] = useContext(RatingsContext)

    const review = ()=>{
        setData({...data,canRate:true, title: 'Rate order'})
    }

    return(
    <>
    <Header />
    <div class='col-12 col-md-6'>
        <div class='row card shadow p-2'>
            <h2 class='card-title mb-0 pb-1'>Order Details</h2>
            <h6 class='card-subtitle mb-4'>#1232123212321</h6>

            <div class='list-group list-group-flush'>
                <CartItem name='Pizza' price='231' fixed/>
                <CartItem name='Pizza' price='231' fixed/>
                <CartItem name='Pizza' price='231' fixed/>
                <CartItem name='Pizza' price='231' fixed/>
                <CartItem name='Pizza' price='231' fixed/>
                <CartTotal />
            </div>

        </div>

        <div class='row card shadow p-2 d-flex flex-row align-items-center'>
            <div class='col-6'>
                <h2 class='card-title p-1 mb-0'>Order status</h2>
            </div>
            <div class='col-6 text-end'>
                <strong class='text-danger pt-0 mt-0' >Delivered</strong>
                
            </div>
        </div>


        <div class='row card shadow p-1 pb-3 pointer' onClick={review}>
            <h2 class='card-title mb-0 pb-2'>Rate order</h2>
            <h7 class='card-subtitle mb-0 pb-1'>Click here to provide feedback</h7>
        </div>
    </div>
    </>
    )
}

export default App