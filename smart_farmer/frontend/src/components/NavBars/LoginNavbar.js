import React from "react"
import "./navStyle.css"
import { Link } from "react-router-dom"
export default function LoginNavBar(){
    
    return(

        <div className="nav-container">
            <nav className="top-nav">
                <img className="login-nav-icon" alt="Brand" src="images/nav-icon.png"/>
                <Link className="login-logo-name" style={{textDecoration: 'none'}} to="/login"> <h4 >Smart Farmer</h4></Link>
                <Link className="login-contact-btn" style={{textDecoration: 'none'}} to="/home"><h4>Contact us</h4></Link>
            </nav>
            <div className="bottom-border"></div>
        </div>
    )
}
