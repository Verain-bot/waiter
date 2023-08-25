

import { useContext, useEffect } from 'react';
import { CartFooter } from '../components/cart/cartFooter';
import { CartItem, CartTotalItem } from '../components/cart/cartItem';
import { Check } from '../components/forms/inputsUncontrolled';
import Table  from '../components/table/table';
import { TableHeading, TableItem } from '../components/table/tableItems';
import { Link, useNavigate } from 'react-router-dom';
import { CartItemType, CustomizationsType, useCartContext } from '../context/CartContext';
import EmptyCart from '../components/cart/emptyCart';
import { PATHS } from '../utilities/routeList';


const App = ()=>{
    const [cart, setCart] = useCartContext()
    const getItems = ()=>{
        let items : (CustomizationsType & Omit<CartItemType, 'customizations'> & {index: number})[]  = []
        cart.forEach(i=>{
            i.customizations.forEach((customization,ind)=>{
                var cpy = structuredClone(i)
                items.push({ ...cpy, ...customization, index: ind})
            })
        })
        return items
    }

    const items = getItems()
    
    console.log(cart.length, cart)

    if (cart.length==0)
        return <EmptyCart />
    else
    return(
        <>
        
        <div className='col-12 col-md-6'>

            <div className='row card shadow'>
                <h5 className='card-title px-2'>Cart</h5>
                <div className='list-group list-group-flush'>
                    {items.map((item,key)=><CartItem {...item} key={key} />)}
                    
                </div>
            </div>

            <Table title='Credits' subTitle='Use your accumulated credits here' info='Credits are credited after the order is completed. You can use them for future purchases.' >
                <TableItem left='Total Store credits' right='90'  width={8}/>
                <TableItem left='Use Credits' right={<Check name='Use Credits' inputName='usecredits' />}  width={8}/>
            </Table>
            
            <Link to={PATHS.ADDRESS} className='link text-dark'>
                <Table title='Address' subTitle='Please select your delivery address'>
                    <TableItem left='Delivering to:' right={<Address name='Verain' address='10 N Model Town, Hisar' />}  width={5}/>
                    <TableItem left={<span className='small'>Tap to change your delivery address</span>}  width={11}/>
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

const Address = (props: {name: string, address: string}) =>{
    return(
        <div className='small text-muted'>
            {props.name} <br/>
            {props.address}
        </div>
    )
}


export default App