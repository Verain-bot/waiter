import {ReactNode,useContext, createContext, useState, useEffect, useCallback } from "react";
import { makeRequest } from "../utilities/fetchData";
import { fetchUserData } from "../utilities/fetchUser";

type UserContextType = null | {
    name: string,
    email: string,
    phone: string,
  };
  
export type LoginContextType = {
    login: boolean | null
    user: UserContextType;
  };

const LoginContext = createContext<[LoginContextType, React.Dispatch<React.SetStateAction<LoginContextType>>] | undefined>(undefined);

export const LoginContextProvider = ({ children }: { children: ReactNode }) => {
    const [login, setLogin] = useState<LoginContextType>({ login: null, user: null });
    const abortSignal = new AbortController();


    const getUser = useCallback(async () =>{
      
      const {json,response} = await fetchUserData()

      if (response.ok) {
        setLogin({login: true, user: {
          name: json.name,
          email: json.email,
          phone: json.phone
        }})
      }

      else{
        setLogin({login: false, user: null})
      }

      console.log(login, 'login')
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