import React from "react";
import { Route, Routes } from "react-router-dom";
import "../App.css";
import CropYieldInput from "../components/inputForms/CropYieldInput";
import Sidebar from "../components/Sidebar/SideBar1";
import { AssistantContextProvider } from "../context/AssistantContext";
import ControlPanel from "./ContolPanel";
import CreateAss from "./CreateAssistantPage";
import CropYieldDataPage from "./CropsYieldDataPage";
import Dashboard from "./Dashboard";
import ElecConPage from "./ElectricConductivityInput";
import Error from "./Error";
import FarmDetailsPage from "./FarmDetails";
import Gallery from "./Gallery";
import GalleryItem from "./GalleryItem";
import HistoricalNPKpage from "./HistoricalNpkPage";
import ModuleActionsPage from "./ModuleActions";
import ModulesPage from "./ModulesPage";
import NPKpage from "./NPKpage";
import HistoricalData from "./ViewHistorical";

export default function FarmLayout(props) {
  return (
    <>
      <div>
        <Sidebar />
      </div>
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="dashboard" element={<Dashboard socket={props.socket} />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="gallery/:date" element={<GalleryItem />} />
        <Route path="npkinput" element={<NPKpage />} />
        <Route path="historicalnpk" element={<HistoricalNPKpage />} />
        <Route path="elecinput" element={<ElecConPage />} />
        <Route path="Modules" element={<ModulesPage />} />
        <Route
          path="Modules/:type/:module/:_id"
          element={<ModuleActionsPage />}
        />
        <Route path="controlPanel" element={<ControlPanel />} />
        <Route path="cropYield" element={<CropYieldDataPage />} />
        <Route path="cropyieldinput" element={<CropYieldInput />} />
        <Route path="history" element={<HistoricalData />} />
        <Route path="farm-details" element={<FarmDetailsPage />} />
        <Route
          path="createAcc"
          element={
            <AssistantContextProvider>
              <CreateAss />
            </AssistantContextProvider>
          }
        />
      </Routes>
    </>
  );
}
