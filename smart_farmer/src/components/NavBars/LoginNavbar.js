import React from "react"
import "./navStyle.css"
export default function LoginNavBar(){
    return(
        <div className="login-nav-container">
            <nav className="login-nav">
                <img className="logo" alt="Just an Image"/>
                <h4 className="logo-name">Smart Farmer</h4>
                <h4 className="log-out-btn">Log out</h4>
                <h4 className="contact-btn">Contact us</h4>
            </nav>
            <div className="bottom-border"></div>
        </div>
    )
}
