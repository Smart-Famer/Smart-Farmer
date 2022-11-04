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

    const user = JSON.parse(localStorage.getItem('user'))
    const [AuthState, dispatchAuthState] = useReducer(authReducer,{
        user:user
    })
    // console.log('AuthContext state:', AuthState)
    useEffect(()=>{
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