import { useContext, useEffect, useRef, useState } from "react"
import * as bootstrap from 'bootstrap';
import { useMessageContext } from "../context/MessageContext";


const App = () =>{

    const ref : React.RefObject<HTMLDivElement> | null = useRef(null)
    const [Modal, setModal] = useState<null | bootstrap.Modal >(null)
    const [message, setMessage] = useMessageContext()

    useEffect(()=>{
        if (Modal === null && ref.current !== null)
            setModal(new bootstrap.Modal(ref.current))
        if (message.body !== ''){
            open()
        }
    }, [message])

    const open = ()=>{
        if(Modal !== null)
            Modal.show()
    }

    const close = ()=>{
        if(Modal !== null)
            Modal.hide()
    }

    return(
        <>
        <div className="modal fade" id="message" tabIndex={-1} role="dialog" ref={ref}>
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className={`modal-header ${message.type==='error'?'text-danger':''}`} >
                <h5 className="modal-title" >{message.heading}</h5>
                <button className="btn" onClick={close} aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className={`modal-body ${message.type==='error'?'text-danger':''}`}>
                {message.body}
            </div>
            <div className="modal-footer">
                <button type="button" className={`btn btn-outline-${message.type==='error'?'danger':'dark'}`} onClick={close} data-bs-dismiss='modal'>Close</button>
            </div>
            </div>
        </div>
        </div>
        </>
        
    )
}

export default App