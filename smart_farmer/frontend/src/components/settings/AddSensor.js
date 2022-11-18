import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFarmContext } from "../../hooks/useFarmContext";
import ModalTemp from "../Modal/Modal";

export default function AddSensor() {
  const [modalShow, setModalShow] = useState(false);
  const [sensor_type, setSensor_type] = useState("Temperature");
  const [name, setName] = useState("");
  const [port, setPort] = useState("");
  const [error, setError] = useState(null);
  const { farm, dispatchFarm } = useFarmContext();

  const handleSubmit = async (e) => {
    // console.log(sensor_type)
    e.preventDefault();

    const sensor = { sensor_type, name, port };
    if (sensor_type === "RainFall" && farm.sensors.RainFall.length === 1) {
      setError("Rainfall sensor already added! Delete it to add a new one");
      return;
    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/api/modules/add-sensor`,
      {
        method: "POST",
        body: JSON.stringify({
          sensor,
          farm_id: farm._id,
          farm_name: farm.name,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setError(json.err);
      console.log(json.error);
    }
    if (response.ok) {
      setError(null);
      setSensor_type("Temperature");
      setName("");
      setPort("");
      dispatchFarm({ type: "ADD-SENSOR", payload: json });
      console.log("New sensor added:", json);
    }
    setModalShow(true);
  };

  return (
    //should validate port number (4-digit, numeric)
    <div className="me-4">
      <form onSubmit={handleSubmit}>
        <div className="form-group  mb-4">
          <label htmlFor="inputSensorType">Sensor Type</label>
          <select
            value={sensor_type}
            onChange={(e) => {
              setSensor_type(e.target.value);
            }}
            id="inputSensorType"
            className="form-control"
          >
            {/* <option selected>Choose...</option> */}
            <option>Temperature</option>
            <option>Humidity</option>
            <option>RainFall</option>
            <option>Soil Humidity</option>
          </select>
        </div>
        <div className="form-group mb-4">
          <label htmlFor="inputSensor">Sensor Name</label>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            className="form-control"
            id="inputSensor"
            placeholder="Sensor 1,2.."
            required={true}
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="inputSensorPort">Port Number</label>
          <input
            value={port}
            onChange={(e) => {
              setPort(e.target.value);
            }}
            type="text"
            className="form-control"
            id="inputSensorPort"
            required={true}
          />
        </div>

        <button type="submit" className="btn btn-green">
          Connect
        </button>
        {/* {error&&<div className="error">{error}</div>} */}
        {error && (
          <ModalTemp
            title={"Error"}
            message={error}
            color="danger"
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        )}
        {!error && (
          <ModalTemp
            title={"Successful"}
            message={"New electric conductivity level added successfully"}
            color="primary"
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        )}
      </form>
    </div>
  );
}
