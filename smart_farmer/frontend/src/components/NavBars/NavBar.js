import { Link } from "react-router-dom"
import {MdOutlineSettings} from "react-icons/md";
import "./navStyle.css"
import { useAuthContext } from "../../hooks/useAuthContext";
export default function NavBar(){
    const user = useAuthContext().user.details

    //For testing 
    // const user= {  
    //     first_name :"Madara",
    //     second_name : "Semini",
    //     user_type : "Assistant"
    // }

    return(
        <div className="nav-container">
            <nav className="top-nav">
                <div className="top-nav-user-info">
                    <div className="top-nav-info-name"><p>My Farm</p></div>
                    <div className="top-nav-info-type"><p>Matara - Sri Lanka</p></div>
                </div>
                <div className="top-nav-user-info">
                    <div data-testid='top-nav-info-name' className="top-nav-info-name"><p>{user.first_name+" "+user.second_name}</p></div>
                    <div data-testid='top-nav-info-type' className="top-nav-info-type"><p>Farm {user.user_type}</p></div>
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
