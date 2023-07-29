import { NavLink } from 'react-router-dom'
import  RouteList,{NAV} from '../../../routeList'

export const SideBar = (props) =>{
    return(

    <aside id="sidebar" class="sidebar">

        <ul class="sidebar-nav" id="sidebar-nav">

        
            {RouteList.filter((item) => item.nav.includes(NAV)).map((item,key)=>(
                <SideBarItem name={item.name} iconName={`bi-${item.icon}`} link={item.path} key={key} />
            ))}

            {//<li class="nav-heading">Pages</li>}
            }


        </ul>

  </aside>
        
    )
}

export const ToggleSideBar = (props) =>{

    const toggle = ()=>{
        document.body.classList.toggle('toggle-sidebar')
    }

    return(
        <div class="d-flex align-items-center justify-content-between">
            <i class="bi bi-list toggle-sidebar-btn" onClick={toggle} ></i>
        </div>
    )
}

const SideBarItem = (props) =>{
    const toggle = ()=>{
        document.body.classList.toggle('toggle-sidebar')
    }

    return(
        <li class="nav-item">
            
            <NavLink className={({isActive, isPending})=>isActive?'nav-link':isPending?'nav-link collapsed':'nav-link collapsed'} to={props.link} onClick={toggle}>
                <i class={"bi " + props.iconName}></i>
                <span>{props.name}</span>
            </NavLink>
        </li>
    )
}