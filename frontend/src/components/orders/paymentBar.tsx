import Table from "../table/table"
import { TableItem } from "../table/tableItems"
import APIRoutes from "../../utilities/APIRoutes"
import { makeRequest } from "../../utilities/fetchData"
import { useMessageContext } from "../../context/MessageContext"
import { payUsingRazorPay } from "../../utilities/payRZP"
import useRazorpay from "react-razorpay"
import { useLoginContext } from "../../context/LoginContext"
import { useState } from "react"
type PropType = {
    paymentStatus: string
    orderID: number | string

}

export type RazorpayInitiateResponse = {
    RZP_Order_ID: string
    orderID: number
    
}

const PaymentBar = ( props : PropType )=>{
    const [Razorpay] = useRazorpay()
    const [message, setMessage] = useMessageContext()
    const [loading, setLoading] = useState(false)

    const disabled =  props.paymentStatus=='PAID' || props.paymentStatus=='REFUNDED' || loading

    const [user, _] = useLoginContext()
    const checkPaymentStatus = async ()=>{
        setLoading(true)

        const req = new Request(APIRoutes.PHONE_PE_CHECK_STATUS, {
            method: 'POST',
        })
        
        const fd = new FormData()
        fd.append('order_id', String(props.orderID))

        const {json, response, message} = await makeRequest(APIRoutes.RAZORPAY_CHECK_STATUS, req, fd)

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

        setLoading(false)
    }

    const retryPayment = async () =>{
        setLoading(true)

        const requestForPayment = new Request(APIRoutes.RAZORPAY_INITIATE,{
            method: 'POST',
        })
    
        const fd2 = new FormData()
        fd2.append('order_id', String(props.orderID))
        const {json, response, message} = await makeRequest(APIRoutes.RAZORPAY_INITIATE,requestForPayment, fd2)
        
        if(!response.ok){
            setMessage({
                heading: 'Something went wrong',
                body: message,
                type: 'error',
            })
            setLoading(false)
            return
        }
        
        payUsingRazorPay(json.RZP_Order_ID, Razorpay, (res) => {},user.user)

        setLoading(false)
    }


    return (

        <Table title="Payment details" subTitle={`Order no.: #${props.orderID}`} info={`Payment details for Order Number #${props.orderID}`}>
            
        <TableItem left='Payment Status' right={<strong>{props.paymentStatus}</strong>} width={6} nohr />
            
            <div className="col-12 pb-4 mx-0 px-0">
                <button className='btn btn-outline-dark col-6 ' onClick={checkPaymentStatus} disabled={disabled} >
                    <strong>
                    {loading && <span className="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span>}
                        Check Status
                    </strong>
                </button>

                <button className='btn btn-dark col-6' onClick={retryPayment} disabled={disabled} >
                {loading && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
                    <strong>
                        Retry Payment
                    </strong>
                </button>
            </div>     

        </Table>  
    )
}

export default PaymentBar