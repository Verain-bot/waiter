import React, { useContext } from "react";


type AccountDropDownProps = {};

export const AccountDropDown: React.FC<AccountDropDownProps> = (props) => {
    const login = false;

    return (
        <li className="nav-item dropdown pe-3">
            {login ? (
                <button className='btn'>
                    <i className="bi bi-person-circle" style={{ fontSize: '25px' }} />
                </button>
            ) : (
                <button className='btn btn-outline-dark'>
                    <strong>Login</strong>
                </button>
            )}
        </li>
    );
};

type DropDownItemProps = {
    iconClass: string;
    name: string;
    divider?: boolean;
};

export const DropDownItem: React.FC<DropDownItemProps> = (props) => {
    return (
        <>
            <li>
                <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
                    <i className={"bi " + props.iconClass}></i>
                    <span>{props.name}</span>
                </a>
            </li>
            {props.divider && (
                <li>
                    <hr className="dropdown-divider" />
                </li>
            )}
        </>
    );
};
