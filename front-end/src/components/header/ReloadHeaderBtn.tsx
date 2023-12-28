import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function ReloadHeaderBtn() {
    const r = useLocation()
    return (
        <li className="nav-item d-block ">
            <Link to={r.pathname} className="nav-link nav-icon search-bar-toggle"  replace={true}>
                <i className="bi bi-arrow-clockwise"></i>
            </Link>
        </li>
    )
}
