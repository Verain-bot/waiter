import React from 'react'

export default function ErrorComp({error, resetErrorBoundary} : {error: Error, resetErrorBoundary: ()=>void}) {
  return (
    <div className='container'>
      <div className="row" style={{marginTop: 250}}>
        <div className="col-12 d-flex align-items-center justify-content-center flex-column">
          <h1 className='text-danger'>
              Something went wrong
          </h1>
        
          <span className='medium'>
            <strong>
                Error: &nbsp;
            </strong>
            {error.message}
          </span>

          <button className='btn btn-outline-dark mt-5 w-100' onClick={resetErrorBoundary}>
            Try Again
          </button>
        </div>
      </div>
    </div>
  )
}
