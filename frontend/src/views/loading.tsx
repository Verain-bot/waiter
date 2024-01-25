import {useEffect, useState} from 'react'

const App = ()=>{

    return(

        <div className='col-12 loading' >
            <div className='row ' style={{width: "100%"}}>
                <PlaceHolder />
                <PlaceHolder />
                <PlaceHolder />
                <PlaceHolder />
                
            </div>
        </div>
    )
}


export const PlaceHolder = ()=>{
    return(
        <div className='card shadow my-2 mx-3 px-0 '>
            <div className='card-header px-3 bg-secondary-subtle'>
                <span className="placeholder col-4"></span>
            </div>
            <div className='card-body'>

            <p className="placeholder-wave">
                <span className="placeholder col-12"></span>
                <span className="placeholder col-9"></span>
                <span className="placeholder col-10"></span>
            </p>
            </div>
        </div>
    )
}

export const PlaceHolderSimple = ()=>{
    return (
        <p className="placeholder-wave">
            <span className="placeholder col-12"></span>
            <span className="placeholder col-9"></span>
            <span className="placeholder col-10"></span>
        </p>
    )
}


export default App