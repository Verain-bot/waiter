import { useSearchBar } from "../hooks"
import { Header } from "./components/header/header"

import { Table } from "./components/table/table"
import { TableHeading, TableItem } from "./components/table/tableItems"
import { useContext, useEffect } from "react"

const App = ()=>{

    const search = useSearchBar()

    return(
        <>
    
        <div class='col-12 col-md-6 m-0 p-0'>
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

const Right = (props)=>{
    return(
    <div class='d-flex flex-column align-items-center justify-content-center'>
        <h6 class='p-0 m-0'>{props.price}</h6>
    </div>
    )
}

const Left = (props)=>{
    return(
        <>
            <span class='text-muted small m-0 p-0'>#{props.id}</span>
            <h6 class='p-0 m-0'>{props.restaurant}</h6>
            <span class='small m-0 p-0'>{props.quantity} item(s)</span>
        </>
    )
}

export default App