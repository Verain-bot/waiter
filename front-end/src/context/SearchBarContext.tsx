import { ReactNode, createContext, useContext, useState } from "react"

export const SearchBarContext = createContext<[boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined>(undefined)

export const SearchBarContextProvider = ({ children } : {children: ReactNode}) => {
    const [searchBar, setSearchBar] = useState(false)
    
    return(
        <SearchBarContext.Provider value={[searchBar, setSearchBar]}>
            {children}
        </SearchBarContext.Provider>
    )
}

export const useSearchBarContext = () =>{
    const context = useContext(SearchBarContext)
    if(context === undefined){
        throw new Error('useSearchBarContext must be used within a SearchBarProvider')
    }
    return context
}