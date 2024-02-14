import React, { createContext, useEffect } from "react";
import { OrderStatusType, OrderType } from "../App";
import { getData } from "../helper/fetchData";
import { APIRoutes } from "../helper/APIRoutes";

type OrderContextType = [OrderType[] | null, (x : OrderType[])=>void]

const priotities : OrderStatusType[] = [
    'NOT_CONFIRMED',
    'CONFIRMED',
    'PREPARING',
    'DISPATCHING',
    'READY',
    'COMPLETE',
    'CANCELLED'
]

const orderContext = createContext<OrderContextType | null>(null)

export const OrderContextProvider = ({children}: {children: React.ReactNode})=>{
    const [orders, setOrders] = React.useState<OrderType[] | null>(null)

    const setOrderSorted = (newOrders : OrderType[])=>{
        var sortedOrders = newOrders.sort((a, b)=>{
            return a.id - b.id
        })

        sortedOrders = sortedOrders.sort((a, b)=>{
            return priotities.indexOf(a.orderStatus) - priotities.indexOf(b.orderStatus)
        })
        setOrders(sortedOrders)
    }

    const loadData =async ()=>{
        try{

            const x = await getData(APIRoutes.ADMIN_ORDERS, new AbortController().signal)
            const j = await x.json()
            setOrderSorted(j.results)
        }
        catch(e){
            console.log(e)
        }
    }

    const updateData = async()=>{
        try{
            const x = await getData(APIRoutes.ADMIN_ORDERS_AVAILABLE, new AbortController().signal)
            const j = await  x.json()
            const isAvailable = j.available
            if (isAvailable){
                loadData()
                
            }
        }
        catch(e){
            alert('Something went wrong. Please try to reload the page.')
            console.log(e)
        }
    }
    
    useEffect(()=>{
        loadData()
        const interval = setInterval(updateData, 10000)

        return()=>{
            clearInterval(interval)
        }

    },[])

    return(
        <orderContext.Provider value={[orders, setOrderSorted]}>
            {children}
        </orderContext.Provider>
    )
}

export const useOrderContext = ()=>{
    const context = React.useContext(orderContext)
    if(context === null)
        throw new Error('useOrderContext must be used inside OrderContextProvider')
    return context
}