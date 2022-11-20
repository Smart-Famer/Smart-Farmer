import React, { useEffect, useState } from "react"

import LoginNavBar from "../components/NavBars/LoginNavbar"
import Sidebar from "../components/Sidebar/SideBar"
import Carousel from "../components/Gallery/Carousel"
import { Container,Row,Col, Button} from "reactstrap";
import Slideshow from "../components/Gallery/Slideshow"
import CardCarousel from "../components/Gallery/cardCarousel"
import PhotoGallery from "../components/Gallery/photoGallery"
import { PhotoContextProvider } from "../context/photoContext"

export default function Gallery()
{
    return(
        <div className="">
            <PhotoContextProvider>
                <PhotoGallery/>
            </PhotoContextProvider>
        </div>                
    )
}