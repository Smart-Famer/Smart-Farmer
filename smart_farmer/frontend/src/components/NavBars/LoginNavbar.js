import React from "react"
import "./navStyle.css"
import { Link } from "react-router-dom"
export default function LoginNavBar(){
    
    return(
        <header>
            <div>
                <nav className="navbar">
                <div className="navbar-brand fs-3 ms-2">
                    <img className="inline-block align-text-top me-2" alt="Brand" src="../images/nav-icon.png" width="35" height="30"/>
                    <span className="top-nav-logo-name fw-bold" >Smart Farmer</span>
                </div>
                {/* <ul className="navbar-nav">
                    <li className="nav-item ms-auto">
                        <Link className="nav-link mx-3 fs-5" style={{textDecoration: 'none'}} to="/home">Contact us</Link>
                    </li>
                </ul> */}
                </nav>
                <div className="bottom-border"></div>
            </div>
        </header>
    )
}