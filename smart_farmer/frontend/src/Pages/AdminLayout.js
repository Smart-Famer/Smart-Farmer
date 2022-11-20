import "../App.css";
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Error from "./Error";
import Admin from "./AdminPanel";
import ViewAllFarms from "./ViewAllFarms";
import ViewAllManagers from "./ViewAllManagers";
import ViewAllAssistants from "./ViewAllassistants";
import CreateManagerPage from "./CreateMangerPage";
import Navbar from '../components/NavBars/AdminNav'
//import Test from './Test';

export default function AdminLayout() {
  console.log("Admin Layout");
  return (
    <section>
      <Navbar/>
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="dashboard" element={<Admin />} />
        <Route path="viewAllFarms" element={<ViewAllFarms />} />
        <Route path="viewAllManagers" element={<ViewAllManagers />} />
        <Route path="viewAllAssistants" element={<ViewAllAssistants />} />
        <Route path="createManager" element={<CreateManagerPage />} />
      </Routes>
    </section>
  );
}
