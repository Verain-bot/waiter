import {useCallback, useEffect, useState} from "react";
import * as bootstrap from 'bootstrap';

type UseModalType = (modalID : string, onShow? : CallableFunction | null  , onHide? : CallableFunction | null) =>{
    show : boolean,
    open : ()=>void,
    close : ()=>void
}


export const useModal  : UseModalType = (modalID , onShow  = null , onHide = null) =>{
    const [show,setShow] = useState(false)
    const [modal,setModal] = useState<bootstrap.Modal | null>(null)
    
    const OPEN = useCallback(()=>{
        if (onShow)
            onShow()
           
        setShow(true)
    },[onShow])

    const HIDE = useCallback(()=>{
        if (onHide)
            onHide()
           
        setShow(false)
    },[onHide])


    useEffect(()=>{
        const m : HTMLElement | null = document.getElementById(modalID)

        if (!m)
            throw new Error('Modal not found')
            

        if (!modal)
        {
            setModal(new bootstrap.Modal(m))
            
            m.addEventListener('show.bs.modal',OPEN)
            m.addEventListener('hidden.bs.modal',HIDE)
        }
        else{
            m.removeEventListener('show.bs.modal',OPEN)
            m.removeEventListener('hidden.bs.modal',HIDE)

            m.addEventListener('show.bs.modal',OPEN)
            m.addEventListener('hidden.bs.modal',HIDE)
        }

        return ()=>{
            
            m.removeEventListener('show.bs.modal',OPEN)
            m.removeEventListener('hidden.bs.modal',HIDE)
        }
    },[OPEN,HIDE])

    const open = ()=>{
        if (modal)
            modal.show()
    } 
    
    const close = ()=>{
        if(modal)
            modal.hide()
    }

    return {show ,open,close}
}

export default useModal