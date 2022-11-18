import React from "react"
import { useFarmContext } from "../../hooks/useFarmContext"
import {Link, Navigate} from "react-router-dom"
import { useAuthContext } from "../../hooks/useAuthContext"
import "./Sidebar.css"

export default function Sidebar1(){
    const {farm} = useFarmContext()
    const {user} = useAuthContext()
    return(
//         <a class="btn btn-primary" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
//   Link with href
// </a>
// <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
//   Button with data-bs-target
// </button>
<>
<div className="offcanvas offcanvas-start w-25" tabindex="-1" id="offcanvas" data-bs-keyboard="false" data-bs-backdrop="true" data-bs-scroll="true" style={{maxWidth:200}}>
    <div className="offcanvas-header  text-white">
        <h5 className="offcanvas-title d-none d-sm-block fw-bold" id="offcanvas">{farm?.name}</h5>
        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div className="offcanvas-header text-white">
        <h6 className="offcanvas-title d-none d-sm-block" id="offcanvas">{farm?.address}</h6>
    </div>
    <div className="offcanvas-body px-0">
        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start" id="menu">
            <li className="nav-item fs-5 ">
                <Link className="nav-link text-truncate" to="/user/farm/dashboard">
                    <i className="bi-columns-gap"></i><span class="ms-1 d-none d-sm-inline">Dashboard</span>
                </Link>
            </li>
            <br></br>
            {user?.details.user_type==="Manager"&&<><li className="nav-item fs-5">
                <Link className="nav-link text-truncate" to="/user/farm/createAcc">
                    <i className="fs-5 bi-person-plus"></i><span class="ms-1 d-none d-sm-inline">Create Account</span>          
                </Link>
            </li><br></br></>}    
            {user?.details.user_type==="Assistant"&&<><li className="nav-item fs-5">
                <Link className="nav-link text-truncate" to="/user/farm/controlPanel">
                    <i className="fs-5 bi-toggles2"></i><span class="ms-1 d-none d-sm-inline">Control Panel</span>                        
                </Link>
            </li><br></br></>}
            <li className="nav-item fs-5">
                <Link className="nav-link text-truncate" to="/user/farm/cropYield">
                    <i className="fs-5 bi-graph-up"></i><span class="ms-1 d-none d-sm-inline">Crop Yield</span>
                </Link>
            </li>
            <br></br>
            <li className="nav-item fs-5">
                <Link className="nav-link text-truncate" to="/user/farm/gallery">
                    <i className="fs-5 bi-images"></i><span class="ms-1 d-none d-sm-inline">Gallery</span>
                 </Link>
            </li>
            <br></br>
            <li className="nav-item fs-5">
                <Link className="nav-link text-truncate" to="/user/farm/settings">
                    <i className="fs-5 bi-gear"></i><span class="ms-1 d-none d-sm-inline">Settings</span>                        
                </Link>
            </li>
        </ul>
    </div>
</div>
</>
    )
}
