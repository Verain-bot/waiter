import { Check, TextInput } from "./inputs"

export const FormCard = (props) => {
    return(
        <div class="container">

      <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">


              <div class="card mb-3">

                <div class="card-body">

                  <div class="pt-4 pb-2">
                    <h5 class="card-title text-center pb-0 fs-4">{props.title}</h5>
                    <p class="text-center small">{props.subtitle}</p>
                  </div>

                  <form class="row g-3 needs-validation" novalidate>

                    {props.inputs.map((input) => (input))}                    
                    

                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

    </div>
    )
}