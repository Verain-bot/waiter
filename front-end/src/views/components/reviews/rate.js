import { useState } from "react"

export const Rate = (props) =>{
    return(
        <div class='row m-0 p-2'>
            <div class='col-12 d-flex flex-column'>
                <h3>Rate</h3>
                <div class='row pointer' style={{'fontSize': '40px'}} >
                <StarSelector />
                </div>
                <textarea placeholder="Please write your review here" class='form-control rounded'></textarea>
                <button class='btn btn-outline-dark m-2'>
                    Submit
                </button>
            </div>
            

        </div>
    )
}

export const StarSelector = props =>{
    const [stars, setStars] = useState([0,0,0,0,0])

    const click = (num)=>{
        return(()=>{
            var s = [...stars]
            for(let i=0;i<num;i++)
                {
                    s[i] = 1
                }
            
            for(let i=num; i<5;i++)
                s[i] = 0
            
            setStars(s) 
        })
    }

    return(
        <div>
            <span class='text-warning p-0'>
            {
                
                stars.map((item,key)=>{
                    if (item===1)
                        return <i class='bi bi-star-fill' onClick={click(key+1)} />
                    else
                        return <i class='bi bi-star' onClick= {click(key+1)}/>
                })
            }
            {props.numRatings&&<span class='text-dark'>({props.numRatings})</ span>}
        </span>
        </div>
    )
}