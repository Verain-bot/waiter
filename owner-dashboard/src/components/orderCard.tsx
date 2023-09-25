import React, { useRef, useState } from "react"
import { act } from "react-dom/test-utils"

type OrderActionItemType = {
    name: string
    color: string
    state: string
    acceptableStates: string[]
    orderStatus: string
}

export default function orderCard() {
    const ref = useRef<HTMLUListElement>(null)

    const handleClick = (e : React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        if(ref.current){
            ref.current.classList.toggle('show')
        }
    }

    const OrderActions  : OrderActionItemType[]= [
        {
            name: 'Cancel Order',
            color: 'dark',
            state: 'cancelled',
            acceptableStates: [],
            orderStatus: 'Cancelled'
        },
        {
            name: 'Preparing Order',
            color: 'success',
            state: 'preparing',
            acceptableStates: ['cancelled', 'dispatching', 'completed'],
            orderStatus: 'Preparing'
        },
        {
            name: 'Dispatching Order',
            color: 'warning',
            state: 'dispatching',
            acceptableStates: ['completed', 'cancelled'],
            orderStatus: 'Dispatching',
        },
        {
            name: 'Complete Order',
            color: 'secondary',
            state: 'completed',
            acceptableStates: [],
            orderStatus: 'Completed'
        },
        {
            name: 'Accept Order',
            color: 'danger',
            state: 'accepted',
            acceptableStates: ['cancelled', 'preparing', 'dispatching', 'completed'],
            orderStatus: 'Accepted'
        }
    ]

    const [orderState, setOrderState] = useState('accepted')
    const color = OrderActions.find((action)=>action.state===orderState)?.color || 'dark'
    const selectedAction = OrderActions.find((action)=>action.state===orderState)
    const handleOver = (e: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        e.currentTarget.classList.add('shadow-lg')
    }

    const handleExit= (e: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        e.currentTarget.classList.remove('shadow-lg')
    }

  return (
    <div className="col-xl-3 col-md-4 col-sm-6 col-12 p-0" data-bs-theme='light'>
      <div className="row card shadow m-2 zoom" style={{cursor: 'pointer'}} onClick={handleClick} onMouseEnter={handleOver} onMouseLeave={handleExit} >
        <div className={`card-header bg-${color}-subtle`} >
            <div className="row">
                <div className={`col-8 text-${color}-emphasis`}>
                    Order ID: 123876231
                </div>
                <div className="col-4 text-end">
                <span className={`badge bg-${color}-subtle border border-${color}-subtle text-${color}-emphasis rounded-pill`} data-bs-theme='dark'>
                    {selectedAction?.orderStatus}
                </span>
                </div>
            </div>
        </div>
        <div className="border-1">
            <ul  className="dropdown-menu dropdown-menu-end" ref={ref}>
                {OrderActions.map((action, index)=>(
                    <OrderActionItem obj={action} setState={setOrderState} currentState={selectedAction} key={index} />
                ))}
                
            </ul>
        </div>
        <ul className={`list-group list-group-flush bg-${color} pt-2 pb-3 px-0`} >
            
            <OrderItem/>
            <OrderItem/>
            <OrderItem/>
            <OrderItem/>
        </ul>

      </div>
        
    </div>
  )
}

type OrderItemProps = {
    
}

const OrderItem = (props: OrderItemProps)=>{

    

    return(
        <li className="list-group-item "  >
            <strong>
                Food Item #1:
            </strong>
            <span className="text-secondary">
                1x Chicken Burger, 1x Fries1x Chicken Burger, 1x Fries1x Chicken Burger, 1x Fries
            </span>
        </li>
    )   
}

type OrderActionItemProps = {
    obj: OrderActionItemType
    setState: React.Dispatch<React.SetStateAction<string>>
    currentState: OrderActionItemType | undefined
    
}
const OrderActionItem = (props: OrderActionItemProps)=>{
    const handleClick = ()=>{
        props.setState(props.obj.state)
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