import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFarmContext } from "../../hooks/useFarmContext";
import ModalTemp from "../Modal/Modal";
import { useNavigate } from "react-router";

export default function EditSensor({ module, _id }) {
  const [modalShow, setModalShow] = useState(false);
  const [name, setName] = useState("");
  const [port, setPort] = useState("");
  const [sensor_type, setSensor_type] = useState("Temperature");
  const [error, setError] = useState(null);
  const { farm, dispatchFarm } = useFarmContext();
  const navigate = useNavigate();

  const [validateError, setValidate] = useState("");

  const isNumber = (str) => {
    if (str.trim() === "") {
      return false;
    }

    return !isNaN(str);
  };
  const Validate = (sensor_type, name, port) => {
    var error = "";
    if (!sensor_type || !name || !port) {
      throw Error("Enter input value !");
    } else if (!isNumber(port)) {
      throw Error("Enter a number as input !");
    }
  };

  useEffect(() => {
    const curSensor = farm?.sensors[module]?.find(
      (sensor) => sensor._id === _id
    );

    setName(curSensor?.name.split("_")[1]);
    setPort(curSensor?.port.split("-")[1]);
    setSensor_type(module === "Soil" ? "Soil Humidity" : module);
  }, []);
  const handleSubmit = async (e) => {
    const sensor = { sensor_type, name, port };

    e.preventDefault();
    try {
      Validate(sensor_type, name, port);

      const response = await fetch(
        `${process.env.REACT_APP_HOST}/api/modules/edit-sensor`,
        {
          method: "PUT",
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
        setError(json.error);
      }
      if (response.ok) {
        setError(null);

        dispatchFarm({
          type: "UPDATE",
          payload: {
            sensors: {
              ...farm.sensors,
              [module]: farm.sensors[module].map((element) => {
                if (element._id === json._id) {
                  return json;
                } else {
                  return element;
                }
              }),
            },
          },
        });
        navigate("/user/farm/Modules");
      }
    } catch (err) {
      setValidate(err.message);
    }
    setModalShow(true);
  };

  return (
    //should validate port number (4-digit, numeric)
    <div className="me-4">
      <form onSubmit={handleSubmit}>
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
            disabled
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="inputSensorType">Sensor Type</label>
          <select
            value={sensor_type}
            onChange={(e) => {
              setSensor_type(e.target.value);
            }}
            id="inputSensorType"
            className="form-control"
            disabled
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

        <button type="submit" className="btn btn-green">
          Update
        </button>
        {/* {error&&<div className="error">{error}</div>} */}
        {validateError && (
          <ModalTemp
            title={"Error"}
            message={error}
            color="danger"
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        )}
        {!validateError && !error && (
          <ModalTemp
            title={"Successful"}
            message={"Sensor Edited Successfully"}
            color="primary"
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        )}
      </form>
    </div>
  );
}
