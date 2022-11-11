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

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    <form onSubmit={handleSubmit}>
      <div className="form-group  p-3">
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
      <div className="form-group p-3">
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
      <div className="form-group p-3">
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

      {error && (
        <ModalTemp
          title={"Error"}
          message={error}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      )}
      {!error && (
        <ModalTemp
          title={"Successful"}
          message={"New electric conductivity level added successfully"}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      )}
    </form>
  );
}
