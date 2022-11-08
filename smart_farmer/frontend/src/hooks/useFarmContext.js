import { FarmContext } from "../context/FarmContext";
import { useContext } from "react";

export const useFarmContext = ()=>{
    const context= useContext(FarmContext)

    if(!context){
        throw Error("useFarmContecx can be used only in a FarmContextProvider Wrapper")
    }

    return context
}