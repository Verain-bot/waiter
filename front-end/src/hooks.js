import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { SearchBarContext,SearchContext } from './App';
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