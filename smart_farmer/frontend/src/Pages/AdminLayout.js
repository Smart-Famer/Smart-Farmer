import React from "react";
import { Route, Routes } from "react-router-dom";
import "../App.css";
import Navbar from "../components/NavBars/AdminNav";
import Admin from "./AdminPanel";
import CreateManagerPage from "./CreateMangerPage";
import Error from "./Error";
import ViewAllAssistants from "./ViewAllassistants";
import ViewAllFarms from "./ViewAllFarms";
import ViewAllManagers from "./ViewAllManagers";
//import Test from './Test';

export default function AdminLayout() {
  return (
    <section>
      <Navbar />
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
