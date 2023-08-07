import { useRouteError } from "react-router-dom"
import { ErrHeader } from "./components/header/header"
import { useEffect } from "react"

const App = ()=>{
    const error = useRouteError()

    useEffect(()=>{
        console.log(error)
    })

    return(
        <>
        <ErrHeader />
        <main id="main" class="main">
        <div class='row p-2 d-flex align-items-center justify-content-center'>
            <div class='col-12 col-md-6'>
                <div className="row" style={{marginTop: '150px'}}>
                    <div className="col-12 text-danger text-center my-4">
                        <h2>
                            <strong>
                                <i class="bi bi-exclamation-triangle-fill"></i>&nbsp;
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
                        <h7>
                            {error.data&&error.data}
                        </h7>
                    </div>

                    <div className="col-12 d-flex align-items-center justify-content-center text-center text-warning my-3">
                        <i class='bi bi-emoji-frown' style={{fontSize: '75px'}}></i>
                    </div>

                </div>
            </div>
            </div>
        </main>
        </>
    )
}

export default App