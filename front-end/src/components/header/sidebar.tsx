import React from 'react';
import { NavLink } from 'react-router-dom';
import RouteList, { NAV } from '../../utilities/routeList';
import { useLoginContext } from '../../context/LoginContext';
import LogoutButton from '../forms/logoutButton';

type SideBarItemProps = {
    name: string;
    iconName: string;
    link: string;
};

const SideBarItem: React.FC<SideBarItemProps> = (props) => {
    const toggle = () => {
        document.body.classList.toggle('toggle-sidebar');
    };

    return (
        <li className="nav-item">
            <NavLink
                className={({ isActive, isPending }) =>
                    isActive ? 'nav-link' : isPending ? 'nav-link collapsed' : 'nav-link collapsed'
                }
                to={props.link}
                onClick={toggle}
            >
                <i className={`bi ${props.iconName}`}></i>
                <span>{props.name}</span>
            </NavLink>
        </li>
    );
};

type SideBarProps = {};

export const SideBar: React.FC<SideBarProps> = (props) => {
    const [login, setLogin] = useLoginContext()
    return (
        <aside id="sidebar" className="sidebar">
            <ul className="sidebar-nav" id="sidebar-nav">
                {RouteList.filter((item) => item.nav.includes(NAV)).map((item, key) => (
                    <SideBarItem name={item.name} iconName={`bi-${item.icon}`} link={item.path} key={key} />
                ))}

                    {login.login && <li className="nav-item">
                        <LogoutButton className='nav-link collapsed'>

                            <i className={`bi bi-box-arrow-right`}></i>
                            <span>Logout</span>
                        </LogoutButton>
                        </li>}

            </ul>
        </aside>
    );
};

type ToggleSideBarProps = {};

export const ToggleSideBar: React.FC<ToggleSideBarProps> = (props) => {
    const toggle = () => {
        document.body.classList.toggle('toggle-sidebar');
    };

    return (
        <div className="d-flex align-items-center justify-content-between">
            <i className="bi bi-list toggle-sidebar-btn" onClick={toggle}></i>
        </div>
    );
};
