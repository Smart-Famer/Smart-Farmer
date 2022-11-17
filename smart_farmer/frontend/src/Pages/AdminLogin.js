import React from "react"
import Login from "../components/login/Login"
import "../App.css"
import LoginNavBar from "../components/NavBars/AdminNavBar"


export default function AdminLoginPage() {
 
    return (
        <div className="login">
            <LoginNavBar/>

            <div className="login-form">
                <div className="login-form-item-admin">
                    <Login />
                </div>
            </div>

        </div>
    )
}
