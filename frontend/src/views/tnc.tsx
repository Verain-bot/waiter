import { useLocation } from "react-router-dom"
import { Properties } from "../utilities/properties"
import { useEffect } from "react"

const App = ()=>{

    return(
        
        
        <div className='col-12 col-md-8 p-0'>
            <div className="card shadow">
                <div className="card-header pt-3 bg-primary-subtle text-primary-emphasis">
                    <h4>
                    Terms and Conditions
                    </h4>
                </div>
                <div className="card-body">
                    <p className="card-text">
                    These Terms and Conditions ("Terms") govern your use of toOne website (the "Platform"), which is operated by toOne ("we," "our," or "us"). By accessing or using the Platform, you agree to comply with and be bound by these Terms. If you do not agree with these Terms, please do not use the Platform.
                    </p>

                    <h5 className="card-title">
                        <strong>
                        1. Use of the Platform
                        </strong>
                    </h5>
                    
                    <p className="card-text">
                        <strong>
                        1.1. Eligibility:  &nbsp;
                        </strong>
                        You must be of legal age in your jurisdiction to use the Platform. By using the Platform, you represent and warrant that you meet this eligibility requirement
                    </p>

                    <p className="card-text">
                        <strong>
                        1.2. License:  &nbsp;
                        </strong>
                        We grant you a limited, non-exclusive, non-transferable, and revocable license to use the Platform for your personal or business use, subject to these Terms.
                    </p>

                    <h5 className="card-title">
                        <strong>
                        2. User Accounts
                        </strong>
                    </h5>
                    
                    <p className="card-text">
                        <strong>
                        2.1. Registration: &nbsp;
                        </strong>
                        To access certain features of the Platform, you may be required to create an account. You agree to provide accurate and complete information during the registration process and to keep your account information up to date.
                    </p>

                    <p className="card-text">
                        <strong>
                        2.2. Security:  &nbsp;
                        </strong>
                        You are responsible for maintaining the confidentiality of your account credentials and for any activity that occurs under your account. You must notify us immediately of any unauthorized access or use of your account.
                    </p>

                    <h5 className="card-title">
                        <strong>
                        3. User Content
                        </strong>
                    </h5>
                    
                    <p className="card-text">
                        <strong>
                        3.1. Ownership: &nbsp;
                        </strong>
                        Any content, including menus, images, and other materials you upload or share on the Platform ("User Content"), remains your intellectual property. However, by sharing User Content, you grant us a worldwide, royalty-free, sublicensable, and transferable license to use, reproduce, distribute, and display the User Content for the purpose of providing and promoting the Platform.
                    </p>

                    <p className="card-text">
                        <strong>
                        3.2. Prohibited Content: &nbsp;
                        </strong>
                        You may not upload or share User Content that is illegal, infringing, defamatory, or otherwise violates these Terms. We reserve the right to remove or disable any User Content that violates these Terms.
                    </p>

                    <h5 className="card-title">
                        <strong>
                        4. Termination
                        </strong>
                    </h5>
                    
                    <p className="card-text">
                    We may terminate or suspend your access to the Platform at our discretion, with or without cause, and without prior notice. Upon termination, your rights to use the Platform will cease immediately.
                    </p>

                    <h5 className="card-title">
                        <strong>
                        5. Disclaimers and Limitations of Liability
                        </strong>
                    </h5>
                    
                    <p className="card-text">
                        <strong>
                        5.1. No Warranty:  &nbsp;
                        </strong>
                        The Platform is provided "as is" and "as available" without any warranties, express or implied. We make no representations or warranties regarding the accuracy, reliability, or availability of the Platform.
                    </p>

                    <p className="card-text">
                        <strong>
                        5.2. Limitation of Liability: &nbsp;
                        </strong>
                        To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of profits or revenues, whether incurred directly or indirectly.
                    </p>

                    <h5 className="card-title">
                        <strong>
                        6. Changes to these Terms
                        </strong>
                    </h5>
                    
                    <p className="card-text">
                    We may update these Terms from time to time. Any changes will be posted on the Platform, and it is your responsibility to review them periodically. Your continued use of the Platform after the posting of changes constitutes your acceptance of the updated Terms.
                    </p>
                    
                    <h5 className="card-title">
                        <strong>
                        7. Contact Us
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