import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

type Props = {
    onAccept: ()=>void
}

export default function PromptModal( props : Props) {

    const [show, setShow] = useState(false)
    
    const hideModal = ()=>{
        setShow(false)
    }

    const showModal = ()=>{
        setShow(true)
    }

    useEffect(()=>{

        if ('Notification' in window && Notification.permission !== 'granted')
        {
            const t = setTimeout( showModal , 1000)
            return ()=>{
                clearTimeout(t)
            }
        }
    },[])

    const handleAllow = async ()=>{
        const p = await Notification.requestPermission()
        props.onAccept()
        try{
            hideModal()
        }
        catch(e){
            console.error(e)
        }
    }

    if (!('Notification' in window))
    return(
        <></>
        )

    if (Notification.permission==='default')
    return (
        <Modal show={show} onHide={hideModal} backdrop={'static'} >
        <Modal.Header closeButton>
            <Modal.Title>Allow Notifications!</Modal.Title>
        </Modal.Header>
        <Modal.Body>We will send you notification each time you have an order. Please click allow to get notifications.</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={hideModal} >
            Close
            </Button>
            <Button variant="primary" onClick={handleAllow} >
            Allow
            </Button>
        </Modal.Footer>
        </Modal>
    )

    else if (Notification.permission==='denied')
    return(
        <Modal show={show} onHide={hideModal} backdrop={'static'} >
        <Modal.Header closeButton>
            <Modal.Title>Allow Notifications!</Modal.Title>
        </Modal.Header>
        <Modal.Body>We will send you notification each time you have an order.
            <br/><br/> It seems you have denied our notification request. In order to get the best experience please allow notifications.
            <br/><br/> If you are on your phone, you can go to the browser settings.
            <br/><br/> For PC you can click on the <i className='bi bi-lock' /> icon on your address bar.</Modal.Body>
        <Modal.Footer>
            <Button variant="danger" onClick={hideModal} >
            Close
            </Button>
        </Modal.Footer>
        </Modal>
    )

    return(
        <></>
    )

}
