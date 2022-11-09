import { createContext, useReducer, useEffect } from "react";
import { useFarmContext } from "../hooks/useFarmContext";

export const AssistantContext = createContext()
export const assistantReducer = (state, action)=>{
    switch(action.type){
        case "SET":
            return {
                assistants:action.payload
            }
        case "UNSET":
            return {
                assistants:null
            }
        case "ADD":
            return {
                assistants:[...state.assistants,action.payload]
            }
        case "REMOVE":
            return {
                assistants:state.assistants.filter(function(ass) {
                    return ass._id !== action.payload.user_id;
                })
            }
        default:
            return state
    }

}
export const AssistantContextProvider = ({children})=>{

    const {farm} = useFarmContext()
    const [Assistants, dispatchAssistants] = useReducer(assistantReducer,null,()=>{
        const fetchAssistants = async ()=>{
            const response = await fetch(`http://localhost:4000/api/user/get-assistants`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({farm_id:farm._id})
            })

            const json = await response.json()
            return({
                assistants:json
            })
        }
        fetchAssistants()
    })

    return(
        <AssistantContext.Provider value={{...Assistants, dispatchAssistants}}>
            {children}
        </AssistantContext.Provider>
    )
}