import "../App.css";
import React from "react"
import { Route, Routes } from "react-router-dom"
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
import Error from './Error';
import CropYieldInput from "../components/inputForms/CropYieldInput";
//import Test from './Test';
export default function FarmLayout()
{
    return(
        <section>
            <Routes>
                <Route path='*' element={<Error/>}/>
                <Route path='dashboard' element={<Dashboard />}/>
                <Route path='gallery' element={<Gallery />}/>
                <Route path='npkinput' element={<NPKpage />}/>
                <Route path='elecinput' element={<ElecConPage />}/>
                <Route path='settings' element={<Settings  />} />
                <Route path='controlPanel' element={<ControlPanel />}/>
                <Route path='cropYield' element={<CropYieldDataPage />}/>
                <Route path='cropyieldinput' element={<CropYieldInput />}/>
                <Route path='history' element={<HistoricalData  />} />
            </Routes>
        </section>
    )
}