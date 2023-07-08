import { Stars } from "../menu/stars"
export const RestaurantListItem = (props)=>{
    return (
        <div class="col-md-6 col-lg-5 card pointer p-2 mb-3 d-flex flex-row shadow align-items-center m-md-3" >
            <div class='row'>

            <div class='col-4'>
            <img class='img-thumbnail rounded border-0 p-0 shadow' src={props.img} alt="No Image Found" />
            </div>

            <div class='col-8'>
            
                <div class='row card-title p-1 pb-0'>
                    {props.name}
                    <span class='small p-0'>
                    <Stars stars={4.5} numRatings={389} withNumber={true} />
                    </span>
                    <span class='small p-0 text-muted'>
                        {props.type}
                    </span>
                </div>
                
            </div>

            </div>
        </div>
    )
}
