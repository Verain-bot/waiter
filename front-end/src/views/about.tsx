import { Properties } from "../utilities/properties"

const App = ()=>{

    return(
        
        
        <div className='col-12 col-md-8 p-0'>
            <div className="card shadow">
                <div className="card-header pt-3 bg-primary-subtle text-primary-emphasis">
                    <h4>
                        About Us
                    </h4>
                </div>
                <div className="card-body">
                    <h5 className="card-title">
                        <strong>
                            Who are we?
                        </strong>
                    </h5>
                    <p className="card-text">
                        We are a team of passionate individuals who are trying to make the world a better place by making it easier for people to order food from their favourite restaurants.
                    </p>
                    <p className="card-text">
                        Our goal is to make the process of ordering food as simple as possible. We are constantly working on improving our platform and adding new features to make it easier for you to order food.
                    </p>

                    <p className="card-text">
                        We make the process for ordering food as simple as possible for the end user so that they don't have to waste their valueable time and effort in ordering food. We also make it easier for the restaurants to manage their orders and provide a better experience to their customers. We help restaurants reduce their costs and also provide them with better analytics which were earlier not possible.
                    </p>

                    <p className="card-text">
                        We want to provide the best experience to our customers as well as the restaurants by reducing the friction in the process of ordering food. We are constantly working on improving our platform and adding new features to make it easier for you to order food.
                    </p>

                    <h5 className="card-title">
                        <strong>
                            Our Platform
                        </strong>
                    </h5>

                    <p className="card-text">
                        This platform is currently under construction and we are working on adding more restaurants and features. If you have any suggestions or feedback, please let us know at <a href={`mailto:${Properties.FeedbackEmail}`}> {Properties.FeedbackEmail} </a> .
                    </p>

                    <p className="card-text">
                        This website is currently designed for mobile devices and therefore may appear different on big screen devices. We are working on a desktop version and it will be available soon.
                    </p>

                    <h5 className="card-title">
                        <strong>
                            Our team
                        </strong>
                    </h5>

                    <p className="card-text">
                        Our team consists of passionate individuals who are trying to make the world a better place. We are constantly working on improving our platform and adding new features to make it easier for you to order food.
                    </p>

                    <h5 className="card-title">
                        <strong>
                            How did we start
                        </strong>
                    </h5>

                    <p className="card-text">
                        One day our founder was in a crowded self service restaurant. He waited in line for 10 minutes and after that he placed an order. After waiting for 30 more minutes the restaurant staff called out his name for him to pick up the order. This was when he realised that this process could be alot simpler for the customer as well as for the restaurant. With this idea in mind, he started working on this platform.
                    </p>

                </div>
            </div>
        </div>
        
    )
}


export default App