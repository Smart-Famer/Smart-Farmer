import distinctColors from "distinct-colors";
import React, { useEffect, useState } from "react";
import "../../App.css";
import { useFarmContext } from "../../hooks/useFarmContext";
import LineChart from "./LineChart";

export default function HistoricalData() {
  const { farm } = useFarmContext();

  let sensorPortName = {};
  farm.sensors.Temperature.forEach((sensor) => {
    sensorPortName[sensor.port] = sensor.name;
  });
  farm.sensors.Humidity.forEach((sensor) => {
    sensorPortName[sensor.port] = sensor.name;
  });
  farm.sensors.Soil.forEach((sensor) => {
    sensorPortName[sensor.port] = sensor.name;
  });
  farm.sensors.RainFall.forEach((sensor) => {
    sensorPortName[sensor.port] = sensor.name;
  });

  const [type, setType] = useState("temp");
  const [xAxisV, setXaxisV] = useState([]);
  const [sensorIds, setSensorIds] = useState([]);
  const [data, setData] = useState([]);
  const [duration, setDuration] = useState("weekly");
  const [error, SetError] = useState("");

  let currentDate = new Date();
  let temp_startDay = `${currentDate.getFullYear()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getDate() - 7}`;
  const [startDate, setStartDate] = useState(temp_startDay);

  function getColorList(colors_count) {
    var palette = distinctColors({ count: colors_count }).map((color) => {
      return color._rgb;
    });
    return palette;
  }

  function getActualName(name) {
    let temp = name.split("_");
    let nameWithoutFarmArr = temp.slice(1);
    let nameWithoutFarm = nameWithoutFarmArr.join("_");
    return nameWithoutFarm;
  }

  useEffect(() => {
    let sourceIds = null;
    let sensorDetails = null;
    switch (type) {
      case "temp":
        sourceIds = farm.sensors.Temperature.map((e) => {
          return e.port;
        });
        break;
      case "humidity":
        sourceIds = farm.sensors.Humidity.map((e) => {
          return e.port;
        });
        break;
      case "soil_humidity":
        sourceIds = farm.sensors.Soil.map((e) => {
          return e.port;
        });
        break;
      case "rainfall":
        sourceIds = farm.sensors.RainFall.map((e) => {
          return e.port;
        });
        break;
      default:
        sourceIds = farm.sensors.Temperature.map((e) => {
          return e.port;
        });
    }

    const fetchTempData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_HOST}/api/history/?&sourceids=${sourceIds.join(
          ","
        )}&startdate=${startDate}&duration=${duration}`
      );
      const json = await response.json();
      if (!response.ok) {
        SetError("Data Transfering error");
        setData([]);
        setXaxisV([]);
      }
      if (response.ok) {
        //load data for x axis
        let temp_x = [];
        let temp_dataSet = [];
        let temp_sensorData = {};
        let temp_sensorIds = [];

        json.forEach((element) => {
          let fullDate = element.timestamp;
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

          temp["label"] = getActualName(sensorPortName[id]);
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
  }, [duration, startDate, type]);

  const handleDurationChange = (e) => {
    const duration = e.currentTarget.value;
    setDuration(duration);
  };
  const handleStartDateChange = (e) => {
    const date = e.currentTarget.value;
    setStartDate(date);
  };
  const handleTypeChange = (e) => {
    const type = e.currentTarget.value;
    setType(type);
  };

  const handleSensorChange = (e) => {
    const sensorName = sensorPortName[e.currentTarget.id];
    let temp_data = JSON.parse(JSON.stringify(data));
    for (let d of temp_data) {
      if (d.label === getActualName(sensorName)) {
        d.visibility = !d.visibility;
      }
    }
    setData(temp_data);
  };

  const sensorCheckBox = sensorIds.map((sensorId) => {
    return (
      <div key={sensorId} className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id={sensorId}
          onChange={handleSensorChange}
          defaultChecked
        />
        <label className="form-check-label" htmlFor={sensorId}>
          {getActualName(sensorPortName[sensorId])}
        </label>
      </div>
    );
  });

  return (
    <>
      <div className="form-group">
        <div className="row me-4 ms-4">
          <div className="col col-md-4 col-sm-6">
            <label htmlFor="inputAddress" className="form-label">
              Address
            </label>
            <select
              className="form-control"
              id="inputAddress"
              aria-label="Default select example"
              onChange={handleTypeChange}
            >
              <option value="temp">Temperature</option>
              <option value="humidity">Humidity</option>
              <option value="soil_humidity">Soil Humidity</option>
              <option value="rainfall">Rainfall</option>
            </select>
          </div>
        </div>
        <br></br>
        <div className="row me-4 ms-4">
          <div className="col col-md-4">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <div className="col-sm">
              <select
                name="section"
                className="form-control"
                id="inputEmail4"
                aria-label="Default select example"
                onChange={handleDurationChange}
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>
          <div className="col col-md-4">
            {duration === "weekly" && (
              <>
                <label htmlFor="startDate" className="form-label">
                  Start Date:
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="inputPassword4"
                  onChange={handleStartDateChange}
                />
              </>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-9">
          <LineChart
            xAxisLabel="Date"
            yAxisLabel="Reading"
            xAxisValues={xAxisV}
            chartTitle="Historical Data"
            dataSets={data.filter((x) => {
              return x.visibility === true;
            })}
          />
          {/* <div className="d-flex flex-row-reverse">
            <Link to="/history" style={{ textDecoration: "none" }}>
              {"View All>"}
            </Link>
          </div> */}
        </div>
        <div className="col-lg-3 m-2">
          <div>
            <h5>Filter by sensor:</h5>
            {sensorCheckBox}
          </div>
          <br />
        </div>
      </div>
    </>
  );
}
