import { useState } from "react"

export default function App() {
  const doc = document.documentElement;
  const [isTakingOrders, setIsTakingOrders] = useState(true)
  const [fullScreenEnabled, setFullScreenEnabled] = useState(false)

  const handleClickPauseResume = ()=>{
    setIsTakingOrders(!isTakingOrders)
  }

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

  return (
    <nav className='navbar navbar-expand-lg bg-dark shadow p-2 mx-auto sticky-top' >
    <div className="container-fluid text-light">
      <div className="col-12 d-flex justify-content-center align-items-center">

        <div className="me-auto">
        </div>

        <div className="">
          <h3>
            Pizza Hut
          </h3>
        </div>
        <div className="ms-auto dropdown">
        <button className="btn btn-outline-light border-0 rounded-circle d-md-inline d-none" onClick={setFullScreen}>
              {fullScreenEnabled?
              <i className="bi bi-fullscreen-exit" style={{'fontSize': '25px'}}></i>
              :
              <i className="bi bi-fullscreen" style={{'fontSize': '25px'}}></i>}
        </button>
          
          <span className="mx-3 d-md-inline d-none">
              {isTakingOrders?"Pause Orders":"Resume Orders"}
            <button className='btn btn-outline-light border-0 rounded-circle ' onClick={handleClickPauseResume}>
              {isTakingOrders?
                <i className="bi bi-pause-circle" style={{'fontSize': '25px'}}></i>
                :
                <i className="bi bi-play-circle" style={{'fontSize': '25px'}}></i>
              }
            </button>
          </span>

          <button className='btn btn-outline-light  border-0 rounded-circle ' data-bs-toggle="dropdown">
            <i className="bi bi-person-circle" style={{'fontSize': '25px'}}></i>
          </button>

          <ul className="dropdown-menu dropdown-menu-end">
            <DropDownItem name='View Orders' icon='list'/>
            <DropDownItem name='Manage Restaurant' icon='gear-wide-connected' />
            <DropDownItem name='Logout' icon='box-arrow-right'/>
            {isTakingOrders?
            <DropDownItem name='Pause Orders' icon='pause-circle' forSmallScreenOnly onClick={handleClickPauseResume}/>:
            <DropDownItem name='Resume Orders' icon='play-circle' forSmallScreenOnly onClick={handleClickPauseResume}/>}
            
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
          
            <a className={`dropdown-item p-3 align-items-center ${display}`} href="#" onClick={handleClick}>
            <i className={`bi bi-${props.icon} mx-2`} style={{'fontSize': '25px'}}></i>
              <span>
                {props.name}
              </span>
            </a>
          
        </li>
      
    )
  }