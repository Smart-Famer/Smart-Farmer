import "./Sidebar.css"
import React from "react"
import {Link, Navigate} from "react-router-dom"
import { NavItem, NavLink, Nav } from "reactstrap"
import {BiHome} from "react-icons/bi";
import {MdOutlineSpaceDashboard} from "react-icons/md";
import {BsPerson} from "react-icons/bs";
import {BsPersonPlus} from "react-icons/bs";
import {GiChart} from "react-icons/gi";
import {MdOutlineInsertPhoto} from "react-icons/md";
import {MdOutlineLogout} from "react-icons/md";
import {MdOutlineSettings} from "react-icons/md";
import {AiOutlineTool} from "react-icons/ai";
import UserSession from "../Utils/UserSession"
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
export default function Sidebar(props){
    const {logout} = useLogout()
    const user = useAuthContext().user.details
    const handleClick =()=>{
        logout()
        return(
            <Navigate to="/"/>
        )
    }

    return(
        <div className="sidebar">
            <div className="sidebar-top">
                <h4 className="sidebar-title">{user.first_name+" "+user.second_name}</h4>
                <div className="sidebar-logo-container">
                    <img className="sidebar-logo" src={`/images/${user.profile_picture}`} alt="profile picture"/>
                </div>
            </div>
            <div className="sidebar-center">
                <Nav className="sidebar-nav" vertical pills>
                    <NavItem  className="sidebar-nav-item">
                        <BiHome className="sidebar-item-logo" size={30}/>
                        <Link className="sidebar-nav-link" to="/home">
                        Home
                        </Link>
                    </NavItem>
                    <NavItem  className="sidebar-nav-item">
                        <MdOutlineSpaceDashboard className="sidebar-item-logo" size={30}/>
                        <Link className="sidebar-nav-link" to="/">
                        Dashboard
                        </Link>
                    </NavItem>
                    <NavItem className="sidebar-nav-item">
                        <BsPerson className="sidebar-item-logo" size={30}/>
                        <Link className="sidebar-nav-link" to="/viewProfilePage">
                        Profile
                        </Link>
                    </NavItem>
                    {user.user_type==="Manager"&&<NavItem className="sidebar-nav-item">
                        <BsPersonPlus className="sidebar-item-logo" size={30}/>
                        <Link className="sidebar-nav-link" to="/createAcc">
                        Create Account
                        </Link>
                    </NavItem>}
                    {user.user_type==="Assistant"&&<NavItem className="sidebar-nav-item">
                        <AiOutlineTool className="sidebar-item-logo" size={30}/>
                        <Link className="sidebar-nav-link" to="/controlPanel">
                        Control Panel
                        </Link>
                    </NavItem>}
                    <NavItem className="sidebar-nav-item">
                        <GiChart className="sidebar-item-logo" size={30}/>
                        <Link className="sidebar-nav-link" to="/cropYield">
                        Crop Yeild
                        </Link>
                    </NavItem>
                    <NavItem className="sidebar-nav-item">
                        <MdOutlineInsertPhoto className="sidebar-item-logo" size={30}/>
                        <Link className="sidebar-nav-link" to="/gallery">
                        Gallery
                        </Link>
                    </NavItem>
                    <NavItem className="sidebar-nav-item">
                        <MdOutlineSettings className="sidebar-item-logo" size={30}/>
                        <Link className="sidebar-nav-link" to="/settings">
                        Settings
                        </Link>
                    </NavItem >
                    <NavItem className="sidebar-nav-item">
                        <MdOutlineLogout className="sidebar-item-logo" size={30}/>
                        <Link onClick={handleClick} className="sidebar-nav-link" to="/">
                        Logout
                        </Link>
                    </NavItem >
                </Nav>
            </div>
        </div>
    )
}
