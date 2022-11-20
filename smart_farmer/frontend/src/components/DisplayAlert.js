import { Alert } from 'reactstrap'
import React from 'react'
export default function DisplayAlert({type,content}){
    return(        
        <Alert color={type}>
            {content}
        </Alert>     
    )     
      

    
}