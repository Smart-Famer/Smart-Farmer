import "../App.css";
import React from "react"
import { Route, Routes, Navigate} from "react-router-dom"
import Navbar from "../components/NavBars/AdminNavBar"
import Error from './Error';
import Admin from "./AdminPanel"
import ViewAllFarms from "./ViewAllFarms";
import ViewAllManagers from "./ViewAllManagers";
import ViewAllAssistants from "./ViewAllassistants";

//import Test from './Test';


export default function AdminLayout()
{
    return(
        
        <section>
            <Navbar/>
            <Routes>
                <Route path='*' element={<Error/>}/>
                <Route path='dashboard' element={<Admin />  }/>
                <Route path='viewAllFarms' element={<ViewAllFarms />}/>
                <Route path='viewAllManagers' element={<ViewAllManagers />}/>
                <Route path='viewAllAssistants' element={<ViewAllAssistants />}/>
            </Routes>
        </section>
    )
}