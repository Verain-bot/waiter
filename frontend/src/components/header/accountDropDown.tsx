import React from "react";
import { useLoginContext } from "../../context/LoginContext";
import LogoutButton from "../forms/logoutButton";
import { Link } from "react-router-dom";
import { PATHS } from "../../utilities/routeList";
import { checkUserDetailsEntered } from "../../utilities/LoginHelper";


type AccountDropDownProps = {};

export const AccountDropDown: React.FC<AccountDropDownProps> = (props) => {
    const login = useLoginContext()[0]
    const detailsGiven = checkUserDetailsEntered(login)
    
    return (
        <li className="nav-item d-block dropdown">
            {login.login ? (
                <button className='btn rounded-circle' data-bs-toggle='dropdown'>
                    <div className="position-relative">
                    <i className="bi bi-person-circle " style={{ fontSize: '25px' }} />
                    {!detailsGiven&&<div className="cart-badge bg-warning">
                        !
                    </div>}
                    </div>
                </button>

            ) : login.login!==null?(
                <Link className='btn btn-outline-dark' to={PATHS.LOGIN}>
                    <strong>Login</strong>
                </Link>
            ): <></>}
            {login.login&& <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                    {!detailsGiven?
                    <h6 className="text-danger">
                        Update Account Details
                    </h6>:
                    <h6>{`${login.user?.first_name} ${login.user?.last_name}`}</h6>
                }
                    <span>{login.user?.username? `+91 ${login.user.username}` : ''}</span>
                </li>
                <li>
                    <hr className="dropdown-divider"/>
                </li>
                <DropDownItem 
                    iconClass="bi-person" 
                    name="Account" 
                    divider 
                    href={detailsGiven? PATHS.ACCOUNT_DETAILS : PATHS.REGISTER}
                    left={!detailsGiven&&<i className="bi bi-exclamation-circle text-warning"></i>}
                 />
                <li>
                    <LogoutButton className="dropdown-item d-flex align-items-center" >
                        <i className="bi bi-box-arrow-right"></i>
                        <span>Logout</span>
                    </LogoutButton>
                </li>
            </ul>}
        </li>
    )
}

type DropDownItemProps = {
    iconClass: string;
    name: string;
    divider?: boolean;
    href?: string;
    left?: React.ReactNode
};

export const DropDownItem: React.FC<DropDownItemProps> = (props) => {
    return (
        <>
            <li>
                <Link className="dropdown-item d-flex align-items-center" to={props.href? props.href : ''}>
                    <i className={"bi " + props.iconClass}></i>
                    <span>{props.name}</span>
                    {props.left && <div className="ms-auto">
                        {props.left}
                    </div>}
                </Link>
            </li>
            {props.divider && (
                <li>
                    <hr className="dropdown-divider" />
                </li>
            )}
        </>
    );
};
