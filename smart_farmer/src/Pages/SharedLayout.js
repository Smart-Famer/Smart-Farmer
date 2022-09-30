import React from "react"
import { Outlet } from "react-router-dom"

import Navbar from "../components/NavBars/NavBar"


export default function Dashboard()
{
    return(
        <section>
            <Navbar/>
            <Outlet />
        </section>
    )
}