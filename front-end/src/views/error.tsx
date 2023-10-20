import { useRouteError, isRouteErrorResponse} from "react-router-dom"
import { ErrHeader } from "../components/header/header"
import { useEffect } from "react"
import Footer from "../components/footer/footer"


const App = ()=>{
    const error = useRouteError() as Error

    useEffect(()=>{
        console.log(error)
    })

    if (!isRouteErrorResponse(error)) {
        throw error;
    }
    return(
        <>
        <ErrHeader />
        <main id="main" className="main">
        <div className='row p-2 d-flex align-items-center justify-content-center'>
            <div className='col-12 col-md-6'>
                <div className="row" style={{marginTop: '150px', marginBottom: '200px'}}>
                    <div className="col-12 text-danger text-center my-4">
                        <h2>
                            <strong>
                                <i className="bi bi-exclamation-triangle-fill"></i>&nbsp;
                                Something Went Wrong!
                            </strong>
                        </h2>
                    </div>
                    <div className="col-12 text-center">
                        <h4>
                            <strong>
                            {error.status&&`Status code : ${error.status}`}

                            </strong>
                        </h4>
                    </div>

                    <div className="col-12 text-center">
                        <h5>
                            {error.statusText&&error.statusText}
                        </h5>
                    </div>

                    <div className="col-12 d-flex align-items-center justify-content-center text-center text-secondary my-3">
                        <h6>
                            {error.data&&error.data}
                        </h6>
                    </div>

                    <div className="col-12 d-flex align-items-center justify-content-center text-center text-warning my-3">
                        <i className='bi bi-emoji-frown' style={{fontSize: '75px'}}></i>
                    </div>

                </div>
            </div>
            <Footer />
            </div>
        </main>
        </>
    )
}

export default App