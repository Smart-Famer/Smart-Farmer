
import Header from "../components/login/Header.js"
import { Link } from "react-router-dom"

import LoginNavBar from "../components/NavBars/LoginNavbar"
import Sidebar from "../components/Sidebar/SideBar.js"

export default function Home()
{
    return(
        <div className="main-container">
            <Sidebar/>
            <div className="home">
                <Header />
            </div>
        </div>
    )
}