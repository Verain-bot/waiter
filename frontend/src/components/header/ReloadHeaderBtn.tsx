import React from 'react'
import { Link, useLocation, useNavigation } from 'react-router-dom'

export default function ReloadHeaderBtn() {
    const r = useLocation()
    const navigation = useNavigation()
    const cName =  navigation.state==='idle'?'d-block':'d-none'
    console.log(navigation.state, cName)
    return (
        <li className={'nav-item ' + cName}>
            <Link to={r.pathname} className="nav-link nav-icon search-bar-toggle"  replace={true}>
                <i className="bi bi-arrow-clockwise"></i>
            </Link>
        </li>
    )
}
