import { useEffect,useState } from "react"
import { Stars } from "./stars"
export const MenuTitle = (props) =>{
    const [restaurantType, setRestaurantType] = useState('')
    useEffect(
        ()=>{
            let type = ''
            props.type.forEach(
                (item)=>{
                    type = type + item + " " + String.fromCharCode(183) + " "
                }
            )
            setRestaurantType(type.slice(0,-2))
        }
    )

    return(
        <div class='card p-4 mb-0 d-flex align-items-center justify-content-center'>
            <h3>{props.name}</h3>
            <h8 class='text-secondary'>{restaurantType} </h8>
            <Stars stars={4.2} numRatings={34} withNumber={true} />
        </div>
    )
}