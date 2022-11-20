import "../App.css";
import React from "react"
import { Route, Routes } from "react-router-dom"
import Navbar from "../components/NavBars/NavBar"
import HomePage from './HomePage';
import Dashboard from './Dashboard';
import NPKpage from './NPKpage';
import ElecConPage from './ElectricConductivityInput'
import Gallery from './Gallery';
import ModuleActionsPage from './ModuleActions';
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
import HistoricalNPKpage from "./HistoricalNpkPage";
import Sidebar from "../components/Sidebar/SideBar1";
import ModulesPage from "./ModulesPage"
import FarmDetailsPage from './FarmDetails'

export default function FarmLayout(props)
{
    return(
        <>
            <div>
                <Sidebar/>
            </div>
            <Routes>
                <Route path='*' element={<Error/>}/>
                <Route path='dashboard' element={<Dashboard socket={props.socket} />}/>
                <Route path='gallery' element={<Gallery />}/>
                <Route path='gallery/:date' element={<GalleryItem />}/>
                <Route path='npkinput' element={<NPKpage />}/>
                <Route path="historicalnpk" element={<HistoricalNPKpage />} />
                <Route path='elecinput' element={<ElecConPage />}/>
                <Route path='Modules' element={<ModulesPage />} />
                <Route path='Modules/:type/:module/:_id' element={<ModuleActionsPage />} />
                <Route path='controlPanel' element={<ControlPanel />}/>
                <Route path='cropYield' element={<CropYieldDataPage />}/>
                <Route path='cropyieldinput' element={<CropYieldInput />}/>
                <Route path='history' element={<HistoricalData  />} />
                <Route path='farm-details' element={<FarmDetailsPage />} />
                <Route path='createAcc' element={
                    <AssistantContextProvider>
                        <CreateAss />
                    </AssistantContextProvider>
                } />
            </Routes>
        </>
    )
}