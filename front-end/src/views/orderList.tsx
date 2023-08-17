import useSearchBar from "../hooks/useSearchBar"
import Table from "../components/table/table"
import { TableHeading, TableItem } from "../components/table/tableItems"

const App = ()=>{

    const search = useSearchBar()

    return(
        <>
    
        <div className='col-12 col-md-6 m-0 p-0'>
            <Table title='Orders' subTitle={'Your orders from all the restaurants available'} info={'Check your order history here. In case you need help, please contact the restaurant.'}  >
                <TableHeading left='Restaurant' right='Amount' width={8} />
                <TableItem left={<Left id={12312312312} restaurant={'Verain'} quantity={3} />} right={<Right price={123} />} width={8}/>
                <TableItem left={<Left id={12312312312} restaurant={'Verain'} quantity={3} />} right={<Right price={123} />} width={8}/>
                <TableItem left={<Left id={12312312312} restaurant={'Verain'} quantity={3} />} right={<Right price={123} />} width={8}/>
            </Table>
        </div>
        </>       
    )
}

type OrderListTableRightProps = {
    price: number
}

type OrderListTableLeftProps = {
    id: number
    restaurant: string
    quantity: number
}

const Right : React.FC<OrderListTableRightProps> = (props )=>{
    return(
    <div className='d-flex flex-column align-items-center justify-content-center'>
        <h6 className='p-0 m-0'>{props.price}</h6>
    </div>
    )
}

const Left : React.FC<OrderListTableLeftProps>= (props)=>{
    return(
        <>
            <span className='text-muted small m-0 p-0'>#{props.id}</span>
            <h6 className='p-0 m-0'>{props.restaurant}</h6>
            <span className='small m-0 p-0'>{props.quantity} item(s)</span>
        </>
    )
}

export default App