import { createContext, useReducer, useEffect } from "react";

export const FarmContext = createContext()
export const farmReducer = (state, action)=>{
    switch(action.type){
        case "ADD":
            return {
                farm:action.payload
            }
        case "REMOVE":
            return {
                farm:null
            }
        default:
            return state
    }

}
export const FarmContextProvider = ({children})=>{

    const [Farm, dispatchFarm] = useReducer(farmReducer,null,()=>{
        const farm = JSON.parse(localStorage.getItem('farm'))
        return farm
    })
    console.log('Current Farm:', Farm)
    useEffect(()=>{
        localStorage.setItem('farm', JSON.stringify(Farm));

    }, [Farm])
    return(
        <FarmContext.Provider value={{...Farm, dispatchFarm}}>
            {children}
        </FarmContext.Provider>
    )
}