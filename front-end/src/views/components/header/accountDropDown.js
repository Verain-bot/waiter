import { useContext } from "react"
import { LoginContext } from "../../../App"
export const AccountDropDown = (props) =>{

    const [{login, user}, setLogin] = useContext(LoginContext)

    return (
        <li class="nav-item dropdown pe-3">

          {login&&<button class='btn'>
            <i class="bi bi-person-circle" style={{fontSize: '25px'}} />
          </button>}
          

          {!login&&<button class='btn  btn-outline-dark'>
            <strong>Login</strong>
            </button>}
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