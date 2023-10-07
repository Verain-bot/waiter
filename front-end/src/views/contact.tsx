import { Properties } from "../utilities/properties"

const App = ()=>{

    return(
        
        
        <div className='col-12 col-md-6'>
            <div className="card shadow">
                <div className="card-header pt-3 bg-primary-subtle text-primary-emphasis">
                    <h4>
                        Contact Us
                    </h4>
                </div>
                <div className="card-body">
                    <h5 className="card-title">
                        <strong>
                            Need Help regarding an order?
                        </strong>
                    </h5>
                    <p className="card-text">
                        If you have a query or an issue regarding an order, please contact the restaurant directly. You can find the restaurant's contact details on the order details page.
                    </p>
                    <p className="card-text">
                        If you are unable to reach the restaurant, please contact us at <a href={`mailto:${Properties.ContactHelpEmail}`}> {Properties.ContactHelpEmail} </a> .
                    </p>

                    <h5 className="card-title">
                        <strong>
                            Want to partner with us?
                        </strong>
                    </h5>

                    <p className="card-text">
                        If you would like to partner with us, or have any other business related query please contact us at <a href={`mailto:${Properties.BusinessHelpEmail}`}> {Properties.BusinessHelpEmail} </a> .
                    </p>

                    <p className="card-text">
                        You can also call us at <a href={`tel:${Properties.BusinessHelpPhone}`}> {Properties.BusinessHelpPhone} </a> .
                    </p>

                    <h5 className="card-title">
                        <strong>
                            Have feedback or suggestions?
                        </strong>
                    </h5>

                    <p className="card-text">
                        Your opinion matters to us and we take it very seriously. If there was something that you did not like about our service or platform or any suggestions for improvement, please email us at <a href={`mailto:${Properties.FeedbackEmail}`}> {Properties.FeedbackEmail} </a> .
                    </p>

                </div>
            </div>
        </div>
        
    )
}


export default App