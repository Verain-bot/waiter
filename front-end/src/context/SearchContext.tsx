import {useContext, ReactNode, createContext, useState } from "react";

export const SearchContext = createContext<[string, React.Dispatch<React.SetStateAction<string>>] | undefined>(undefined); 

export const SearchContextProvider = ({ children }: {children : ReactNode}) => {
    const [search, setSearch] = useState<string>("")
    
    return(
        <SearchContext.Provider value={[search, setSearch]}>
            {children}
        </SearchContext.Provider>
    )
}

export const useSearchContext = () => {
    const context = useContext(SearchContext);
    if (context === undefined) {
      throw new Error('useSearchContext must be used within a SearchContextProvider');
    }
    return context
}