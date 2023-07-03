export const SearchBar = (props) =>
{
    return(
        <div class="search-bar" ref={props.cref}>
            <form class="search-form d-flex align-items-center" method="POST" action="#">
                <input type="text" name="query" placeholder="Search" title="Enter search keyword" />
                <button type="submit" title="Search"><i class="bi bi-search"></i></button>
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

export default SearchBar;