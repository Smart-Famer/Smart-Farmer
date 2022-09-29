import "./Sidebar.css"
import React from "react"
import { NavItem, NavLink, Nav } from "reactstrap"
import {BiHome} from "react-icons/bi";
import {MdOutlineSpaceDashboard} from "react-icons/md";
import {BsPerson} from "react-icons/bs";
import {BsPersonPlus} from "react-icons/bs";
import {GiChart} from "react-icons/gi";
import {MdOutlineInsertPhoto} from "react-icons/md";
import {MdOutlineLogout} from "react-icons/md";
import {MdOutlineSettings} from "react-icons/md";

export default function Sidebar(){
    return(
        <div className="sidebar">
            <div className="sidebar-top">
                <h4 className="sidebar-title">Smart Farmer</h4>
                <div className="sidebar-logo-container">
                    <img className="sidebar-logo" src="/images/profilepic.jpg" alt="profile picture"/>
                </div>
            </div>
            <div className="sidebar-center">
                <Nav className="sidebar-nav" vertical pills>
                    <NavItem  className="sidebar-nav-item">
                        <BiHome className="sidebar-item-logo" size={30}/>
                        <NavLink className="sidebar-nav-link" href="/home">
                        Home
                        </NavLink>
                    </NavItem>
                    <NavItem  className="sidebar-nav-item">
                        <MdOutlineSpaceDashboard className="sidebar-item-logo" size={30}/>
                        <NavLink className="sidebar-nav-link" href="/">
                        Dashboard
                        </NavLink>
                    </NavItem>
                    <NavItem className="sidebar-nav-item">
                        <BsPerson className="sidebar-item-logo" size={30}/>
                        <NavLink className="sidebar-nav-link" href="#">
                        Profile
                        </NavLink>
                    </NavItem>
                    <NavItem className="sidebar-nav-item">
                        <BsPersonPlus className="sidebar-item-logo" size={30}/>
                        <NavLink className="sidebar-nav-link" href="#">
                        Create Account
                        </NavLink>
                    </NavItem>
                    <NavItem className="sidebar-nav-item">
                        <GiChart className="sidebar-item-logo" size={30}/>
                        <NavLink className="sidebar-nav-link" href="#">
                        Crop Yeild
                        </NavLink>
                    </NavItem>
                    <NavItem className="sidebar-nav-item">
                        <MdOutlineInsertPhoto className="sidebar-item-logo" size={30}/>
                        <NavLink className="sidebar-nav-link" href="#">
                        Gallery
                        </NavLink>
                    </NavItem>
                    <NavItem className="sidebar-nav-item">
                        <MdOutlineSettings className="sidebar-item-logo" size={30}/>
                        <NavLink className="sidebar-nav-link" href="#">
                        Settings
                        </NavLink>
                    </NavItem >
                    <NavItem className="sidebar-nav-item">
                        <MdOutlineLogout className="sidebar-item-logo" size={30}/>
                        <NavLink className="sidebar-nav-link" href="#">
                        Logout
                        </NavLink>
                    </NavItem >
                </Nav>
            </div>
        </div>
    )
}
