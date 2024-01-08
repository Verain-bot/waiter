import Table from "../table/table"
import { TableItem } from "../table/tableItems"
import APIRoutes from "../../utilities/APIRoutes"
import { makeRequest } from "../../utilities/fetchData"
import { useMessageContext } from "../../context/MessageContext"

type PropType = {
    paymentStatus: string
    orderID: number | string

}

const PaymentBar = ( props : PropType )=>{

    const [message, setMessage] = useMessageContext()
    const disabled =  props.paymentStatus=='PAID' || props.paymentStatus=='REFUNDED'

    const checkPaymentStatus = async ()=>{
        const req = new Request(APIRoutes.PHONE_PE_CHECK_STATUS, {
            method: 'POST',
        })
        
        const fd = new FormData()
        fd.append('order_id', String(props.orderID))

        const {json, response, message} = await makeRequest(APIRoutes.PHONE_PE_CHECK_STATUS, req, fd)

        if(!response.ok){
            setMessage({
                heading: 'Something went wrong',
                body: message,
                type: 'error',
            })
            return
        }
    
        
        setMessage({
            heading: 'Payment Info',
            body: json.message + ' Please refresh the page.',
            type: 'success',
        })

        return
        
        
    }

    const retryPayment = async () =>{
        const windowReference = window.open();

        const requestForPayment = new Request(APIRoutes.PHONE_PE_INITITATE,{
            method: 'POST',
        })
    
        const fd2 = new FormData()
        fd2.append('order_id', String(props.orderID))
        const {json, response, message} = await makeRequest(APIRoutes.PHONE_PE_INITITATE,requestForPayment, fd2)

        if(!response.ok){
            setMessage({
                heading: 'Something went wrong',
                body: message,
                type: 'error',
            })
            return
        }
        
        windowReference?.location.assign(json.url)
        return
    }


    return (

        <Table title="Payment details" subTitle={`Order no.: #${props.orderID}`} info={`Payment details for Order Number #${props.orderID}`}>
            
        <TableItem left='Payment Status' right={<strong>{props.paymentStatus}</strong>} width={6} nohr />
            
            <div className="col-12 pb-4 mx-0 px-0">
                <button className='btn btn-outline-dark col-6 ' onClick={checkPaymentStatus} disabled={disabled} >
                    <strong>
                        Check Status
                    </strong>
                </button>

                <button className='btn btn-dark col-6' onClick={retryPayment} disabled={disabled} >
                    <strong>
                        Retry Payment
                    </strong>
                </button>
            </div>     

        </Table>   
    )
}

export default PaymentBar