import { Alert } from 'reactstrap'
import React from 'react'
/*
    Alert types!!!!
        success
        danger
        warning
        info
        light
        dark
*/
export default function DisplayAlert({type,content}){
    return(        
        <Alert color={type}>
            {content}
        </Alert>     
    )     
      

    
}