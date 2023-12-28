import {ReactNode,useContext, createContext, useState, useEffect, useCallback } from "react";
import { fetchUserData } from "../utilities/fetchUser";

export type UserContextType = null | {
    first_name: string,
    last_name: string,
    email: string,
    username: string,
  };

export type LoginTempDataType = {
    phone?: number,
    verified?: boolean,
    isOTPCorrect?: number,
}
export type LoginContextType = {
    login: boolean | null
    user: UserContextType
    temp?: LoginTempDataType
  };

const LoginContext = createContext<[LoginContextType, React.Dispatch<React.SetStateAction<LoginContextType>>] | undefined>(undefined);

export const LoginContextProvider = ({ children }: { children: ReactNode }) => {
    const [login, setLogin] = useState<LoginContextType>({ login: null, user: null });
    const abortSignal = new AbortController();


    const getUser = useCallback(async () =>{
      
      const user = await fetchUserData()

      if (user) {
        setLogin({login: true, user: user})
      }

      else{
        setLogin({login: false, user: null})
      }
    },[])
    
    useEffect(()=>{
      getUser()
      
    }, [])

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