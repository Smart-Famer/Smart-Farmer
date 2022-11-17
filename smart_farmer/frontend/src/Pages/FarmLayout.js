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
import { AssistantContextProvider } from "../context/AssistantContext";


// import { AssistantContextProvider } from "../context/AssistantContext";
// import CropYieldInput from '../components/inputForms/CropYieldInput'
import GalleryItem from './GalleryItem'
import Sidebar from "../components/Sidebar/SideBar1";

export default function FarmLayout()
{
    return(
        <>
            <div>
                <Sidebar/>
            </div>
            <Routes>
                <Route path='*' element={<Error/>}/>
                <Route path='dashboard' element={<Dashboard />}/>
                <Route path='gallery' element={<Gallery />}/>
                <Route path='gallery/:date' element={<GalleryItem />}/>
                <Route path='npkinput' element={<NPKpage />}/>
                <Route path='elecinput' element={<ElecConPage />}/>
                <Route path='settings' element={<Settings  />} />
                <Route path='controlPanel' element={<ControlPanel />}/>
                <Route path='cropYield' element={<CropYieldDataPage />}/>
                <Route path='cropyieldinput' element={<CropYieldInput />}/>
                <Route path='history' element={<HistoricalData  />} />
                <Route path='createAcc' element={
                    <AssistantContextProvider>
                        <CreateAss />
                    </AssistantContextProvider>
                } />
            </Routes>
        </>
    )
}