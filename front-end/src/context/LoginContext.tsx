import {ReactNode,useContext, createContext, useState } from "react";

type UserContextType = {
    // Define user properties here
  };
  
  type LoginContextType = {
    login: boolean;
    user: UserContextType;
  };

const LoginContext = createContext<[LoginContextType, React.Dispatch<React.SetStateAction<LoginContextType>>] | undefined>(undefined);

export const LoginContextProvider = ({ children }: { children: ReactNode }) => {
    const [login, setLogin] = useState<LoginContextType>({ login: false, user: {} });

    return(
        <LoginContext.Provider value={[login, setLogin]}>
            {children}
        </LoginContext.Provider>
    )
}

export const useLoginContext = ()=>{
    const context = useContext(LoginContext);
    if (context === undefined) {
      throw new Error("useLoginContext must be used within a LoginContextProvider");
    }
    return context;
}