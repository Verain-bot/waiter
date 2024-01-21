import { Properties } from "../utilities/properties"

const App = ()=>{

    return(
        
        
        <div className='col-12 col-md-8 p-0'>
            <div className="card shadow">
                <div className="card-header pt-3 bg-primary-subtle text-primary-emphasis">
                    <h4>
                        Privacy Policy
                    </h4>
                </div>
                <div className="card-body">
                    <p className="card-text">
                    We (ViewOne Digital Solutions Private Limited) are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal data when you use our online platform and related services ("Platform").
                    By accessing or using the Platform, you consent to the practices described in this Privacy Policy. Please take a moment to review this policy carefully.
                    </p>

                    <h5 className="card-title">
                        <strong>
                            1. Information We Collect
                        </strong>
                    </h5>
                    
                    <p className="card-text">
                        <strong>
                            1.1. Information You Provide: &nbsp;
                        </strong>
                         We may collect personal information that you voluntarily provide when you use the Platform, such as your name, contact information, payment details, and any other information you choose to share.
                    </p>

                    <p className="card-text">
                        <strong>
                            1.2. Automatically Collected Information: &nbsp;
                        </strong>
                        We may collect information about your use of the Platform, including your device information, IP address, browser type, and browsing behavior. We may use cookies and similar technologies to collect this information.
                    </p>

                    <h5 className="card-title">
                        <strong>
                            2. How We Use Your Information
                        </strong>
                    </h5>
                    
                    <p className="card-text">
                        <strong>
                            2.1. Provide Services: &nbsp;
                        </strong>
                        We use the information we collect to provide, maintain, and improve our Platform and services, process orders, and communicate with you.
                    </p>

                    <p className="card-text">
                        <strong>
                            2.2. Marketing: &nbsp;
                        </strong>
                        We may use your information to send you promotional materials and updates about our services if you have opted in to receive such communications.
                    </p>

                    <h5 className="card-title">
                        <strong>
                        3. Disclosure of Your Information
                        </strong>
                    </h5>
                    
                    <p className="card-text">
                        <strong>
                        3.1. Third-Party Service Providers: &nbsp;
                        </strong>
                        We may share your information with third-party service providers who assist us in operating the Platform, processing payments, and delivering our services.
                    </p>

                    <p className="card-text">
                        <strong>
                        3.2. Legal Requirements: &nbsp;
                        </strong>
                        We may disclose your information if required to do so by law or in response to a valid legal request, such as a court order or government investigation.
                    </p>

                    <h5 className="card-title">
                        <strong>
                            4. Data Security
                        </strong>
                    </h5>
                    
                    <p className="card-text">
                        We take reasonable measures to protect your personal information from unauthorized access and use. However, no data transmission over the internet can be guaranteed as completely secure, so we cannot ensure or warrant the security of any information you transmit to us.
                    </p>

                    <h5 className="card-title">
                        <strong>
                        5. Your Choices
                        </strong>
                    </h5>
                    
                    <p className="card-text">
                        You can control how we use and share your personal information by adjusting your privacy settings within the Platform or by contacting us directly. You may also opt out of receiving marketing communications from us at any time.
                    </p>
                    <h5 className="card-title">
                        <strong>
                        6. Changes to this Privacy Policy
                        </strong>
                    </h5>
                    
                    <p className="card-text">
                        We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any significant changes by posting a revised Privacy Policy on our website or by other means.
                    </p>

                    <h5 className="card-title">
                        <strong>
                        7. Contact Us
                        </strong>
                    </h5>
                    
                    <p className="card-text">
                        If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at <a href={`mailto:${Properties.FeedbackEmail}`}> {Properties.FeedbackEmail} </a> .
                    </p>


                </div>
            </div>
        </div>
        
    )
}


export default App