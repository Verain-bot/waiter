import { useContext, useEffect, useRef, useState } from "react"
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min';
import { MessageContext } from "../App";

const App = () =>{

    const ref = useRef(null)
    const [Modal, setModal] = useState(null)
    const [message, setMessage] = useContext(MessageContext)

    useEffect(()=>{
        if (Modal === null)
            setModal(new bootstrap.Modal(ref.current,{
                'backdrop':'true',
            }))
        if (message.body !== ''){
            open()
        }
    }, [message])

    const open = ()=>{
        Modal.show()
    }

    const close = ()=>{
        Modal.hide()
    }

    return(
        <>
        <div class="modal fade" id="message" tabindex="-1" role="dialog" ref={ref}>
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class={`modal-header ${message.type==='error'?'text-danger':''}`} >
                <h5 class="modal-title" >{message.heading}</h5>
                <button class="btn" onClick={close} aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class={`modal-body ${message.type==='error'?'text-danger':''}`}>
                {message.body}
            </div>
            <div class="modal-footer">
                <button type="button" class={`btn btn-outline-${message.type==='error'?'danger':'dark'}`} onClick={close}>Close</button>
            </div>
            </div>
        </div>
        </div>
        </>
        
    )
}

export default App