import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext()
export const authReducer = (state, action)=>{
    switch(action.type){
        case "LOGIN":
            return {
                user:action.payload
            }
        case "LOGOUT":
            return{
                user:null
            }
        default:
            return state
    }

}
export const AuthContextProvider = ({children})=>{

    const [AuthState, dispatchAuthState] = useReducer(authReducer,{
        user:null
    })
    console.log('AuthContext state:', AuthState)
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'))
        if(user){
            dispatchAuthState({type:"LOGIN", payload:user})
        }
    }, [])
    return(
        <AuthContext.Provider value={{...AuthState, dispatchAuthState}}>
            {children}
        </AuthContext.Provider>
    )
}