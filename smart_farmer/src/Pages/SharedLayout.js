import React from "react"
import { Outlet } from "react-router-dom"
import UserSession from "../components/Utils/UserSession"
import Navbar from "../components/NavBars/NavBar"
import { Navigate } from "react-router-dom"


export default function Dashboard()
{
    if(UserSession.username===undefined){
        return <Navigate to="/login"/>
    }
    return(
        <section>
            <Navbar/>
            <Outlet />
        </section>
    )
}