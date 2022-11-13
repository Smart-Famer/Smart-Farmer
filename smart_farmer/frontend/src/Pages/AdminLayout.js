import "../App.css";
import React from "react"
import { Route, Routes, Navigate} from "react-router-dom"
import Navbar from "../components/NavBars/NavBar"
import Error from './Error';
import Admin from "./AdminPanel"
import ViewAll from "./ViewAll";
//import Test from './Test';


export default function AdminLayout()
{
    return(
        
        <section>
            {/* <Navbar/> */}
            <Routes>
                <Route path='*' element={<Error/>}/>
                <Route path='' element={<Admin />}/>
                <Route path='viewAll' element={<ViewAll />}/>
            </Routes>
        </section>
    )
}