import React from 'react'
import { Link } from 'react-router-dom'
import { PATHS } from '../../utilities/routeList'

export default function Footer() {
    const year = new Date().getFullYear()
    const style = {
        fontSize: 14
    }
  return (
    <>
    <hr className='col-12 col-md-8' style={{marginTop: '100px'}}></hr>
    <div className='col-12 col-md-8 d-flex align-items-center justify-content-center flex-column p-3'>
        
        <span className='text-muted ' style={style} >
            &copy; {year} toOne. All rights reserved.
        </span>

        <span className='text-secondary text-center my-2 ' style={style}>
            This website was developed by toOne and its team. It is not affiliated with any restaurant or food delivery service. 
        </span>

        <span className='text-secondary text-center my-2 ' style={style}>
            For any help please click <Link to={PATHS.CONTACT}>here</Link>.
        </span>

        <span className='text-secondary text-center my-2 ' style={style}>
            For more info on us and our team please click <Link to={PATHS.ABOUT}>here</Link>.
        </span>

        <span className='text-secondary text-center my-2 ' style={style}>
            Made with love 
            <i className='bi bi-heart-fill text-danger mx-1'></i>
             for you.
        </span>

    </div>
    </>
  )
}
