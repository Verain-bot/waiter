export const AccountDropDown = (props) =>{
    return (
        <li class="nav-item dropdown pe-3">

          <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
            <img src="assets/img/profile-img.jpg" alt="Profile" class="rounded-circle"/>
            <span class="d-none d-md-block dropdown-toggle ps-2">K. Anderson</span>
          </a>

          <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
            <li class="dropdown-header">
              <h6>Kevin Anderson</h6>
              <span>Web Designer</span>
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>


            <DropDownItem divider={true} name={'Profile'} iconClass={'bi-person'} />
            <DropDownItem divider={true} name={'Profile'} iconClass={'bi-person'} />
            <DropDownItem divider={true} name={'Profile'} iconClass={'bi-person'} />
            <DropDownItem divider={false} name={'Profile'} iconClass={'bi-person'} />


          </ul>
        </li>

    )
}

export const DropDownItem = (props) =>{
    return(
        <>
        <li>
            <a class="dropdown-item d-flex align-items-center" href="users-profile.html">
                <i class={"bi "+props.iconClass}></i>
                <span>{props.name}</span>
            </a>
        </li>
        {props.divider&&
        <li>
            <hr class="dropdown-divider"/>
        </li>}
        </>
    )
}