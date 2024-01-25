import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

type Props = {
    show: boolean
    takingOrders: boolean
    setShow: (x: boolean)=>void
    onAccept: ()=>void
}

export default function PauseResumeOrderModal( props : Props) {
    
    const hideModal = ()=>{
        props.setShow(false)
    }

    useEffect(()=>{

    },[])

    const handleAllow = async ()=>{
        props.onAccept()
        hideModal()
    }
    

    return (
        <Modal show={props.show} onHide={hideModal} backdrop={'static'} >
        <Modal.Header closeButton>
            <Modal.Title>
                {props.takingOrders? "Stop taking orders?" : "Start taking orders!"}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {props.takingOrders?"Your restaurant is currently taking orders. Click the stop button to stop taking orders.": "Your restaurant is currently not taking orders. Click the start button to start taking orders."}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={hideModal} >
            Close
            </Button>
            <Button variant={props.takingOrders?"danger":"success"} onClick={handleAllow} >
            {props.takingOrders?"Stop":"Start"}
            </Button>
        </Modal.Footer>
        </Modal>
    )

}
