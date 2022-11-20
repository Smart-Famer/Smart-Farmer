import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFarmContext } from "../../hooks/useFarmContext";
import ModalTemp from "../Modal/Modal";

export default function AddActuator() {
  const [modalShow, setModalShow] = useState(false);
  const [actuator_type, setActuator_type] = useState("Water Pump");
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
  const Validate= (actuator_type, name, port )=>{
    var error = "";
    if (!actuator_type || !name || !port) {
      return error = "Enter input value !";
    }
    else if(!isNumber(port)){
      return error = "Enter a number as input !";

    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidate(Validate(actuator_type,name,port))

    const actuator = { actuator_type, name, port };

    //console.log(actuator)
    const response = await fetch(`${process.env.REACT_APP_HOST}/api/modules/add-actuator`,
      {
        method: "POST",
        body: JSON.stringify({
          actuator,
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
      setError(json.error);
      console.log(json.error);
    }
    if (response.ok) {
      setError(null);
      setActuator_type("Water Pump");
      setName("");
      setPort("");
      dispatchFarm({ type: "ADD-ACTUATOR", payload: json });
      console.log("New Actuator added:", json);
    }
    setModalShow(true);
  };

  return (
    //should validate port number (4-digit, numeric)
    <div className="me-4">
      <form onSubmit={handleSubmit}>
        <div className="form-group  mb-4">
          <label htmlFor="inputActuatorType">Actuator Type</label>

          <select
            value={actuator_type}
            onChange={(e) => {
              setActuator_type(e.target.value);
            }}
            id="inputSensorType"
            className="form-control"
          >
            {/* <option selected>Choose...</option> */}
            <option>Water Pump</option>
            <option>Camera</option>
          </select>
        </div>
        <div className="form-group mb-4">
          <label htmlFor="inputSensor">Actuator Name</label>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            className="form-control"
            id="inputActuator"
            placeholder="Actuator 1,2.."
            required={true}
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="inputActuatorPort">Port Number</label>
          <input
            value={port}
            onChange={(e) => {
              setPort(e.target.value);
            }}
            type="text"
            className="form-control"
            id="inputActuatorPort"
            required={true}
          />
        </div>

        <button type="submit" className="btn btn-green">
          Connect
        </button>
        {/* {error && <div className="error">{error}</div>} */}


      {validateError && (
        <ModalTemp
          title={"Error"}
          message={validateError}
          color="danger"
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      )}
      {!validateError && !error && (
        <ModalTemp
          title={"Successful"}
          message={"New actuator added successfully"}
          color="primary"
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      )}
    </form>
    </div>

  );
}
