import React from 'react'
import Header from '../components/header'
import { useRouteError } from 'react-router'

export default function Error() {
    const error = useRouteError() as any

  return (
    <>
        <Header name='Orders' />
        <main className='container'>
            <div className='row'>
                <div className="col-12 d-flex align-items-center justify-content-center mt-5 flex-column">
                    <h1 className='text-danger'>
                        Something went wrong!
                    </h1>
                    <h4>
                        Error: {error.status}, {error.statusText}
                    </h4>
                </div>
            </div>
        </main>
    </>
  )
}
