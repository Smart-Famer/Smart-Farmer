import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFarmContext } from "../../hooks/useFarmContext";
import ModalTemp from "../Modal/Modal";
import { useNavigate } from "react-router";
import { BsCheckLg } from "react-icons/bs";

export default function EditActuator({module,_id}) {
  const [modalShow, setModalShow] = useState(false);
  const [name, setName] = useState("");
  const [port, setPort] = useState("");
  const [actuator_type, setActuator_type] = useState("Water Pump");
  const [error, setError] = useState(null);
  const { farm, dispatchFarm } = useFarmContext();
  const navigate = useNavigate()

  const [validateError, setValidate] =useState("");

  const isNumber=(str) =>{
    if (str.trim() === '') {
      return false;
    }
  
    return !isNaN(str);
  }
  const Validate= (actuator_type, name, port)=>{
    var error = "";
    if (!actuator_type || !name || !port) {
      throw Error("Enter input value !");
    }
    else if(!isNumber(port)){
      throw Error("Enter a number as input !");

    }
  }

  useEffect(()=>{

    const curActuator = farm?.actuators[module]?.find((actuator)=>actuator._id===_id)
    console.log(module,_id,curActuator)
    setName(curActuator?.name.split("_")[1])
    setPort(curActuator?.port.split("-")[1])
    setActuator_type(module==="Pump"?"Water Pump":module)
  },[])
  const handleSubmit = async (e) => {
    // console.log(sensor_type)
    const actuator = { actuator_type, name, port };

    e.preventDefault();
    try{ 
    Validate(actuator_type, name, port)

    const response = await fetch(
      `${process.env.REACT_APP_HOST}/api/modules/edit-actuator`,
      {
        method: "PUT",
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
      setError(null)
      console.log("Actuator Updated:", json);
      const newActuators = farm.actuators[module]?.map((element)=>{
        if(element._id===json._id){
          return(json)
        }else{
          return element
        }
      })
      console.log(module)
      dispatchFarm({
        type:"UPDATE",
        payload:{
          actuators:{
              ...farm.actuators,
              [module]:newActuators
          }
      }
      })
      navigate("/user/farm/Modules")
    }

    }catch(err){
      setValidate(err.message)
    }
    setModalShow(true)
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
            readOnly={true}
          />
        </div>
        <div className="form-group  mb-4">
          <label htmlFor="inputActuatorType">Sensor Type</label>
          <select
            value={actuator_type}
            onChange={(e) => {
              setActuator_type(e.target.value);
            }}
            id="inputActuatorType"
            className="form-control"
          >
            {/* <option selected>Choose...</option> */}
            <option>Water Pump</option>
            <option>Camara</option>
          </select>
        </div>
        <div className="form-group mb-4">
          <label htmlFor="inputActuator">Actuator Name</label>
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

      <button type="submit" className="btn btn-green">
        Edit
      </button>
      {/* {error&&<div className="error">{error}</div>} */}
      {validateError && (
        <ModalTemp
          title={"Error"}
          message={error}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      )}
      {!validateError && !error && (
        <ModalTemp
          title={"Successful"}
          message={"Actuator Edited Successfully"}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      )}
    </form>
    </div>
  );
}
