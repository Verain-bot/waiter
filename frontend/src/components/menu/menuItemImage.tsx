import React, { useState } from 'react'

type Props = {
    src: string
}

export default function MenuItemImage(props: Props) {

    const [imgLoaded, setImgLoaded] = useState(false)

    const imgClass = "rounded img-thumbnail shadow-sm border-0 "

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        //change source
        e.currentTarget.remove()
    }

    const handleLoad = ()=>{
        setImgLoaded(true)
        console.log('loaded')
    }

  return (
    <>
        <img className={!imgLoaded?imgClass+'d-block':imgClass+'d-none'} loading="lazy" src={'/media/placeholderMenuItem.png'} />
        <img className={imgLoaded?imgClass+' d-block':imgClass} loading="lazy" src={props.src} onError={handleImageError} alt="No image" onLoad={handleLoad}/>
    </>
  )
}
