import { SearchContext } from "../../../App"
import { useContext,useState,useEffect } from "react"

export const SearchBar = (props) =>
{
    const [search,setSearch] = useContext(SearchContext)
    const [value, setValue] = useState()

    useEffect(()=>{
        setValue(search)
    },[search])

    const change = (e) => {
        
        setValue(e.target.value)
        return false
    }

    const submit = (e) => {
        e.preventDefault()
        props.cref.current.classList.toggle('search-bar-show')
        setSearch(value)
        return false
    }


    return(
        <div class="search-bar" ref={props.cref}>
            <form class="search-form d-flex align-items-center" onSubmit={submit}>
                <input type="text" name="query" placeholder="Search" title="Enter search keyword" value={value} onChange={change} autoComplete="off" />
                <button type="submit" title="Search"><i class="bi bi-search" onClick={submit} ></i></button>
            </form>
        </div>
    )
}

export const ToggleSearchBar = (props) =>
{
    const toggleSearchBar = () => {
        props.cref.current.classList.toggle('search-bar-show')
    }

    return(
        <li class="nav-item d-block d-lg-none">
            <a class="nav-link nav-icon search-bar-toggle " href="#" onClick={toggleSearchBar}>
                <i class="bi bi-search"></i>
            </a>
        </li>
    )
}


export const SearchResultMessage = (props)=>{
    const [search,setSearch] = useContext(SearchContext)

    const click= (e)=>{
        setSearch('')
    }

    if (search.length >0)
    return(
        <div class='row d-flex align-items-center justify-content-center mb-2'>
            <div class='col-9'>
                <strong class='my-2'>
                    Search results for : {search}
                </strong>
            </div>

            <div class='col-3 text-end'>
                <button class='btn btn-outline-dark p-1 py-0 medium' onClick={click}>
                    Clear
                </button>
            </div>

        </div>
    )
}
