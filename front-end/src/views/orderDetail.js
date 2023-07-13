import { CartItem, CartTotalItem } from "./components/cart/cartItem"
import { useContext, useEffect } from "react"
import { RatingsContext } from "../App"
import { Table } from "./components/table/table"
import { TableItem } from "./components/table/tableItems"

const App = ()=>{

    const [data, setData] = useContext(RatingsContext)

    const review = ()=>{
        setData({...data,canRate:true, title: 'Rate order'})
    }


    return(
    <>
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
                <div class='list-group-item'>

                <CartTotalItem name='Cart total' amount='123' />
                <CartTotalItem name='Cart total' amount='123' small />
                <CartTotalItem name='Cart total' amount='123' strong />
                </div>
            </div>

        </div>

        <Table title='Order Status' >
            <TableItem right={<strong class='text-success'> Delivered</strong>} left='Status' width={7} />
        </Table>


        <div class='row card shadow p-1 pb-3 pointer' onClick={review}>
            <h2 class='card-title mb-0 pb-2'>Rate order</h2>
            <h7 class='card-subtitle mb-0 pb-1'>Click here to provide feedback</h7>
        </div>
    </div>
    </>
    )
}

export default App