
export default function App() {
  return (
    <nav className='navbar navbar-expand-lg bg-dark shadow p-2 mx-auto sticky-top'>
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
          <span>

              Pause Orders
            <button className='btn btn-outline-light border-0 rounded-circle'>
              <i className="bi bi-pause-circle" style={{'fontSize': '25px'}}></i>
            </button>
          </span>

          <button className='btn btn-outline-light  border-0 rounded-circle ' data-bs-toggle="dropdown">
            <i className="bi bi-person-circle" style={{'fontSize': '25px'}}></i>
          </button>

          <ul className="dropdown-menu dropdown-menu-end">
            <DropDownItem name='View Orders' icon='list'/>
            <DropDownItem name='Manage Restaurant' icon='gear-wide-connected' />
            <DropDownItem name='Logout' icon='box-arrow-right'/>
            
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
  }
  const DropDownItem = (props : DropDownItemProps)=>{
    return (
      
        <li>
          
            <a className="dropdown-item p-3 align-items-center  d-flex" href="#">
            <i className={`bi bi-${props.icon} mx-2`} style={{'fontSize': '25px'}}></i>
              {props.name}
            </a>
          
        </li>
      
    )
  }