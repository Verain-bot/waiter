import React, { useContext, useRef, useState } from "react"
import { CustomizationOption, OrderStatusType, OrderType} from "../App"
import { makeRequest } from "../helper/fetchData"
import { APIRoutes, makeURL } from "../helper/APIRoutes"
import { useOrderContext } from "../Contexts/orderContext"
import { motion } from "framer-motion"
import PauseResumeMenuItemModal from "./modals/pauseResumeMenuItemModal"
import { usePauseResumeItemModal } from "../Contexts/menuItemModalContext"
import Dropdown from 'react-bootstrap/Dropdown';

type OrderActionItemType = {
    name: string
    color: string
    state: OrderStatusType
    acceptableStates: OrderStatusType[]
    orderStatus: string
}

export default function OrderCard(props : OrderType) {
    
    const orderTime = new Date(props.time)
    const [orders , setOrderContext] = useOrderContext()
    const [showDetails, setShowDetails] = useState(false)


    const OrderActions  : OrderActionItemType[]= [
        {
            name: 'Cancel Order',
            color: 'dark',
            state: 'CANCELLED',
            acceptableStates: [],
            orderStatus: 'Cancelled'
        },
        {
            name: 'Preparing Order',
            color: 'success',
            state: 'PREPARING',
            acceptableStates: ['CANCELLED', 'DISPATCHING', 'COMPLETE'],
            orderStatus: 'Preparing'
        },
        {
            name: 'Dispatching Order',
            color: 'warning',
            state: 'DISPATCHING',
            acceptableStates: ['COMPLETE', 'CANCELLED'],
            orderStatus: 'Dispatching',
        },
        {
            name: 'Complete Order',
            color: 'secondary',
            state: 'COMPLETE',
            acceptableStates: [],
            orderStatus: 'Completed'
        },
        {
            name: 'Accept Order',
            color: 'danger',
            state: 'CONFIRMED',
            acceptableStates: ['CANCELLED', 'PREPARING', 'DISPATCHING', 'COMPLETE'],
            orderStatus: 'Accepted'
        },
        {
            name: '',
            color: 'info',
            state: 'NOT_CONFIRMED',
            acceptableStates: ['CANCELLED', 'CONFIRMED'],
            orderStatus: 'New Order'
        }
        
    ]

    const [orderState, setOrderState] = useState(props.orderStatus)
    const color = OrderActions.find((action)=>action.state===orderState)?.color || 'dark'
    const selectedAction = OrderActions.find((action)=>action.state===orderState)
    const handleOver = (e: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        e.currentTarget.classList.add('shadow-lg')
    }

    const handleExit= (e: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        e.currentTarget.classList.remove('shadow-lg')
    }

    const items = props.customers.flatMap(customer=>{
        return customer.items.flatMap(item=>{
            const itemDetails = item.item
            
            return item.quantity.flatMap(q =>{
                
                var d : CustomizationOption[]= []
                var {price} = q
                q.option.forEach(o=>{
                    const index = d.findIndex((element)=>element.customization==o.customization)

                    var s = `${o.name}`
                    if(index==-1)
                        d.push({...o, name: `${o.customization} : ${s}`})

                    else
                        d[index] = {...d[index], name: `${d[index].name}, ${s}`}
                })

                return { qty: q.qty, itemDetails: itemDetails,option: d.map(x=>x.name).join(' ; '), price: price/q.qty}
            })
        })
    })

    const handleClickCheck = async ()=>{
        let newOrderState : OrderStatusType
        if (orderState === 'NOT_CONFIRMED'){
            newOrderState = 'PREPARING'
        }
        else{
            newOrderState = 'COMPLETE'
        }

        const r = new Request(APIRoutes.ADMIN_UPDATE_ORDER_STATUS, {
            method: 'PUT',
        })

        const fd = new FormData()
        fd.append('orderStatus', newOrderState)
        
        if (orders)
        setOrderContext(orders.map(order=>{
            if(order.id == props.id)
                return {...order, orderStatus: newOrderState}
            return order
        }))

        setOrderState(newOrderState)

        const {json, response, message} = await makeRequest(makeURL(APIRoutes.ADMIN_UPDATE_ORDER_STATUS, {'pk': props.id}), r,fd )
        
        if (!response.ok){
            console.error(json, response, message)
            alert('Something went wrong, please refresh the page.')
            return
        }
        if (newOrderState !== json.orderStatus)
            setOrderState(json.orderStatus)
    }

  return (
    <motion.div layout='preserve-aspect' layoutId={String(props.id)}  transition={{ type: "spring", stiffness: 100, damping: 12}} className="col-12 p-0" data-bs-theme='light'>
        
      <div className="row card shadow m-2 zoom" style={{cursor: 'pointer'}}  onMouseEnter={handleOver} onMouseLeave={handleExit}  >
        <div className={`card-header bg-${color}-subtle`}  onClick={()=>{setShowDetails(!showDetails)}} >
            <div className="row" >
                <div className={`col-8 text-${color}-emphasis`}>
                    Order ID: {props.id}
                </div>
                <div className="col-4 text-end d-flex align-items-center justify-content-center">
                <span className={`badge bg-${color}-subtle border border-${color}-subtle text-${color}-emphasis rounded-pill`} data-bs-theme='dark'>
                    {selectedAction?.orderStatus}
                </span>
                    <i className={`bi bi-check-circle text-${color}-emphasis p-0 mx-2 my-0`} style={{fontSize: 20, top: 0, right: 3}} onClick={handleClickCheck} />
                </div>
            </div>
        </div>
        
            
        

            <Dropdown  bsPrefix="p-0 m-0">
                <Dropdown.Menu className="position-absolute top-0" >
                    {OrderActions.map((action, index)=>(
                        <OrderActionItem obj={action} setState={setOrderState} currentState={selectedAction} key={index} id={props.id} />
                        ))}
                </Dropdown.Menu>
            <ul className={`list-group list-group-flush bg-${color} pt-2 pb-3 px-0 position-relative w-100`} >
            <Dropdown.Toggle as={'div'} bsPrefix="w-100" >
                
                <li className={`list-group-item d-${showDetails?'block':'none'} `} style={{zIndex: 20, boxSizing: 'border-box'}} >
                    
                    <span>
                    <strong>
                        Details: 
                    </strong>
                    <br/>
                        Time : {orderTime.toLocaleTimeString()}
                    <br/>
                        Customer: {props.customers[0].customer.first_name}
                    <br/>
                        Phone: {props.customers[0].customer.username}
                    </span>
                    
                </li>

                {items.map((item, index)=>
                    <OrderItem name={item.itemDetails.name} qty={item.qty} customizations={item.option} key={index} id={item.itemDetails.id} />
                    
                    )}

            
            </Dropdown.Toggle>
            </ul>
            </Dropdown>   
      </div>
        
    </motion.div>
  )
}

type OrderItemProps = {
    name: string
    qty: number
    customizations: string
    id: number
}

const OrderItem = (props: OrderItemProps)=>{
    
    const [modalProps, setModalProps] = usePauseResumeItemModal()
    

    return(
        <li className="list-group-item "  >
            <div className="container">
                <div className="row">
                    <div className="col-10 text-start px-0">
                        <strong>
                            {props.qty} x {props.name}
                        </strong>
                        <span className="text-secondary">
                            : {props.customizations}
                        </span>
                    </div>
                    <div className="col-2 text-end">
                    </div>
                </div>
            </div>
        </li>
    )   
}

type OrderActionItemProps = {
    obj: OrderActionItemType
    setState: React.Dispatch<React.SetStateAction<OrderStatusType>>
    currentState: OrderActionItemType | undefined
    id: number
}

const OrderActionItem = (props: OrderActionItemProps)=>{
    const [orders , setOrderContext] = useOrderContext()
    const [loading, setLoading] = useState(false)
    if (props.obj.name == '')
        return <></>

    const handleClick = async ()=>{
        const r = new Request(APIRoutes.ADMIN_UPDATE_ORDER_STATUS, {
            method: 'PUT',
        })
        const fd = new FormData()
        fd.append('orderStatus', props.obj.state)
        
        if (orders)
        setOrderContext(orders.map(order=>{
            if(order.id == props.id)
                return {...order, orderStatus: props.obj.state}
            return order
        }))

        setLoading(true)
        const {json, response, message} = await makeRequest(makeURL(APIRoutes.ADMIN_UPDATE_ORDER_STATUS, {'pk': props.id}), r,fd )
        setLoading(false)

        if (!response.ok){
            console.error(json, response, message)
            alert('Something went wrong, please refresh the page.')
            return
        }

        props.setState(json.orderStatus)
    }

    const disabled = !props.currentState?.acceptableStates.includes(props.obj.state) || loading

    return(
        <Dropdown.Item>
            <button className="dropdown-item" onClick={handleClick} disabled={disabled} >
                {props.obj.name}
            </button>
        </Dropdown.Item>
    )
}