import { Stars } from "../menu/stars"

export const ReviewItem = (props) =>{
    return(
        
            <div class='row m-0 p-2'>
                <hr/>
                <div class='col-12 d-flex flex-column'>
                    <strong class='p-0'>{props.name}</strong>
                    <Stars stars={props.stars} withNumber/>
                    <p>{props.body}</p>
                </div>
            </div>
        
    )
}