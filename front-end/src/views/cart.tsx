import { useContext, useEffect, useMemo } from 'react';
import { CartFooter } from '../components/cart/cartFooter';
import { CartItem, CartTotalItem } from '../components/cart/cartItem';
import { Check } from '../components/forms/inputsUncontrolled';
import Table  from '../components/table/table';
import { TableHeading, TableItem } from '../components/table/tableItems';
import { Link, LoaderFunction, useLoaderData, useNavigate } from 'react-router-dom';
import { CartActions, CartItemType, CustomizationsType, useCartContext } from '../context/CartContext';
import EmptyCart from '../components/cart/emptyCart';
import { PATHS } from '../utilities/routeList';
import { makeRequest } from '../utilities/fetchData';
import APIRoutes from '../utilities/APIRoutes';
import { useMessageContext } from '../context/MessageContext';
import { useLoginContext } from '../context/LoginContext';


const App = ()=>{
    const [cart, setCart] = useCartContext()
    console.log(JSON.stringify(cart))
    const [msg, setMessage] = useMessageContext()
    const loaderData = useLoaderData() as {valid: boolean} | null
    const [user,setUser] = useLoginContext()
    const address  = localStorage.getItem('address')

    useEffect(()=>{
        if (loaderData !== null){
            if (!loaderData.valid){
                setCart({
                    type: CartActions.CLEAR
                })
                setMessage({
                    type: 'error',
                    body: 'Cart out of sync with server. Please add the items again.',
                    heading: 'Error'
                })
            }
        }
    },[])

    const price = useMemo(()=>{
        let p = 0
        cart.forEach((curr)=>{
            curr.customizations.forEach(c=>{
                p += c.quantity * curr.menuItemPrice
                c.customizations.forEach(customization=>{
                    customization.Options.forEach(o=>{
                        p+= o.price * c.quantity
                    })
                })
            })
        })
        return p
    },[cart])

    
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
                <h5 className='card-title'>Cart</h5>
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
                    <TableItem left='Delivering to:' right={<Address name={user.user? user.user.first_name : ''} address={address? address: ''} />}  width={5}/>
                    <TableItem left={<span className='small'>Tap to change your delivery address</span>}  width={11}/>
                </Table>
            </Link>
            
            
            <Table title='Amount' subTitle='Your Total Amount'>
                
                <CartTotalItem name='Cart Total' amount={price} />

                <TableItem left={<strong>Grand Total</strong>} right={<strong>{price}</strong>}  width={10}/>
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


export const cartLoader : LoaderFunction = async ({params, request})=>{
    const r = localStorage.getItem('cart')
    if (!r){
        return null
    }
    
    const cart = JSON.parse(r) as CartItemType[]

    if(cart.length==0)
        return null

    const address = localStorage.getItem('address')
    
    let p = 0
    cart.forEach((curr)=>{
        curr.customizations.forEach(c=>{
            p += c.quantity * curr.menuItemPrice
            c.customizations.forEach(customization=>{
                customization.Options.forEach(o=>{
                    p+= o.price * c.quantity
                })
            })
        })
    })
    const req = new Request(APIRoutes.CART_PRICE, {
        'method': 'POST',
    })

    const fd = new FormData()
    fd.append('cart', r)
    fd.append('restaurantID', cart[0].restaurantID.toString())
    fd.append('address', address? address: '')

    const {json, response, message} = await  makeRequest( APIRoutes.CART_PRICE, req, fd)
    console.log('verain',json)

    if (parseInt(json.price) === p)
        return {
            'valid' : true, 
    }
    else
        return {
            'valid' : false,
    }
}


export default App