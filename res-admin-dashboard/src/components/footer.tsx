import React from 'react'

export default function Footer() {
    const currentYear = new Date().getFullYear()

  return (
    <div className='w-100 bg-dark text-center fs-small' style={{color: '#b8b8b8'}}>
        &copy; {currentYear} ViewOne Digital Solutions Private Limited &nbsp;&nbsp;&nbsp;
        v2.3.2
    </div>
  )
}
