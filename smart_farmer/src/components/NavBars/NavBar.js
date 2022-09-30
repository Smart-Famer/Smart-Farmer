import { Link } from "react-router-dom"
import {MdOutlineSettings} from "react-icons/md";
import "./navStyle.css"
import UserSession from "../Utils/UserSession"

export default function NavBar(){
    return(
        <div className="nav-container">
            <nav className="top-nav">
                <div className="top-nav-user-info">
                    <div className="top-nav-user-name"><p>{UserSession.username}</p></div>
                    <div className="top-nav-user-type"><p>Farm {UserSession.type}</p></div>
                </div>
                <div className="top-nav-items">
                    <img className="top-nav-icon" alt="Brand" src="images/nav-icon.png"/>
                    <Link className="top-nav-logo-name" style={{textDecoration: 'none'}} to="/login"> <h4 >Smart Farmer</h4></Link>
                    <Link className="top-settings-btn" style={{textDecoration: 'none'}} to="/viewProfilePage"><MdOutlineSettings className="sidebar-item-logo" size={30}/></Link>
                </div>
            </nav>
            <div className="bottom-border"></div>
        </div>
    )
}
