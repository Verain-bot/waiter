import React, { useContext, useState, useEffect, useRef } from "react";
import { useSearchContext } from "../../context/SearchContext";

type SearchBarProps = {
    cref: React.RefObject<HTMLDivElement>;
};

export const SearchBar: React.FC<SearchBarProps> = (props) => {
    const [search, setSearch] = useSearchContext()
    const searchBarRef = useRef<HTMLInputElement>(null);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (props.cref.current) {
            props.cref.current.classList.toggle("search-bar-show");
        }
        
        setSearch(searchBarRef.current?.value || "");
        return false;
    };

    return (
        <div className="search-bar" ref={props.cref}>
            <form className="search-form d-flex align-items-center" onSubmit={submit}>
                <input
                    type="text"
                    name="query"
                    placeholder="Search"
                    title="Enter search keyword"
                    ref={searchBarRef}
                    autoComplete="off"
                />
                <button type="submit" title="Search">
                    <i className="bi bi-search" onClick={submit}></i>
                </button>
            </form>
        </div>
    );
};

type ToggleSearchBarProps = {
    cref: React.RefObject<HTMLDivElement>;
};

export const ToggleSearchBar: React.FC<ToggleSearchBarProps> = (props) => {
    const toggleSearchBar = () => {
        if (props.cref.current) {
            props.cref.current.classList.toggle("search-bar-show");
        }
    };

    return (
        <li className="nav-item d-block d-lg-none">
            <a className="nav-link nav-icon search-bar-toggle" onClick={toggleSearchBar}>
                <i className="bi bi-search"></i>
            </a>
        </li>
    );
};

export const SearchResultMessage: React.FC = () => {
    const [search, setSearch] = useSearchContext()

    const click = (e: React.MouseEvent<HTMLButtonElement>) => {
        setSearch("");
    };

    if (search.length > 0) {
        return (
            <div className="row d-flex align-items-center justify-content-center mb-2">
                <div className="col-9">
                    <strong className="my-2">Search results for : {search}</strong>
                </div>
                <div className="col-3 text-end">
                    <button className="btn btn-outline-dark p-1 py-0 medium" onClick={click}>
                        Clear
                    </button>
                </div>
            </div>
        );
    }

    return null;
};
