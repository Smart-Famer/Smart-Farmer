import React from "react"

import Login from "../components/login/Login"
import Header from "../components/login/Header"
import "../App.css"
import {useAuthContext} from "../hooks/useAuthContext"
import { Navigate } from "react-router-dom"


export default function LoginPage() {
    const {user} = useAuthContext()

    if(user){
        return <Navigate to="/"/>
    }
    
    return (
        <div className="login">

            <Header />

            <div className="login-form">
                <div className="login-form-item">
                    <p><b>Smart Farmer </b>is a crop monitoring dashboard come up with user friendly interface which can be used with IoT enabled farming site. We give you more control over the hardware as well. Smart Farmer mobile app makes  the system portable and easy to use.</p>
                </div>
                <div className="login-form-item">
                    <Login />
                </div>
            </div>

        </div>
    )
}
