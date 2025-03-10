import React, { useEffect, useState } from "react"
import { APIRoutes } from "../helper/APIRoutes";
import { getData, makeRequest } from "../helper/fetchData";
import PauseResumeOrderModal from "./modals/pauseResumeOrderModal";
import { Views } from "../App";
import { useOrderContext } from "../Contexts/orderContext";
import { useLocation, useNavigate } from "react-router";
import { PATHS } from "../helper/routeList";
import { Link } from "react-router-dom";
import { BASEUrl } from "../helper/fetchData";

type Props = {
  name: string
}

export default function App( props: Props) {
  const doc = document.documentElement;
  const [isTakingOrders, setIsTakingOrders] = useState(true)
  const [fullScreenEnabled, setFullScreenEnabled] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [orders, setOrders] = useOrderContext()

  const newOrderAvailable = orders? orders.filter((order)=>order.orderStatus === 'NOT_CONFIRMED').length>0 : false
  const location = useLocation()
  const navigate = useNavigate()

  const handleClickPauseResumeOrders = async ()=>{
    const r = new Request(APIRoutes.ADMIN_ACCEPTING_ORDERS, {
      method: 'POST',
    })
    
    setFetching(true)
    try{

      const  {json} = await makeRequest(APIRoutes.ADMIN_ACCEPTING_ORDERS, r, new FormData())
      setFetching(false) 
      setIsTakingOrders(json.available)
    }
    catch(err){
      console.log(err)
      setFetching(false)

    }
  }

  const init = async ()=>{
    try{
      const response = await getData(APIRoutes.ADMIN_ACCEPTING_ORDERS, new AbortController().signal)
      const json = await response.json()
      setIsTakingOrders(json.available)
    }
    catch(err){
    }
  }

  useEffect(()=>{
    init()
  },[])

  const setFullScreen = ()=>{
    if(!fullScreenEnabled &&doc.requestFullscreen)
    {
      doc.requestFullscreen();
      setFullScreenEnabled(true)
    }
    
    else if(fullScreenEnabled)
    {
      document.exitFullscreen();
      setFullScreenEnabled(false)
    }
  }

  const changeView = ()=>{
    if(location.pathname === PATHS.ORDER_LIST){
      navigate(PATHS.ITEM_LIST)
    }
    else if (location.pathname === PATHS.ITEM_LIST){
      navigate(PATHS.ORDER_LIST)
    }
    else{
      navigate(PATHS.ORDER_LIST)
    }
  }

  return (
    <nav className='navbar navbar-expand-lg bg-dark shadow p-2 mx-auto sticky-top' >
      <PauseResumeOrderModal show={showModal} setShow={setShowModal} takingOrders={isTakingOrders} onAccept={handleClickPauseResumeOrders} />
    <div className="container-fluid text-light">
      <div className="col-12 d-flex justify-content-center align-items-center">

        <div className="me-auto">
        </div>

        <div className="">
          <h3>
            {props.name}
          </h3>
        </div>
        <div className="ms-auto dropdown d-flex align-items-center justify-content-center">

        <button className="btn btn-outline-light border-0 rounded-circle position-relative" onClick={changeView}>
          <i className="bi bi-arrow-left-right" style={{'fontSize': '25px'}}></i>
          {newOrderAvailable && <div className="red-dot position-absolute" style={{top: '5px', right: '5px'}} />}
        </button>

        <button className="btn btn-outline-light border-0 rounded-circle d-md-inline d-none" onClick={setFullScreen}>
              {fullScreenEnabled?
              <i className="bi bi-fullscreen-exit" style={{'fontSize': '25px'}}></i>
              :
              <i className="bi bi-fullscreen" style={{'fontSize': '25px'}}></i>}
        </button>
          
          <div className="mx-3 d-flex align-items-center justify-content-center">
            <span className="d-md-block d-none">
              {isTakingOrders?"Pause Orders":"Resume Orders"}
            </span>

            <button className='btn btn-outline-light border-0 rounded-circle ' onClick={()=>setShowModal(true)} disabled={fetching}>
              {isTakingOrders?
                <i className="bi bi-pause-circle" style={{'fontSize': '25px'}} ></i>
                :
                <i className="bi bi-play-circle" style={{'fontSize': '25px'}} ></i>
              }
            </button>
              
              <div className={isTakingOrders?"green-dot": "red-dot"} data-bs-theme='dark'></div>
          </div>

          

          <button className='btn btn-outline-light  border-0 rounded-circle ' data-bs-toggle="dropdown">
            <i className="bi bi-person-circle" style={{'fontSize': '25px'}}></i>
          </button>

          <ul className="dropdown-menu dropdown-menu-end">
            <DropDownItem name='View Orders' icon='list' href={BASEUrl + APIRoutes.ADMIN_ORDERS_ADMIN} newTab />
            <DropDownItem name='Manage Restaurant' icon='gear-wide-connected' href={BASEUrl+APIRoutes.ADMIN_RESTAURANT_ADMIN} newTab />
            <DropDownItem name='Menu' icon='grid' href={PATHS.MENU_LIST} />
            <DropDownItem name='Logout' icon='box-arrow-right' href={BASEUrl+APIRoutes.ADMIN_LOGOUT}/>
          </ul>
        </div>
        
      </div>  
      
    </div>
  </nav>

  )
}

type DropDownItemProps = {
    name: string
    icon: string
    forSmallScreenOnly?: boolean
    onClick?: ()=>void
    href: string
    newTab?: boolean
  }

  const DropDownItem = (props : DropDownItemProps)=>{
    const display = props.forSmallScreenOnly?'d-md-none':'d-flex'

    const handleClick = ()=>{
      if(props.onClick)
      {
        props.onClick()
      }
    }

    return (
      
        <li>
            <Link className={`dropdown-item p-3 align-items-center ${display}`} to={props.href} onClick={handleClick} target={props.newTab?"_blank":"_self"}>
            <i className={`bi bi-${props.icon} mx-2`} style={{'fontSize': '25px'}}></i>
              <span>
                {props.name}
              </span>
            </Link>
        </li>
      
    )
  }
