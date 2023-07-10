import { useEffect, useState } from "react"

export const Stars = (props) =>{
    const [stars,setStars] = useState([0,0,0,0,0])

    useEffect(()=>{
        let s = []
        let numStars = props.stars
        for (let i=0;i<5;i++){
            if (numStars>=1){
                s.push(1)
                numStars--
            }
            else if (numStars>=0.5){
                s.push(0.5)
                numStars-=0.5
            }
            else{
                s.push(0)
            }
        }


        setStars(s)
        
    },[])

    return(
        <span class='text-warning p-0'>
            {props.withNumber&&<b>{props.stars} </b>}
            {
                stars.map((item)=>{
                    if (item===1)
                        return <i class='bi bi-star-fill' />
                    else if (item===0.5)
                        return <i class='bi bi-star-half' />
                    else
                        return <i class='bi bi-star' />
                })
            }
            {props.numRatings&&<span class='text-dark'>({props.numRatings})</ span>}
        </span>
    )
}