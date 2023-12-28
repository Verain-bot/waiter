import React from "react";
import { useLoginContext } from "../../context/LoginContext";
import LogoutButton from "../forms/logoutButton";
import { Link } from "react-router-dom";
import { PATHS } from "../../utilities/routeList";


type AccountDropDownProps = {};

export const AccountDropDown: React.FC<AccountDropDownProps> = (props) => {
    const login = useLoginContext()[0]

    

    return (
        <li className="nav-item dropdown pe-3">
            {login.login ? (
                <button className='btn rounded-circle' data-bs-toggle='dropdown'>
                    <i className="bi bi-person-circle" style={{ fontSize: '25px' }} />
                </button>
            ) : (
                <Link className='btn btn-outline-dark' to={PATHS.LOGIN}>
                    <strong>Login</strong>
                </Link>
            )}
            {login.login&& <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                    <h6>{`${login.user?.first_name} ${login.user?.last_name}`}</h6>
                    <span>{login.user?.username? `+91 ${login.user.username}` : ''}</span>
                </li>
                <li>
                    <hr className="dropdown-divider"/>
                </li>
                <DropDownItem iconClass="bi-person" name="Account" divider href='/account/details' />
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
};

export const DropDownItem: React.FC<DropDownItemProps> = (props) => {
    return (
        <>
            <li>
                <Link className="dropdown-item d-flex align-items-center" to={props.href? props.href : ''}>
                    <i className={"bi " + props.iconClass}></i>
                    <span>{props.name}</span>
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
