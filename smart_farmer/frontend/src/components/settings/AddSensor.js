import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFarmContext } from "../../hooks/useFarmContext";
import PopUpModal from "../Modal/Modal";

export default function AddSensor() {
  const [modalShow, setModalShow] = useState(false);
  const [sensor_type, setSensor_type] = useState("Temperature");
  const [name, setName] = useState("");
  const [port, setPort] = useState("");
  const [error, setError] = useState(null);
  const { farm, dispatchFarm } = useFarmContext();
  const [validateError, setValidate] =useState("");

  const isNumber=(str) =>{
    if (str.trim() === '') {
      return false;
    }
  
    return !isNaN(str);
  }
  const Validate= (sensor_type,name,port)=>{
    var error = "";
    if (!sensor_type || !name || !port) {
      throw Error("Enter input value !");
    }
    else if(!isNumber(port)){
      throw Error("Enter a number as input !");

    }
  }

  const handleSubmit = async (e) => {
    // console.log(sensor_type)
    e.preventDefault();
    try{ 
    Validate(sensor_type,name,port)

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
    console.log(json)
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
  }catch(err){
    setValidate(err.message)
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
      {validateError && (
        <PopUpModal
          title={"Error"}
          message={validateError}
          color="danger"
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      )}
      {!validateError && !error && (
        <PopUpModal
          title={"Successful"}
          message={"New sensor added successfully"}
          color="primary"
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      )}
    </form>
    </div>
  );
}
