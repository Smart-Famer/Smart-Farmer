import React from "react"
import LoginNavBar
 from "../components/NavBars/LoginNavbar"
export default function Login()
{
    return(
        <div className="login">
            <LoginNavBar/>
            <h1>Login</h1>
        </div>
    )
}