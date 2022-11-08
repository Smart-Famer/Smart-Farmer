import { Link } from "react-router-dom"
import {MdOutlineSettings} from "react-icons/md";
import "./navStyle.css"
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFarmContext } from "../../hooks/useFarmContext";
export default function NavBar(){
    const user = useAuthContext().user.details
    const {farm} = useFarmContext()

    return(
        <div className="nav-container">
            <nav className="top-nav">
                {farm&&<div className="top-nav-user-info">
                    <div className="top-nav-info-name"><p>{farm.name}</p></div>
                    <div className="top-nav-info-type"><p>{farm.location}</p></div>
                </div>}
                <div className="top-nav-user-info">
                    <div data-testid='top-nav-info-name' className="top-nav-info-name"><p>{user.first_name+" "+user.second_name}</p></div>
                    <div data-testid='top-nav-info-type' className="top-nav-info-type"><p>Farm {user.user_type}</p></div>
                </div>
                <div className="top-nav-items">
                    <img className="top-nav-icon" alt="Brand" src="../images/nav-icon.png"/>
                    <Link className="top-nav-logo-name" style={{textDecoration: 'none'}} to="/"> <h4 >Smart Farmer</h4></Link>
                    <Link className="top-settings-btn" style={{textDecoration: 'none'}} to="/user/viewProfilePage"><MdOutlineSettings className="sidebar-item-logo" size={30}/></Link>
                </div>
            </nav>
            <div className="bottom-border"></div>
        </div>
    )
}
