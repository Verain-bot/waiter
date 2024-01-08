import React from 'react'

export default function MenuCustModalError({error, resetErrorBoundary} : {error: Error, resetErrorBoundary: ()=>void}) {
  return (
        <span className='text-danger small'>
            Unable to open customizations ({error.message})
        </span>
  )
}
