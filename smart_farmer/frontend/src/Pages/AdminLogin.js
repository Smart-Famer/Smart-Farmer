import React from "react"
import Login from "../components/login/Login"
import "../App.css"
import LoginNavbar from '../components/NavBars/LoginNavbar'


export default function AdminLoginPage() {
 
    console.log("Admin Login")

    return (
        <div className="login">
            <LoginNavbar/>
            <div className="login-form">
                <div className="login-form-item-admin">
                    <Login />
                </div>
            </div>

        </div>
    )
}
