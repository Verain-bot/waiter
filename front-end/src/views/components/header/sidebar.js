export const SideBar = (props) =>{
    return(

    <aside id="sidebar" class="sidebar">

        <ul class="sidebar-nav" id="sidebar-nav">

        
            <SideBarItem name='Dashboard' collapsed={false} iconName='bi-grid' />

            <li class="nav-heading">Pages</li>

            <SideBarItem name='Profile' collapsed={true} iconName='bi-person' />

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
    return(
        <li class="nav-item">
            <a class={props.collapsed?'nav-link collapsed':'nav-link'} href="">
                <i class={"bi " + props.iconName}></i>
                <span>{props.name}</span>
            </a>
        </li>
    )
}