import React from "react"
import { Outlet } from "react-router-dom"
import Navbar from "../components/NavBars/NavBar"
import { Navigate } from "react-router-dom"
import {useAuthContext} from "../hooks/useAuthContext"
import LoginNavBar from "../components/NavBars/LoginNavbar"


export default function SharedLayout()
{
    const {user} = useAuthContext()
    // console.log("here", user)
    if(!user){
        return <Navigate to="/login"/>      
    }
    return(
        <section>
            {user&&<Navbar/>}
            {!user&&<LoginNavBar/>}
            <Outlet />
        </section>
    )
}