import { useContext, useEffect, useMemo } from 'react';
import { CartFooter } from '../components/cart/cartFooter';
import { CartItem, CartTotalItem } from '../components/cart/cartItem';
import { Check } from '../components/forms/inputsUncontrolled';
import Table  from '../components/table/table';
import { TableHeading, TableItem } from '../components/table/tableItems';
import { Link, LoaderFunction, defer, useLoaderData, useNavigate } from 'react-router-dom';
import { CartActions, CartItemType, CustomizationsType, useCartContext } from '../context/CartContext';
import EmptyCart from '../components/cart/emptyCart';
import { PATHS } from '../utilities/routeList';
import { makeRequest } from '../utilities/fetchData';
import APIRoutes from '../utilities/APIRoutes';
import { useMessageContext } from '../context/MessageContext';
import { useLoginContext } from '../context/LoginContext';
import LoaderWrapper from '../components/loader/LoaderWrapper';


const App = ({data} : {data: {valid: boolean} | null})=>{
    const [cart, setCart] = useCartContext()
    const [msg, setMessage] = useMessageContext()
    const loaderData = data
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
        const items : (CustomizationsType & Omit<CartItemType, 'customizations'> & {index: number})[]  = []
        cart.forEach(i=>{
            i.customizations.forEach((customization,ind)=>{
                const cpy = structuredClone(i)
                items.push({ ...cpy, ...customization, index: ind})
            })
        })
        return items
    }

    const items = getItems()


    if (cart.length==0)
        return <EmptyCart />
    else
    return(
        <>
        
        <div className='col-12 col-md-6 loading-content'>

            <div className='row card shadow'>
                <h5 className='card-title'>Cart</h5>
                <div className='list-group list-group-flush'>
                    {items.map((item,key)=><CartItem {...item} key={key} />)}
                    
                </div>
            </div>

            <Table title='Credits' subTitle='Use your accumulated credits here' info='Credits are credited after the order is completed. You can use them for future purchases.' >
                <div className="col-12 mb-3 d-flex align-items-center justify-content-center">

                <span className=' text-muted '>
                    Coming Soon!
                </span>
                </div>
            </Table>
            
            {/* <Link to={PATHS.ADDRESS} className='link text-dark'>
                <Table title='Table' subTitle='Only select this field if your restaurant is not self service'>
                    <TableItem left='Table:' right={<Address address={address? address: ''} />}  width={5}/>
                    <TableItem left={<span className='small'>Tap to change your table</span>}  width={11}/>
                </Table>
            </Link> */}
            
            
            <Table title='Amount' subTitle='Your Total Amount'>
                
                <CartTotalItem name='Cart Total' amount={price} />

                <TableItem left={<strong>Grand Total</strong>} right={<strong>{price}</strong>}  width={10}/>
            </Table>
            
            <CartFooter />
        </div>
        </>
            
    )
}

const Address = (props: { address: string}) =>{
    return(
        <div className='text-muted'>
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
        return defer({
            data: null
        })

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

    const ret = makeRequest( APIRoutes.CART_PRICE, req, fd).then(({json,response,message})=>{
        if (parseInt(json.price) === p)
            return {
                'valid' : true, 
        }
        else
            return {
                'valid' : false,
        }
    })

    return defer({
        data: ret
    })
}

const Main = ()=>LoaderWrapper(App)

export default Main