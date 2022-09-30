import React, { useState } from "react"

import LoginNavBar from "../components/NavBars/LoginNavbar"
import "../App.css"
import Sidebar from "../components/Sidebar/SideBar"
import Carousel from "../components/Gallery/Carousel"
import { Container,Row,Col, Button} from "reactstrap";
import Slideshow from "../components/Gallery/Slideshow"

export default function Gallery()
{
    
    return(
        <div className="main-container">
            <div>
                <Sidebar/>
            </div>
            <Slideshow />
        </div>                
    )
}