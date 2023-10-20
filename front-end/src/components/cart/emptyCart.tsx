import { Link } from "react-router-dom"
import { PATHS } from "../../utilities/routeList"

const  App = ()=>{
    return(
        <div className='col-12 col-md-6'>
            <div className="row" style={{marginTop: '200px', marginBottom: '200px'}}>
                <div className="col-12 d-flex alignt-items-center justify-content-center">
                        <i className='bi bi-cart-x text-danger' style={{fontSize: '70px'}}></i>
                </div>
                <div className="col-12 d-flex flex-column alignt-items-center justify-content-center text-center mt-4">
                    <h3 className='text-dark'>Your Cart is empty, please add something and come back.</h3>
                    <Link to={PATHS.RESTAURANT_LIST} className='btn btn-outline-danger mt-4'>Browse Restaurants</Link>
                </div>
            </div>
        </div>
    )
}

export default App