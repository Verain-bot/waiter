import React from 'react'
import { Link } from 'react-router-dom'
import { PATHS } from '../../utilities/routeList'

export default function Footer() {
    const year = new Date().getFullYear()
    const style = {
        fontSize: 14
    }
  return (

    <div className='row'>

        <hr className='col-12 col-md-10' style={{marginTop: '100px'}}></hr>
        <footer className='col-12 col-md-8 d-flex align-items-center justify-content-center flex-column p-3 mb-5'>
            
            <span className='text-muted text-center' style={style} >
                &copy; {year} ViewOne Digital Solutions Private Limited. <br/>All rights reserved.
            </span>

            <span className='text-secondary text-center my-2 ' style={style}>
                This website was developed by ViewOne and its team. It is not affiliated with any restaurant or food delivery service. 
            </span>

            <span className='text-secondary text-center my-2 ' style={style}>
                For any assistance or if you would like to contact us please click <Link to={PATHS.CONTACT}>here</Link>.
            </span>

            <span className='text-secondary text-center my-2 ' style={style}>
                For more information on us and our team please click <Link to={PATHS.ABOUT}>here</Link>.
            </span>

            <span className='text-secondary text-center my-2 ' style={style}>
                For terms and conditions please click <Link to={PATHS.TERMS} > here </Link> <br/>
                For our privacy policy please click <Link to={PATHS.PRIVACY_POLICY} > here </Link><br/>
                For information on cancellations and refunds please click <Link to={PATHS.REFUND_POLICY} > here </Link>
            </span>

            <span className='text-secondary text-center my-2 ' style={style}>
                This is a Progressive Web App (PWA) for more information on the installation of this app please click <Link to={PATHS.PWA_INFO} > here </Link>.
                
            </span>

            <span className='text-secondary text-center my-2 ' style={style}>
                Application version : v2.3
            </span>

            <span className='text-secondary text-center my-2 ' style={style}>
                Made with love 
                <i className='bi bi-heart-fill text-danger mx-1'></i>
                for you.
            </span>

        </footer>
    </div>
    
  )
}
