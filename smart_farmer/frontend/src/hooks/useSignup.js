import {useState} from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup =()=>{
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] =useState(null)
    const {dispatchAuthState} = useAuthContext()

    const signup = async (email, password)=>{

        setIsLoading(true)
        setError(null)

        const response = await fetch("http://localhost:4000/api/user/signup", {
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
        })

        const json = await response.json()
        
        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok){
            localStorage.setItem('user', JSON.stringify(json))
            dispatchAuthState({
                type:"LOGIN",
                payload:json
            })
            setIsLoading(false)
        }

    }

    return( signup, error, isLoading )
}