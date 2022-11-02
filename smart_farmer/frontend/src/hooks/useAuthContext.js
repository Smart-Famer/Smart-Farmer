import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = ()=>{
    const context= useContext(AuthContext)

    if(!context){
        throw Error("useAuthContect can be used only in a AuthContextProvider Wrapper")
    }

    return context
}