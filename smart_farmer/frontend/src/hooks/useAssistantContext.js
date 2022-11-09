import { AssistantContext } from "../context/AssistantContext";
import { useContext } from "react";

export const useAssistantContext = ()=>{
    const context= useContext(AssistantContext)

    if(!context){
        throw Error("useAssistantContecx can be used only in a AssistantContextProvider Wrapper")
    }

    return context
}