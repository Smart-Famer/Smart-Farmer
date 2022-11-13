import distinctColors from "distinct-colors";
import React, { useEffect, useState } from "react";
// import { LineChart } from "react-chartjs-2/dist/utils";
import { Link } from "react-router-dom";
import "../../App.css";
import { useFarmContext } from "../../hooks/useFarmContext";
import LineChart from "./LineChart";

export default function HistoricalData() {
  const { farm } = useFarmContext();
  const sourceIds = farm.sensors.Temperature.map((e) => {
    return e.port;
  });
  const [xAxisV, setXaxisV] = useState([]);
  const [sensorIds, setSensorIds] = useState([]);
  const [data,setData]=useState([])
  const [duration,setDuration]=useState('weekly');

  function getColorList(colors_count) {
    var palette = distinctColors({ count: colors_count }).map((color) => {
      return color._rgb;
    });
    return palette;
  }

  useEffect(() => {
    const fetchTempData = async () => {
      const response = await fetch(
        `${
          process.env.REACT_APP_HOST
        }/api/history/temp?sourceids=${sourceIds.join(",")}&duration=${duration}`
      );
      const json = await response.json();
      if (response.ok) {
        //load data for x axis
        let temp_x = [];
        let temp_dataSet = [];
        let temp_sensorData = {};
        let temp_sensorIds = [];


        json.forEach((element) => {
          let fullDate = element.timestamp
          if (duration === "weekly") {
            const date = new Date(element.timestamp);
            fullDate = `${date.getFullYear()}/${
              date.getMonth() + 1
            }/${date.getDate()}`;
          }
          
          if (!temp_x.includes(fullDate)) {
            temp_x.push(fullDate);
          }
          });

          json.forEach((element) => {
            const sourceId = element.sourceId;
          let fullDate = element.timestamp;
          if (duration === "weekly") {
            const date = new Date(element.timestamp);
            fullDate = `${date.getFullYear()}/${
              date.getMonth() + 1
            }/${date.getDate()}`;
          }
            if (!(sourceId in temp_sensorData)) {
              temp_sensorIds.push(sourceId);
              temp_sensorData[sourceId] = { x: [], y: [] };
              temp_sensorData[sourceId].x.push(fullDate);
              temp_sensorData[sourceId].y.push(element.reading);
            } else {
              temp_sensorData[sourceId].x.push(fullDate);
              temp_sensorData[sourceId].y.push(element.reading);
            }
          });
            setSensorIds(temp_sensorIds);
            //
            
            let colorList = getColorList(temp_sensorIds.length);
            temp_sensorIds.forEach((id) => {
              let temp = {};
              let x_arr = temp_sensorData[id].x;
              let y_arr = temp_sensorData[id].y;
              let xy = [];
              let sensorIndex = temp_sensorIds.indexOf(id);

              temp_x.forEach((xValue) => {
                if (x_arr.includes(xValue)) {
                  let yValueIndex = x_arr.indexOf(xValue);
                  xy.push(y_arr[yValueIndex]);
                } else {
                  xy.push(0);
                }
              });

                temp["label"] = id;
                temp["data"] = xy;
                temp["visibility"] = true;
                let color = colorList[sensorIndex];
                let temp_color_ = color;
                temp_color_[-1] = 0.5;
                temp["borderColor"] = `rgb(${color.join()})`;
                let backgroundColor = temp_color_;
                temp["backgroundColor"] = `rgb(${backgroundColor.join()})`;
                temp_dataSet.push(temp);
            });
        setXaxisV(temp_x);
        setData(temp_dataSet);
      }
    };
    fetchTempData();
    // tmp_cropYieldData = JSON.parse(JSON.stringify(cropYieldData));
    // tmp_cropMonths = JSON.parse(JSON.stringify(temp_cropMonths));
  }, [duration]);

  const handleDurationChange = (e)=>{
    const duration = e.currentTarget.value
    setDuration(duration)
  }
  console.log(duration)

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
            onChange={handleDurationChange}
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>
      <div className="row px-5 historicalData--container">
        <div className="col-sm-8">
          <LineChart
            xAxisLabel="Date"
            yAxisLabel="Temperature"
            xAxisValues={xAxisV}
            // xAxisValues={[
            //   "23/09/2022",
            //   "24/09/2022",
            //   "25/09/2022"
            //   "26/09/2022",
            //   "27/09/2022",
            //   "28/09/2022",
            // ]}
            chartTitle="Historical Data"
            dataSets={data}
            // dataSets={[
            //   {
            //     label: "Sensor 1",
            //     data: [27, 26, 25.5, 28, 27, 30, 32, 34],
            //     borderColor: "rgb(255, 99, 132)",
            //     backgroundColor: "rgba(255, 99, 132, 0.5)",
            //   },
            //   {
            //     label: "Sensor 2",
            //     data: [25, 25.5, 26.5, 28, 26.5, 26, 34, 32],
            //     borderColor: "rgb(255, 200, 100)",
            //     backgroundColor: "rgba(255, 99, 132, 0.5)",
            //   },
            // ]}
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
