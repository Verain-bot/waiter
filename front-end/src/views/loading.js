import {useEffect, useState} from 'react'
import { Header } from './components/header/header'

const App = ()=>{
    const [dots,setDots] = useState('.')

    useEffect(()=>{
        console.log('asd')
        setTimeout(()=>{
            if(dots.length===3){
                setDots('.')
            }else{
                setDots(dots+'.')
            }
        },600)
    })

    return(

        <div class='col-12 d-flex align-items-center justify-content-center loading flex-column' >
        <div class="spinner-border text-danger" style={{"width": "4rem", "height": "4rem"}} role="status"/>
        <h4 class='text-center m-3' >Loading{dots}</h4>
        <Header/>    
        </div>
    )
}

export default App