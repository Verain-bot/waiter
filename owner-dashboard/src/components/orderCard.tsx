import { useRef } from "react"

export default function orderCard() {
    const ref = useRef<HTMLUListElement>(null)
    const handleClick = (e : React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        if(ref.current){
            ref.current.classList.toggle('show')
        }
    }

  return (
    <div className="col-lg-3 col-md-6 col-sm-12 p-0">
      <div className="row card shadow m-2" style={{cursor: 'pointer'}} onClick={handleClick} >
        <div className="card-header" >
            Order ID: 123876231
        </div>
        <div>
            <ul  className="dropdown-menu dropdown-menu-end" ref={ref}>
                <li><a className="dropdown-item" href="#" onClick={()=>console.log('asddsa')}>Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
            </ul>
        </div>
        <ul className="list-group list-group-flush" >
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
        <li className="list-group-item">
            <strong>
                Food Item #1:
            </strong>
            <span className="text-secondary">
                1x Chicken Burger, 1x Fries1x Chicken Burger, 1x Fries1x Chicken Burger, 1x Fries
            </span>
        </li>
    )   
}