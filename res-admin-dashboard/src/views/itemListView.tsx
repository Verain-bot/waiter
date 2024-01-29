import React, { useCallback, useMemo } from 'react'
import { useOrderContext } from '../Contexts/orderContext'

type ListItem  = {
    id: number
    name: string
    qty: number
}

export default function ItemListView() {
    const [data, _] = useOrderContext()
    
    const ListOfItems = useMemo(()=>data?.flatMap((orderObj)=>{
        if (orderObj.orderStatus ==='DISPATCHING' || orderObj.orderStatus ==='CANCELLED' || orderObj.orderStatus ==='NOT_CONFIRMED' || orderObj.orderStatus ==='COMPLETE')
            return []
        
            return orderObj.customers.flatMap((customer)=>{
                console.log(customer.items)
                return customer.items.flatMap((item)=>(
                    {id: item.item.id, name: item.item.name, qty : item.quantity.reduce((acc,curr)=>acc+curr.qty,0)}
                ))
            })
    }).reduce((acc : ListItem[] , curr)=>{
        
        const index = acc.findIndex((item)=>item.id===curr.id)

        if(index===-1)
            acc.push(curr)
        
        else
            acc[index].qty+=curr.qty
        
        return acc
    },[]),[data])
    


        console.log('Items ',ListOfItems)

    

  return (
    <main>
        <div className="container">
            <div className="row pt-2">
            <h1>
                Items to be prepared
            </h1>
            <hr/>
            </div>
            <div className="row">

                <div className="col-8 medium-text">
                    <strong>
                        Item
                    </strong>
                </div>
                <div className="col-4 text-center medium-text">
                    <strong>
                        Quantity
                    </strong>
                </div>
                {
                    ListOfItems?.map(item=><Item name={item.name} qty={item.qty} key={item.id} />)
                }
            </div>
        </div>
    </main>
  )
}

type Props = {
    name: string
    qty: number
}

const Item = (props: Props)=>{
    return (
        <>
        <div className="col-8 medium-text">
                {props.name}
            </div>
            <div className="col-4 text-center medium-text">
                {props.qty}                   
        </div>
        </>
    )
}