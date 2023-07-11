import { useSearchBar } from "../hooks"
import { Header } from "./components/header/header"
import { Table} from "./components/table/table"
import { TableHeading, TableItem } from "./components/table/tableItems"

const App = ()=>{
    
    const search = useSearchBar()

    return(
        <>
        
            <div class='col-12 col-md-6'>
                <Table title='Credits' subTitle={'Your credits for all the restaurants available'} info={'The credits vary with each restaurant. Some restaurants may choose to not support credits.'} >
                    <TableHeading left='Restaurant' right='Amount' width={8} />
                    <TableItem left='Verain' right='123' width={8}/>
                    <TableItem left='Verain' right='123' width={8}/>
                    <TableItem left='Verain' right='123' width={8}/>
                </Table>

            </div>
        </>
    )
}


export default App