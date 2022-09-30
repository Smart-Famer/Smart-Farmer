import './App.css';
import 'react-router-dom';
import HomePage from './Pages/HomePage';
import Dashboard from './Pages/Dashboard';
import SharedLayout from './Pages/SharedLayout';
import LoginPage from './Pages/LoginPage';
import NPKpage from './Pages/NPKpage';
import ElecConPage from './Pages/ElectricConductivityInput'
import Error from './Pages/Error';
import Gallery from './Pages/Gallery';
import Settings from './Pages/SettingsPage';
import CreateAss from './Pages/CreateAssistantPage';
import ControlPanel from './Pages/ContolPanel';
import HistoricalData from './Pages/ViewHistorical';
import ViewProfile from "./Pages/ViewProfile"

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import CropYieldDataPage from './Pages/CropsYieldDataPage';
import UserSession from "./components/Utils/UserSession"

function App() {

//console.log(user.username)
  // console.log(UserSession.username)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/' element={<SharedLayout />} >
          <Route index element={<Dashboard />}/>
          <Route path='gallery' element={<Gallery />}/>
          <Route path='home' element={<HomePage />}/>
          <Route path='dashboard' element={<Dashboard />}/>
          <Route path='npkinput' element={<NPKpage />}/>
          <Route path='elecinput' element={<ElecConPage />}/>
          <Route path='settings' element={<Settings  />} />
          <Route path='createAcc' element={<CreateAss />} />
          <Route path='controlPanel' element={<ControlPanel />}/>
          <Route path='cropYield' element={<CropYieldDataPage />}/>
          <Route path='history' element={<HistoricalData  />} />
          <Route path='viewProfilePage' element={<ViewProfile />}/>
          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
