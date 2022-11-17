import React from 'react'
import Profile from '../components/Profile'
import { useFarmContext } from '../hooks/useFarmContext'
import Sidebar from "../components/Sidebar/SideBar1";

export default function ViewProfilePage(){
    const {farm} = useFarmContext()
    return(
        <>
        <div>
            {farm&&<Sidebar/>}
        </div>
        <div className="d-flex justify-content-center">
            <Profile/>
        </div>
        </>
        
    )
}