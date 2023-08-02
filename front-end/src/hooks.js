import { useState, useEffect, useCallback } from 'react';
import { useContext } from 'react';
import { SearchBarContext,SearchContext } from './App';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

export const useScrollDirection = () =>
{
    const [direction, setDirection] = useState('up');
    const [lastScrollY, setLastScrollY] = useState(0);

    const controlNavbar = () => {
        if (typeof window !== 'undefined') { 
        if (window.scrollY > lastScrollY) { // if scroll down hide the navbar
            setDirection('down'); 
        } else { // if scroll up show the navbar
            setDirection('up');  
        }

        // remember current page location to use in the next move
        setLastScrollY(window.scrollY); 
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
        window.addEventListener('scroll', controlNavbar);

        return () => {
            window.removeEventListener('scroll', controlNavbar);
        };
        }
    }, [lastScrollY]);
    
    return direction
}

export const useSearchBar = () =>{
    const [searchBarState, setSearchBarState] = useContext(SearchBarContext)
    const [search, setSearch] = useContext(SearchContext)

    useEffect(()=>{
        setSearchBarState(true)

        return ()=>{
            setSearchBarState(false)
        }
    })

    return search
}

export const useModal = (modalID, onShow = null, onHide= null) =>{
    const [show,setShow] = useState(false)
    const [modal,setModal] = useState(false)
    
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
        const m = document.getElementById(modalID)
        if (!modal)
        {
            setModal(new bootstrap.Modal(m))
            
            m.addEventListener('show.bs.modal',OPEN)
            m.addEventListener('hide.bs.modal',HIDE)
        }
        else{
            m.removeEventListener('show.bs.modal',OPEN)
            m.removeEventListener('hide.bs.modal',HIDE)

            m.addEventListener('show.bs.modal',OPEN)
            m.addEventListener('hide.bs.modal',HIDE)
        }

        return ()=>{
            
            m.removeEventListener('show.bs.modal',OPEN)
            m.removeEventListener('hide.bs.modal',HIDE)
        }
    },[OPEN,HIDE])

    const open = ()=>{
        modal.show()
    } 
    
    const close = ()=>{
        modal.hide()
    }

    return {show ,open,close}
}

export const useStorage = (key) => {
    const [value, setValue] = useState(() => {
      
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : null;
    });
      
    useEffect(() => {      
      localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]); 

  
    return [value, setValue];
  };
  