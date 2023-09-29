import React, { useRef, useState } from "react"
import { CustomizationOption, OrderStatusType, OrderType} from "../App"
import { makeRequest } from "../helper/fetchData"
import { APIRoutes, makeURL } from "../helper/APIRoutes"
import { useOrderContext } from "../Contexts/orderContext"
import { motion } from "framer-motion"

type OrderActionItemType = {
    name: string
    color: string
    state: OrderStatusType
    acceptableStates: OrderStatusType[]
    orderStatus: string
}

export default function orderCard(props : OrderType) {
    const ref = useRef<HTMLUListElement>(null)

    const handleClick = async (_ : React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        console.log(JSON.stringify(props))
        if(ref.current){
            ref.current.classList.toggle('show')
        }
    }

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

  return (
    <motion.div layout layoutId={String(props.id)}  transition={{ type: "spring", stiffness: 100, damping: 12}} className="col-12 p-0" data-bs-theme='light'>
      <div className="row card shadow m-2 zoom" style={{cursor: 'pointer'}} onClick={handleClick} onMouseEnter={handleOver} onMouseLeave={handleExit} >
        <div className={`card-header bg-${color}-subtle`} >
            <div className="row" >
                <div className={`col-8 text-${color}-emphasis`}>
                    Order ID: {props.id}
                </div>
                <div className="col-4 text-end">
                <span className={`badge bg-${color}-subtle border border-${color}-subtle text-${color}-emphasis rounded-pill`} data-bs-theme='dark'>
                    {selectedAction?.orderStatus}
                </span>
                </div>
            </div>
        </div>
        <div className="border-1">
            <ul  className="dropdown dropdown-menu dropdown-menu-end zoom" ref={ref}>
                {OrderActions.map((action, index)=>(
                    <OrderActionItem obj={action} setState={setOrderState} currentState={selectedAction} key={index} id={props.id} />
                ))}
                
            </ul>
        </div>
        <ul className={`list-group list-group-flush bg-${color} pt-2 pb-3 px-0`} >
            
            {items.map((item, index)=>
                <OrderItem name={item.itemDetails.name} qty={item.qty} customizations={item.option} key={index} />
            )}

        </ul>

      </div>
        
    </motion.div>
  )
}

type OrderItemProps = {
    name: string
    qty: number
    customizations: string
}

const OrderItem = (props: OrderItemProps)=>{
    
    return(
        <li className="list-group-item "  >
            <strong>
                {props.qty} x {props.name}
            </strong>
            <span className="text-secondary">
                : {props.customizations}
            </span>
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


    if (props.obj.name == '')
        return <></>

    const handleClick = async ()=>{
        const r = new Request(APIRoutes.ADMIN_UPDATE_ORDER_STATUS, {
            method: 'PUT',
        })
        const fd = new FormData()
        fd.append('orderStatus', props.obj.state)
        const {json} = await makeRequest(makeURL(APIRoutes.ADMIN_UPDATE_ORDER_STATUS, {'pk': props.id}), r,fd )

        setOrderContext(orders.map(order=>{
            if(order.id == props.id)
                return {...order, orderStatus: json.orderStatus}
            return order
        }))

        props.setState(json.orderStatus)
    }

    const disabled = !props.currentState?.acceptableStates.includes(props.obj.state)

    return(
        <li>
            <button className="dropdown-item" onClick={handleClick} disabled={disabled} >
                {props.obj.name}
            </button>
        </li>
    )
}