import { Check, TextInput } from "./inputs"

export const FormCard = (props) => {
    return(
          
            <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center" style={{'height':'80vh'}}>

              <div class="card">

                <div class="card-body">

                  <div class="pt-4 pb-2">
                    <h5 class="card-title text-center pb-0 fs-4">{props.title}</h5>
                    <p class="text-center medium">{props.subtitle}</p>
                  </div>

                  <form class="row g-3" novalidate>

                    {props.inputs.map((input) => (input))}                    
                    

                  </form>

                </div>
              </div>
            </div>
          
  

    )
}