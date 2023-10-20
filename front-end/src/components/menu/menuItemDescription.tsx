import { useState } from "react"

const App = (props : {desc: string})=>{
    const descLen = 65
    const shortDesc = props.desc.slice(0,descLen)+'...'

    const [showMore, setShowMore] = useState(false)
    
    const handleClick = ()=>{
        if (props.desc.length>descLen)
            setShowMore((prev)=>!prev)
    }

    return(
        <div className='row'>
            <span className='card-text text-secondary small' onClick={handleClick}>
                {
                    props.desc.length<descLen?props.desc:showMore? props.desc: <>{shortDesc} <strong className="text-dark">Read More</strong></>
                }
            </span>
        </div>
    )
}

export default App