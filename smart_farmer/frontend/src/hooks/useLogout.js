import {useState} from 'react'
import { useAuthContext } from './useAuthContext'
import { useFarmContext } from './useFarmContext'

export const useLogout = ()=>{
    const {dispatchAuthState} = useAuthContext()
    const {dispatchFarm} = useFarmContext()

    const logout=()=>{
        localStorage.removeItem('user')
        localStorage.removeItem('farm')
        dispatchAuthState({type:"LOGOUT"})
        dispatchFarm({type:"REMOVE"})  
    }
    return {logout}
}