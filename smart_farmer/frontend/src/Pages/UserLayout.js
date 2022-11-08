import "../App.css";
import React from "react"
import { Route, Routes, Navigate} from "react-router-dom"
import Navbar from "../components/NavBars/NavBar"
import HomePage from './HomePage';
import Dashboard from './Dashboard';
import NPKpage from './NPKpage';
import ElecConPage from './ElectricConductivityInput'
import Gallery from './Gallery';
import Settings from './SettingsPage';
import CreateAss from './CreateAssistantPage';
import ControlPanel from './ContolPanel';
import HistoricalData from './ViewHistorical';
import CropYieldDataPage from './CropsYieldDataPage';
import ViewProfilePage from './ViewProfilePage';
import Error from './Error';
import FarmLayout from "./FarmLayout";
import { useFarmContext } from "../hooks/useFarmContext";
//import Test from './Test';


export default function UserLayout()
{
    const { farm } = useFarmContext()
    return(
        <section>
            <Navbar/>
            <Routes>
                <Route path='*' element={<Error/>}/>
                <Route path='home' element={<HomePage />}/>
                <Route path='farm/*' element={farm ? <FarmLayout />:<Navigate to="/user/home"/>}/>
                <Route path='createAcc' element={<CreateAss />} />
                <Route path='viewProfilePage' element={<ViewProfilePage />}/>
            </Routes>
        </section>
    )
}