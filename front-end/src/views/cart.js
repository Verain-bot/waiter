

import { useEffect } from 'react';
import { CartFooter } from './components/cart/cartFooter';
import { CartItem, CartTotalItem } from './components/cart/cartItem';
import { Check } from './components/forms/inputs';
import { Table } from './components/table/table';
import { TableHeading, TableItem } from './components/table/tableItems';
import { Link, useNavigate } from 'react-router-dom';

const App = ()=>{

    return(
        <>
        
        <div class='col-12 col-md-6'>

            <div class='row card shadow'>
                <h5 class='card-title'>Cart</h5>
                <div class='list-group list-group-flush'>
                    <CartItem name='Pizza' price='231'/>
                    <CartItem name='Pizza' price='231'/>
                    <CartItem name='Pizza' price='231'/>
                    <CartItem name='Pizza' price='231'/>
                    
                </div>
            </div>

            <Table title='Credits' subTitle='Use your accumulated credits here' info='Credits are credited after the order is completed. You can use them for future purchases.' >
                <TableItem left='Total Store credits' right='90'  width={8}/>
                <TableItem left='Use Credits' right={<Check />}  width={8}/>
            </Table>
            
            <Link to='/address' className='link text-dark'>
                <Table title='Address' subTitle='Please select your delivery address'>
                    <TableItem left='Delivering to:' right={<Address name='Verain' address='10 N Model Town, Hisar' />}  width={5}/>
                    <TableItem left={<span class='small'>Tap to change your delivery address</span>}  width={11}/>
                </Table>
            </Link>
            
            
            <Table title='Amount' subTitle='Your Total Amount'>
                
                <CartTotalItem name='Cart Total' amount='123' />
                <CartTotalItem name='Cart Total' amount='-123' small />
                <CartTotalItem name='Cart Total' amount='123' strong />

                <TableItem left={<strong>Grand Total</strong>} right={<strong>213</strong>}  width={10}/>
            </Table>
            
            <CartFooter />
        </div>
        </>
            
    )
}

const Address = (props) =>{
    return(
        <div class='small text-muted'>
            {props.name} <br/>
            {props.address}
        </div>
    )
}


export default App