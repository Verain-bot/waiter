import {useEffect, useState} from 'react'

const App = ()=>{

    return(

        <div className='col-12 loading' >
            <div className='row ' style={{width: "100%"}}>
                <PlaceHolder />
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
        <p className="placeholder-wave">
            <span className="placeholder col-12"></span>
            <span className="placeholder col-12"></span>
            <span className="placeholder col-12"></span>
            <span className="placeholder col-4"></span>
        </p>
    )
}


export default App