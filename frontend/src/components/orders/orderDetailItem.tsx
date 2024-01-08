import { TableItem } from "../table/tableItems"
import { CartItemLeft } from "../cart/cartItem"

type PropType = {
    name: string
    custString: string
    price: number
    qty: number
}


const OrderDetailItem = (props: PropType)=>{
    return (
        <TableItem left={<CartItemLeft name={props.name} custString={props.custString} price={props.price} />} right={<Right price={props.price*props.qty} qty={props.qty} />} width={8} />
    )
}


const Right = (props: {price: string | number, qty: string|number})=>{
    return(
        <div className='col-12'>
            <div className="row">
                <div className="col-6 small text-muted d-flex m-0 p-0 align-items-center">
                    <span>
                        Qty: {props.qty}
                    </span>
                </div>
                <div className="col-6">
                    {props.price}
                </div>
            </div>
        </div>
    )
}

export default OrderDetailItem