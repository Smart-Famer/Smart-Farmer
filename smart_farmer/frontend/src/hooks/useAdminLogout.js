import {useState} from 'react'
import { useAuthContext } from './useAuthContext'

export const useAdminLogout = ()=>{
    const {dispatchAuthState} = useAuthContext()

    const logout=()=>{
        localStorage.removeItem('user')

        dispatchAuthState({type:"LOGOUT"})
       
    }
    return {logout}
}