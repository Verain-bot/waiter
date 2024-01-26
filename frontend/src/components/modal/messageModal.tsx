import { useEffect, useState } from "react"
import { useMessageContext } from "../../context/MessageContext";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const App = () =>{

    const [message, setMessage] = useMessageContext()
    const [show, setShow] = useState(false)

    useEffect(()=>{
        if (message.body !== '')
            open()
        
    }, [message])

    const open = ()=>{
        setShow(true)
    }

    const close = ()=>{
        setShow(false)
    }

    return(
        <Modal show={show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>{message.heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {message.body}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={close}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default App