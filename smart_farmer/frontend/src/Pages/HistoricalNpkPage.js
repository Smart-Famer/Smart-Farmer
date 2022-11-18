import distinctColors from "distinct-colors";
import React, { useEffect, useState } from "react";
import "../App.css";
import { useFarmContext } from "../hooks/useFarmContext";
import LineChart from "../components/dashboard/LineChart";
import Sidebar from "../components/Sidebar/SideBar";


export default function HistoricalNPKpage() {
    


  return (
    <div className="main-container">
      <Sidebar />
      <div>
        {/* <LineChart
        /> */}
      </div>
    </div>
  );
}
