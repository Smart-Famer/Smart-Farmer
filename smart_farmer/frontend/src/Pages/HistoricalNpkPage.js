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
        <LineChart
          xAxisLabel="Date"
          yAxisLabel="Temperature"
          xAxisValues={[
            "23/09/2022",
            "24/09/2022",
            "25/09/2022",
            "26/09/2022",
            "27/09/2022",
            "28/09/2022",
          ]}

          chartTitle="Historical Data"
          dataSets={[
            {
              label: "Sensor 1",
              data: [27, 26, 25.5, 28, 27, 30],
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
              label: "Sensor 2",
              data: [25, 25.5, 26.5, 28, 26.5, 26],
              borderColor: "rgb(255, 200, 100)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ]} 
        />
      </div>
    </div>
  );
}
