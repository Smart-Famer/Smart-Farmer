import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import { useFarmContext } from "../../hooks/useFarmContext";
import LineChart from "./LineChart";

export default function HistoricalData() {
    const { farm } = useFarmContext();
    const sourceIds = farm.sensors.Temperature.map((e)=>{
      return e.port
    });
    const [xAxisV,setXaxisV] = useState([])
    const [sensorNames,setSensorNames] = useState([])

    useEffect(() => {
      const fetchYieldData = async () => {
        const response = await fetch(
          `${process.env.REACT_APP_HOST}/aapi/history/temp?sourceids=${sourceIds.join(",")}&duration=weakly`
        );
        const json = await response.json();

        if (response.ok) {
          console.log(json)
        }
      };
      fetchYieldData();
      // tmp_cropYieldData = JSON.parse(JSON.stringify(cropYieldData));
      // tmp_cropMonths = JSON.parse(JSON.stringify(temp_cropMonths));
    }, []);
  return (
    <>
      <div className="row">
        <div className="col-sm-2 text-end">
          <label htmlFor="secton">Filter By:</label>
        </div>
        <div className="col-sm-2">
          <select
            name="section"
            id="section"
            className="form-select"
            aria-label="Default select example"
          >
            <option value="weekly">Weekly</option>
            <option value="weekly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>
      <div className="row px-5 historicalData--container">
        <div className="col-sm-8" >
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
          <div className="d-flex flex-row-reverse">
            <Link to="/history" style={{ textDecoration: "none" }}>
              {"View All>"}
            </Link>
          </div>
        </div>
        <div className="col-sm-4">
            <div>
                <h5>Filter by sensor:</h5>
            </div>
            <br />
            <div>
                <h5>Filter by duration:</h5>
            </div>
        </div>
      </div>
    </>
  );
}
