import React, { useEffect, useRef, useState } from 'react'

type Props = {
    img: string
}


export default function RestaurantImage( props : Props) {

  const [imgLoaded, setImgLoaded] = useState(false)

  const imgClass = "img-thumbnail rounded border-0 p-0 "

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      //change source
      e.currentTarget.remove()
  }

  const handleLoad = ()=>{
      setImgLoaded(true)
      console.log('loaded')
  }

  const placeHolderURL = '/media/placeholderRestaurant.svg'

  return (
    <>
        <img className={!imgLoaded?imgClass+'d-block':imgClass+'d-none'} loading="lazy" src={placeHolderURL} />
        <img className={imgLoaded?imgClass+' d-block': imgClass} loading="lazy" src={String(props.img)} onError={handleImageError} alt="No image" onLoad={handleLoad} />
    </>
  )
}
