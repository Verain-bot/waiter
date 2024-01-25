import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { usePauseResumeItemModal } from '../../Contexts/menuItemModalContext'

export default function PauseResumeMenuItemModal() {
  const currentlyActive = useState<boolean | null>(null)

  const [props,setProps] = usePauseResumeItemModal()

  const hideModal = ()=>{
    setProps({show: false, menuItemID: '', itemName: ''})
  }

  const handleAllow = async ()=>{
    hideModal()
  }

  return (
    <Modal show={props.show} onHide={hideModal} backdrop={'static'} >
      <Modal.Header closeButton>
          <Modal.Title>
              {currentlyActive? `Pause taking orders for ${props.itemName} ?` : `Start taking orders for ${props.itemName}!`}
          </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          {currentlyActive?`You are currently taking orders for ${props.itemName}. Click the stop button to stop taking orders.`: `You are currently not taking orders for ${props.itemName}. Click the start button to start taking orders.`}
      </Modal.Body>
      <Modal.Footer>
          <Button variant="secondary" onClick={hideModal} >
          Close
          </Button>
          <Button variant={currentlyActive?"danger":"success"} onClick={handleAllow} >
          {currentlyActive?"Stop":"Start"}
          </Button>
      </Modal.Footer>
    </Modal>

  )
}
