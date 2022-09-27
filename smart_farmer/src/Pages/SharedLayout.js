import React from "react"
import { Outlet } from "react-router-dom"
import Navbar from "../components/NavBars/NavBar"

import Weather from "../components/Weather"

export default function Dashboard()
{
    return(
        <section>
            <Navbar/>
            <Outlet />
        </section>
    )
}