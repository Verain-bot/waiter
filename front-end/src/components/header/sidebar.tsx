import React from 'react';
import { NavLink } from 'react-router-dom';
import RouteList, { PathType } from '../../utilities/routeList';
import { useLoginContext } from '../../context/LoginContext';
import LogoutButton from '../forms/logoutButton';

type SideBarItemProps = {
    name: string;
    iconName: string;
    link: string;
};

const SideBarItem: React.FC<SideBarItemProps> = (props) => {
    const toggle = () => {
        //toggle only when screen size is small
        if (window.innerWidth < 768)
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
    const [login, setLogin]  = useLoginContext()

    const Items = RouteList.filter(item=>{
        if(login.login && item.pathType.includes(PathType.LOGGED_IN) && item.pathType.includes(PathType.NAVBAR))
            return true

        else if((!login.login || login.user == null) && item.pathType.includes(PathType.LOGGED_OUT) && item.pathType.includes(PathType.NAVBAR))
            return true

        return false
    })

    return (
        <aside id="sidebar" className="sidebar">
            <div className='container mb-4'>
                <div className="row">
                    <div className="col-12 d-flex align-items-end">
                        <h1 className='p-0 m-0'>
                            <strong>
                                toOne
                            </strong>
                        </h1>
                        <h4 style={{paddingBottom: '1px'}} className='m-0'>
                            .in
                        </h4>
                    </div>
                </div>
            </div>  

            <ul className="sidebar-nav" id="sidebar-nav">
                {Items.map((item, key) => (
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
