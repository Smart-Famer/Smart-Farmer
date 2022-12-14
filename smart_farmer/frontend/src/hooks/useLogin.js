import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = ()=>{
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] =useState(null)
    const {dispatchAuthState} = useAuthContext()

    const login = async (email, password)=>{
        setIsLoading(true)
        setError(null)

        const response = await fetch(`${process.env.REACT_APP_HOST}/api/user/login`,
          {
            method: "POST",
            crossDomain: true,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          }
        );
        
        const json = await response.json()
        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            setIsLoading(false)
            dispatchAuthState({type:"LOGIN", payload:json})
        }  
    }

    return {login, error, isLoading}
}