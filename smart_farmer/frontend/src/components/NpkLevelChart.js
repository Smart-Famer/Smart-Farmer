import React, { useEffect, useState } from "react";
import "../App.css";
import { useFarmContext } from "../hooks/useFarmContext";
import LineChart from "./dashboard/LineChart";

export default function NpkLevelChart() {
  const [duration, setDuration] = useState("weekly");
  const [xAxisV, setXaxisV] = useState([]);
  const [nLevels, setNLevels] = useState([]);
  const [pLevels, setPLevels] = useState([]);
  const [kLevels, setKLevels] = useState([]);

  const [nVisibility, setNVisibility] = useState(true);
  const [pVisibility, setPVisibility] = useState(true);
  const [kVisibility, setKVisibility] = useState(true);

  const { farm } = useFarmContext();
  const sourceId = farm.NPK_levels_key;

  useEffect(() => {
    const fetchPastNpkLevels = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_HOST}/api/datareading/npklevel/historicaldata/?sourceid=${sourceId}&duration=${duration}`
      );
      const json = await response.json();
      if (response.ok) {
        const temp_xAxisV = json.map((level) => {
          const day = new Date(level.timestamp)
          return `${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`;
        });
        const temp_n = json.map((level) => {
          return level.n;
        });
        const temp_p = json.map((level) => {
          return level.p;
        });
        const temp_k = json.map((level) => {
          return level.k;
        });
        setXaxisV(temp_xAxisV);
        setNLevels(temp_n);
        setPLevels(temp_p);
        setKLevels(temp_k);
      }
    };
    fetchPastNpkLevels();
  }, [duration]);

   const handleDurationChange = (e) => {
     const duration = e.currentTarget.value;
     setDuration(duration);
   };

  const handleTypeChange = (e) => {
    const type = e.currentTarget.id;
    if (e.currentTarget.checked) {
      switch (type) {
        case "nLevel":
          setNVisibility(true);
          break;
        case "pLevel":
          setPVisibility(true);
          break;
        case "kLevel":
          setKVisibility(true);
          break;

        default:
          break;
      }
    }else{
      switch (type) {
        case "nLevel":
          setNVisibility(false);
          break;
        case "pLevel":
          setPVisibility(false);
          break;
        case "kLevel":
          setKVisibility(false);
          break;

        default:
          break;
    }
    };
  }

  return (
    <>
    <div className="row me-4">
        <div className="col-12 col-sm-2 col-lg-2">
          <label htmlFor="secton" className="form-label">Filter By:</label>
        </div>
        <div className="col-12 col-sm-4 col-lg-3">
          <select
            name="section"
            id="section"
            className="form-select"
            aria-label="Default select example"
            onChange={handleDurationChange}
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
    </div>
    <br></br>
    <div className="row">
      <div className="col-12 col-lg-9">
        <LineChart
          xAxisLabel="Date"
          yAxisLabel="NPK Level"
          chartTitle="Historical Data"
          xAxisValues={xAxisV}
          dataSets={[
            {
              label: "Nitrogen Level",
              data: nLevels,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              visibility: nVisibility,
            },
            {
              label: "phosphorus Level",
              data: pLevels,
              borderColor: "rgb(255, 200, 100)",
              backgroundColor: "rgba(255, 200, 100,0.5)",
              visibility: pVisibility,
            },
            {
              label: "Potassium Level",
              data: kLevels,
              borderColor: "rgb(100, 150, 100)",
              backgroundColor: "rgba(100, 150, 100, 0.5)",
              visibility: kVisibility,
            },
          ].filter((e) => {
            return e.visibility === true;
          })}
        />
      </div>
      <div className="col-12 col-lg-2 me-1">
        <h5>Filter by:</h5>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="nLevel"
            onChange={handleTypeChange}
            defaultChecked
          />
          <label className="form-check-label" htmlFor={"nLevel"}>
            N Level
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="pLevel"
            onChange={handleTypeChange}
            defaultChecked
          />
          <label className="form-check-label" htmlFor={"pLevel"}>
            P Level
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="kLevel"
            onChange={handleTypeChange}
            defaultChecked
          />
          <label className="form-check-label" htmlFor={"kLevel"}>
            K Level
          </label>
        </div>
        <br />
      </div>
    </div>
    </>
  );
}
