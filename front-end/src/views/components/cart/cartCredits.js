import { Check } from "../forms/inputs"

export const CartCredits = (props) =>{
    return(
        <div class='row card shadow'>
            <h5 class='card-title mb-0 pb-1'>Credits</h5>
            <div class='row'>
                
                <div class='col-8 '>
                    Total Store Credits
                </div>

                <div class='col-4 text-end'>
                    90
                </div>

            </div>
            <div class='row mb-3'>
                <div class='col-8'>
                    Use Credits:
                </div>

                <div class='col-4 d-flex flex-row-reverse'>
                    <Check />
                </div>
            </div>
            
            <p class='card-text small my-0 px-2'>*Credits are earned when the order is completed. They can be used for future purchases.</p>
            <p class='card-text small my-0 px-2'>**Minimum credits required are 100 to redeem.</p>
        </div>
    )
}