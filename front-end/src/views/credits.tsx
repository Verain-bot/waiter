import useSearchBar from "../hooks/useSearchBar"
import Table from "../components/table/table"
import { TableHeading, TableItem } from "../components/table/tableItems"

const App = ()=>{
    
    const search = useSearchBar()

    return(
        
        
        <div className='col-12 col-md-6'>
            <Table title='Credits' subTitle={'Your credits for all the restaurants available'} info={'The credits vary with each restaurant. Some restaurants may choose to not support credits.'} >
                <br />
                <br />
                
                <div className="row align-items-center justify-content-center text-muted">
                    Coming Soon!
                </div>
                <br />
                <br />
                
            </Table>

        </div>
        
    )
}


export default App