import React from "react"

import LoginNavBar from "../components/NavBars/LoginNavbar"
import Login from "../components/Login.js"
import "../App.css"
export default function LoginPage() {
    return (
        <div className="login">

            <LoginNavBar />

            <div className="image-container">
                <img className="login-image" src="images/login_image.png" />
                <div><h1 className="login-title">Smart Farmer</h1></div>
            </div>
            <div className="login-form">
                <div className="descrip">
                    <p><b>Smart Farmer </b>is a crop monitoring dashboard come up with user friendly interface which can be used with IoT enabled farming site. We give you more control over the hardware as well. Smart Farmer mobile app makes  the system portable and easy to use.</p>
                </div>
                <div className="login-form-item">
                    <Login />

                </div>
            </div>

        </div>
    )
}
