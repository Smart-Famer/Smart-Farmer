import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AddActuator() {

    const [actuator_type, setActuator_type] = useState('')
    const [name, setName] = useState('')
    const [port, setPort] = useState('')
    const [error, setError] = useState(null)
    

  const handleSubmit = async (e) => {
    e.preventDefault()

    const actuator = {actuator_type,name,port}
    
    console.log(actuator)
    const response = await fetch('http://localhost:4000/api/addModule/actuator',{
        method: 'POST', 
        body:JSON.stringify(actuator),
        headers: {
            'Content-type':'application/json'
        }
    })
    const json = await response.json()

    if(!response.ok){
      setError(json.error)
    }
    if(response.ok){
      setError(null)
      setActuator_type('')
      setName('')
      setPort('')
      console.log('New Actuator added:',json)
    }
  }

    return (
            <form onSubmit={handleSubmit}>
                <div className="form-group  p-3">
                        <label htmlFor="inputActuatorType">Actuator Type</label>
                        

                        <select
                            value={actuator_type}
                            onChange={(e)=>{setActuator_type(e.target.value)}}
                            id="inputSensorType" className="form-control">
                            {/* <option selected>Choose...</option> */}
                            <option>Water Pump</option>
                            <option>Camara</option>
                        </select>
                    </div>
                <div className="form-group p-3">
                    <label htmlFor="inputSensor">Actuator Name</label>
                    <input 
                        value={name}
                        onChange={(e)=>{setName(e.target.value)}}
                        type="text" className="form-control" id="inputActuator" placeholder="Actuator 1,2.."/>
                </div>
                <div className="form-group p-3">
                    <label htmlFor="inputActuatorPort">Port Number</label>
                    <input 
                        value={port}
                        onChange={(e)=>{setPort(e.target.value)}}
                        type="text" className="form-control" id="inputActuatorPort" />
                </div>
                
            
                <button type="submit" className="btn btn-green">Connect</button>
            </form>
        
    )
}