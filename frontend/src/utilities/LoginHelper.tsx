import { LoginContextType } from "../context/LoginContext";

export const checkUserDetailsEntered = (login : LoginContextType) =>{
    if (login.user?.first_name && login.user?.last_name && login.user?.username){
        return true
    }
    return false
}