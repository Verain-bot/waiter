import { CartItem, CartTotalItem } from "../components/cart/cartItem"
import { useContext, useEffect } from "react"
import Table from "../components/table/table"
import { TableItem } from "../components/table/tableItems"
import { useRatingContext } from "../context/RatingContext"

const App = ()=>{

    const [data, setData]= useRatingContext()

    const review = ()=>{
        setData({...data,canRate:true, title: 'Rate order'})
    }


    return(
    <>
    <div className='col-12 col-md-6'>
        <div className='row card shadow p-2'>
            <h2 className='card-title mb-0 pb-1'>Order Details</h2>
            <h6 className='card-subtitle mb-4'>#1232123212321</h6>

            <div className='list-group list-group-flush'>
                {/* <CartItem name='Pizza' price='231' fixed/>
                <CartItem name='Pizza' price='231' fixed/>
                <CartItem name='Pizza' price='231' fixed/>
                <CartItem name='Pizza' price='231' fixed/>
                <CartItem name='Pizza' price='231' fixed/> */}
                <div className='list-group-item'>

                <CartTotalItem name='Cart total' amount='123' />
                <CartTotalItem name='Cart total' amount='123' small />
                <CartTotalItem name='Cart total' amount='123' strong />
                </div>
            </div>

        </div>

        <Table title='Order Status' >
            <TableItem right={<strong className='text-success'> Delivered</strong>} left='Status' width={7} />
        </Table>


        <div className='row card shadow p-1 pb-3 pointer' onClick={review}>
            <h2 className='card-title mb-0 pb-2'>Rate order</h2>
            <h6 className='card-subtitle mb-0 pb-1'>Click here to provide feedback</h6>
        </div>
    </div>
    </>
    )
}

export default App