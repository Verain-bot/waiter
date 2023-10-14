import { Properties } from "../utilities/properties"

const App = ()=>{

    return(
        
        
        <div className='col-12 col-md-8 p-0'>
            <div className="card shadow">
                <div className="card-header pt-3 bg-primary-subtle text-primary-emphasis">
                    <h4>
                        Progressive Web App (PWA)
                    </h4>
                </div>
                <div className="card-body">
                    <p className="card-text">
                        This is a Progressive Web App (PWA). It is a web application that uses modern web capabilities to deliver an app-like experience to users. These apps meet certain requirements, are deployed to servers, accessible through URLs, and indexed by search engines. They can be installed by users to their home screens, making them available to users even when offline.
                    </p>

                    <h5 className="card-title">
                        <strong>
                        Installing on iOS
                        </strong>
                    </h5>

                    <p className="card-text">
                        <ul>
                            <li>
                                <strong> Open Safari</strong>
                                &nbsp;Open the Safari web browser on your iOS device.
                            </li>

                            <li>
                                <strong> Navigate to the PWA</strong>
                                &nbsp;Using the Safari browser, go to the website that offers the PWA you want to install. Ensure that the website is PWA-compatible, as not all websites offer this feature.
                            </li>

                            <li>
                                <strong> Access the "Share" Menu</strong>
                                &nbsp;Once you're on the PWA website, find the "Share" button. It's usually represented by a square icon with an arrow pointing upwards. This button is typically located at the bottom center or top right corner of your Safari browser window.
                            </li>

                            <li>
                                <strong> Choose "Add to Home Screen"</strong>
                                &nbsp;From the "Share" menu, select "Add to Home Screen." This option is indicated by an icon resembling a plus sign within a square.
                            </li>

                            <li>
                                <strong> Use like a normal App</strong>
                                &nbsp;You can start using the PWA like a normal app. It will appear on your home screen like any other app shortcut or widget, so you can drag it around and put it wherever you like.
                            </li>
                            

                        </ul>
                    </p>


                    <h5 className="card-title">
                        <strong>
                        Installing on Android
                        </strong>
                    </h5>

                    <p className="card-text">
                        <ul>
                            <li>
                                <strong> Open Google Chrome</strong>
                                &nbsp;Make sure you're using the Google Chrome browser on your Android device, as it provides the best support for PWAs.
                            </li>

                            <li>
                                <strong> Visit the PWA</strong>
                                &nbsp;Using the Google Chrome browser, navigate to the website that offers the PWA you want to install. Ensure that the website is PWA-compatible, as not all websites offer this feature.
                            </li>

                            <li>
                                <strong> Access the "More" Menu</strong>
                                &nbsp;Tap the three vertical dots (often referred to as the "More" menu) in the upper-right or lower-right corner of the Chrome browser window to open the menu.
                            </li>

                            <li>
                                <strong> Choose "Add to Home Screen"</strong>
                                &nbsp;From the "More" menu, select the "Add to Home screen" option. This will add the PWA to your Android device's home screen.
                            </li>

                            <li>
                                <strong> Confirm Installation</strong>
                                &nbsp;A dialog box will appear, allowing you to confirm the installation. 
                            </li>

                            <li>
                                <strong> Use like a normal App</strong>
                                &nbsp;You can start using the PWA like a normal app. It will appear on your home screen like any other app shortcut or widget, so you can drag it around and put it wherever you like.
                            </li>
                            

                        </ul>
                    </p>


                </div>
            </div>
        </div>
        
    )
}


export default App