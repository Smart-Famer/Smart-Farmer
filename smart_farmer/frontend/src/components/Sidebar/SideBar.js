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
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFarmContext } from "../../hooks/useFarmContext";


export default function Sidebar(props){
    const {farm} = useFarmContext()
    const user = useAuthContext().user.details

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
                    {farm && <NavItem  className="sidebar-nav-item">
                        <MdOutlineSpaceDashboard className="sidebar-item-logo" size={30}/>
                        <Link className="sidebar-nav-link" to="/user/farm/dashboard">
                        Dashboard
                        </Link>
                    </NavItem>}
                    {user.user_type==="Manager" && farm &&<NavItem className="sidebar-nav-item">
                        <BsPersonPlus className="sidebar-item-logo" size={30}/>
                        <Link className="sidebar-nav-link" to="/user/farm/createAcc">
                        Create Account
                        </Link>
                    </NavItem>}
                    {user.user_type==="Assistant" && farm && <NavItem className="sidebar-nav-item">
                        <AiOutlineTool className="sidebar-item-logo" size={30}/>
                        <Link className="sidebar-nav-link" to="/user/farm/controlPanel">
                        Control Panel
                        </Link>
                    </NavItem>}
                    {farm && <NavItem className="sidebar-nav-item">
                        <GiChart className="sidebar-item-logo" size={30}/>
                        <Link className="sidebar-nav-link  text-truncate" to="/user/farm/cropYield">
                        Crop Yield
                        </Link>
                    </NavItem>}
                    {farm && <NavItem className="sidebar-nav-item">
                        <MdOutlineInsertPhoto className="sidebar-item-logo" size={30}/>
                        <Link className="sidebar-nav-link" to="/user/farm/gallery">
                        Gallery
                        </Link>
                    </NavItem>}
                    {farm && <NavItem className="sidebar-nav-item">
                        <MdOutlineSettings className="sidebar-item-logo" size={30}/>
                        <Link className="sidebar-nav-link" to="/user/farm/settings">
                        Settings
                        </Link>
                    </NavItem >}
                </Nav>
            </div>
        </div>
    )
}
