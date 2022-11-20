import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useUpdate =()=>{
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const {dispatchAuthState} = useAuthContext()
    const user = useAuthContext().user.details

    const updateUser = async (data)=>{

        setError(null)

        const response = await fetch(`${process.env.REACT_APP_HOST}/api/user/update/${user._id}`,
          {
            method: "POST",
            crossDomain: true,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
              ...data,
            }),
          }
        );

        const json = await response.json()
        
        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            dispatchAuthState({type:"UPDATE", payload:json})
            return json
        }

    }

    return {updateUser, error,success, setError, setSuccess} 
}