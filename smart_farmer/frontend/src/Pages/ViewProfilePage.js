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
        <div className="row justify-content-center m-2">
            <div className='col col-lg-10 col-xl-8'>
            <Profile/>
            </div>
        </div>
        </>
        
    )
}