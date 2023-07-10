import { Header } from "./components/header/header"
import { OrderListItem } from "./components/orders/orderItem"

const App = ()=>{
    return(
        <>
        <Header />
        <div class='col-12 col-md-6 m-0 p-0'>
            <div class='row card shadow p-2 m-0'>
                <h3 class='card-title'>Orders</h3>
                <div class='col-12 d-flex flex-column'>
                    <OrderListItem restaurant='Verains Pizza'  price='231' id='123876123876' quantity='5'/>
                    <OrderListItem restaurant='Verains Pizza'  price='231' id='123876123876' quantity='5'/>
                    <OrderListItem restaurant='Verains Pizza'  price='231' id='123876123876' quantity='5'/>
                    <OrderListItem restaurant='Verains Pizza'  price='231' id='123876123876' quantity='5'/>
                    <OrderListItem restaurant='Verains Pizza'  price='231' id='123876123876' quantity='5'/>
                    
                </div>
            </div>
        </div>
        </>       
    )
}





export default App