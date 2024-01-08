import { Link } from "react-router-dom"
import { Properties } from "../utilities/properties"
import { PATHS } from "../utilities/routeList"

const App = ()=>{

    return(
        
    
    <div className='col-12 col-md-8 p-0'>
        <div className="card shadow">
            <div className="card-header pt-3 bg-primary-subtle text-primary-emphasis">
                <h4>
                Refunds and Cancellations
                </h4>
            </div>
            <div className="card-body">
                
                <h5 className="card-title">
                    <strong>
                    1. Restaurant-Canceled Orders
                    </strong>
                </h5>
                
                <p className="card-text">
                In the event that any restaurant cancels an order for any reason, a full refund will be issued to the original payment method used for the transaction.
                </p>
                <ul className="mt-2">
                  <li>
                  Refunds will be processed within 3 business days from the date of cancellation.
                  </li>
                </ul>

                <h5 className="card-title">
                    <strong>
                    2. Customer-Requested Refunds
                    </strong>
                </h5>
                
                <p className="card-text">
                Once an order has been paid for, customers are not eligible to cancel the order. However, if customers believe they are entitled to a refund for valid reasons (e.g., quality issues, incorrect items), they may contact us within 24 hours of receiving the order. Contact information can be found <Link to={PATHS.CONTACT}> here</Link>.
                </p>
                <ul >
                  <li>
                  The refund request will be evaluated on a case-by-case basis, and refunds will be issued at the discretion of the restaurants.
                  </li>
                  <li>
                  Refund requests must include order details, a brief description of the issue, and supporting documentation such as photos if applicable.
                  </li>
                  <li>Refunds, if approved, will be credited to the original payment method used for the transaction.</li>
                </ul>

                <h5 className="card-title">
                    <strong>
                    3. Cancellation Policy
                    </strong>
                </h5>
                
                <p className="card-text">
                Customers cannot cancel an order once it has been paid for. We recommend reviewing your order carefully before completing the payment process.
                </p>
                <h5 className="card-title">
                    <strong>
                    4. Changes to refund and cancellation policy
                    </strong>
                </h5>
                
                <p className="card-text">
                  We reserve the right to modify or update this refund and cancellation policy at any time. Please check our website or contact us for the latest information.
                </p>
                
                <h5 className="card-title">
                    <strong>
                    5. Contact Us
                    </strong>
                </h5>
                
                <p className="card-text">
                    If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at <a href={`mailto:${Properties.BusinessHelpEmail}`} >{Properties.BusinessHelpEmail} </a>.
                </p>

            </div>
        </div>
    </div>
        
    )
}


export default App