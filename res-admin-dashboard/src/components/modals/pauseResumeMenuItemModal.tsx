import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { usePauseResumeItemModal } from '../../Contexts/menuItemModalContext'
import { ActionFunction, useActionData, useNavigation } from 'react-router'
import { makeRequest } from '../../helper/fetchData'
import { APIRoutes } from '../../helper/APIRoutes'
import { Form } from 'react-router-dom'

export default function PauseResumeMenuItemModal() {
  
  const [props,setProps] = usePauseResumeItemModal()
  const currentlyActive = props.currentlyActive
  const navigation = useNavigation()
  const hideModal = ()=>{
    setProps( (p)=>({
      ...p,
      show: false
    }))
      
  }

  const handleClick = ()=>{
    if (navigation.state === 'idle')
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
          
          <Form method='POST' action='/menu' >
            <input type='hidden' name='menuItemId' value={props.menuItemID} />
            <Button type='submit' variant={currentlyActive?"danger":"success"} disabled={navigation.state !== 'idle'} onClick={handleClick} >
            {currentlyActive?"Stop":"Start"}
            </Button>
          </Form>


      </Modal.Footer>
    </Modal>

  )
}

export const MenuPauseResumeAction : ActionFunction = async (args)=>{
  console.log('ids')
  const fd = await args.request.formData()
  console.log(fd.get('menuItemId'), 'iddd')
  const response = await makeRequest(APIRoutes.ADMIN_MENU, args.request, fd)
  return response.json
}