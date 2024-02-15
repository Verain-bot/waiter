import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { sendPushToken } from '../../utilities/firebase';

const NotificationPromptModal = ()=>{
    const [show,setShow] = useState(false)

    const closeModal = ()=>{
        setShow(false)
    }

    const openModal = ()=>{
        setShow(true)
    }

    const handleAllow = async ()=>{
        if ('Notification' in window)
        {
            const permission = await Notification.requestPermission()
            sendPushToken('token')
            closeModal()
        }
    }

    useEffect(()=>{

        if ('Notification' in window && Notification.permission !== 'granted')
        {
            const t = setTimeout(openModal, 2000)

        return ()=>{
            clearTimeout(t)
        }
    }
    },[])

    if (!('Notification' in window))
    return(
        <></>
        )


    if (Notification.permission === 'default')
    return(
        <Modal show={show} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Get order updates!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please allow notifications to get order updates in real time. </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAllow}>
            Allow Notifications
          </Button>
        </Modal.Footer>
      </Modal>
    )

    else if (Notification.permission==='denied')
    return(
        <Modal show={show} onHide={closeModal} backdrop={'static'} >
        <Modal.Header closeButton>
            <Modal.Title>Please allow notifications for best experience!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <strong>Please allow notfications to get real time updates to your orders.</strong>
            <br/><br/> It seems you have denied our notification request. In order to get the best experience please allow notifications.
            <br/><br/> If you are on your phone, you can go to the browser settings.
            <br/><br/> For PC you can click on the <i className='bi bi-lock' /> icon on your address bar.</Modal.Body>
        <Modal.Footer>
            <Button variant="danger" onClick={closeModal} >
            Close
            </Button>
        </Modal.Footer>
        </Modal>
    )
    
    else
        return null
}

export default NotificationPromptModal