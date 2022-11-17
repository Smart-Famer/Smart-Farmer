import {useState} from 'react'
import { useAuthContext } from './useAuthContext'


export const useSignup =()=>{
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] =useState(null)
    const {dispatchAuthState} = useAuthContext()


    const signup = async (first_name, second_name, email, password, location)=>{

        setIsLoading(true)
        setError(null)

        const response = await fetch(`${process.env.REACT_APP_HOST}/api/user/signup`,
          {
            method: "POST",
            crossDomain: true,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
              first_name,
              second_name,
              email,
              password,
              location,
              user_type: "Manger",
              profile_picture: "default.jpg"
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
            return json
        }

    }

    return {signup, error, isLoading, setError} 
}