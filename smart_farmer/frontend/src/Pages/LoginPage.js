import React from "react"

import "../App.css"
import Header from "../components/login/Header"
import Login from "../components/login/Login"
import LoginNavBar from "../components/NavBars/LoginNavbar"


export default function LoginPage() {

    return (
        <div className="login">
            <LoginNavBar/>
            <Header />

            <div className="login-form mt-3 mt-md-5 mt-sm-4 m-1 m-sm-4">
                <div className="row m-md-4 m-2">
                    <div className="col-12 col-md-5 mt-4 align-self-center text-center">
                        <p><b>Smart Farmer </b>is a crop monitoring dashboard come up with user friendly interface which can be used with IoT enabled farming site. We give you more control over the hardware as well. Smart Farmer mobile app makes  the system portable and easy to use.</p>
                    </div>
                    <div className="col-12 col-md-7 mt-4">
                        <Login />
                    </div>
                </div>
            </div>

        </div>
    )
}
