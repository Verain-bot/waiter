import { useContext, useEffect } from "react"
import { useSearchBarContext } from "../context/SearchBarContext"
import { useSearchContext } from "../context/SearchContext"

type UseSearchBarType = () => string

export const useSearchBar : UseSearchBarType = () =>{
    const [searchBarState, setSearchBarState]  = useSearchBarContext()

    const [search, setSearch] = useSearchContext()

    useEffect(()=>{
        setSearchBarState(true)

        return ()=>{
            setSearchBarState(false)
        }
    })

    return search
}

export default useSearchBar