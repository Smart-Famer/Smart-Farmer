import "../App.css";
import React from "react"
import { Route, Routes, Navigate} from "react-router-dom"
import Navbar from "../components/NavBars/NavBar"
import HomePage from './HomePage';
import Dashboard from './Dashboard';
import NPKpage from './NPKpage';
import ElecConPage from './ElectricConductivityInput'
import Gallery from './Gallery';
import ControlPanel from './ContolPanel';
import HistoricalData from './ViewHistorical';
import CropYieldDataPage from './CropsYieldDataPage';
import ViewProfilePage from './ViewProfilePage';
import Error from './Error';
import FarmLayout from "./FarmLayout";
import FarmActions from "./FarmActions"
import { useFarmContext } from "../hooks/useFarmContext";
//import Test from './Test';


export default function UserLayout(props)
{
    const { farm } = useFarmContext()
    return(
        <>
            <Navbar/>
            <Routes>
                <Route path='*' element={<Error/>}/>
                <Route path='home' element={<HomePage />}/>
                <Route path='farm-actions/:action/:_id' element={<FarmActions />}/>
                <Route path='farm/*' element={farm ? <FarmLayout socket={props.socket} />:<Navigate to="/user/home"/>}/>
                <Route path='viewProfilePage' element={<ViewProfilePage />}/>
            </Routes>
        </>
    )
}