import React from "react"
import LoginNavBar from "../components/NavBars/LoginNavbar"
import "../App.css"
export default function Login()
{
    return(
        <div className="login">

            <LoginNavBar/>
            
            <div className="image-container">
                <img className="login-image" src="images/login_image.png" />
                <div><h1 className="login-title">Smart Farmer</h1></div>
            </div>
        </div>
        )
}
