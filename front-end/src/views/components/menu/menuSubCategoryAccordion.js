import { useState } from "react"

export const MenuAccordion = (props) => {
    const [id,setId] = useState('MenuAccordion'+props.name.replace(' ',''))

    return(
    <div class="accordion mx-0 p-0 mb-3 mt-0" id={id+'accordion'}>
    <div class="accordion-item">
        <h2 class="accordion-header" id="panelsStayOpen-headingOne">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#"+id} aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
            {props.name}
        </button>
        </h2>
        <div id={id} class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
        <div class="accordion-body container">
            {props.children}
        </div>
        </div>
    </div>
    
    </div>
    )
}