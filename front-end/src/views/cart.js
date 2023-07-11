
import { CartFooter } from './components/cart/cartFooter';
import { CartItem, CartTotal } from './components/cart/cartItem';
import { Check } from './components/forms/inputs';

import { Header } from './components/header/header';
import { Table } from './components/table/table';
import { TableItem } from './components/table/tableItems';

const App = ()=>{
    return(
        <>
        <Header />
        <div class='col-12 col-md-6'>

            <div class='row card shadow'>
                <h5 class='card-title'>Cart</h5>
                <div class='list-group list-group-flush'>
                    <CartItem name='Pizza' price='231'/>
                    <CartItem name='Pizza' price='231'/>
                    <CartItem name='Pizza' price='231'/>
                    <CartItem name='Pizza' price='231'/>
                    <CartTotal />
                </div>
            </div>


            <Table title='Credits' subTitle='Use your accumulated credits here' info='Credits are credited after the order is completed. You can use them for future purchases.' >
                <TableItem left='Total Store credits' right='90'  width={8}/>
                <TableItem left='Use Credits' right={<Check />}  width={8}/>
            </Table>
            
            <CartFooter />
        </div>
        </>
            
    )
}



export default App