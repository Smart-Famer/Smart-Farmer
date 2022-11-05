import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AddSensor() {

    const [sensor_type, setSensor_type] = useState('')
    const [name, setName] = useState('')
    const [port, setPort] = useState('')
    const [error, setError] = useState(null)
    

  const handleSubmit = async (e) => {
    e.preventDefault()

    const sensor = {sensor_type,name,port}
    
    const response = await fetch('http://localhost:4000/api/addModule/sensor',{
        method: 'POST', 
        body:JSON.stringify(sensor),
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
      setSensor_type('')
      setName('')
      setPort('')
      console.log('New sensor added:',json)
    }
  }

    return (
            <form onSubmit={handleSubmit} >
                <div className="form-group  p-3">
                        <label htmlFor="inputSensorType">Sensor Type</label>
                        <select
                            value={sensor_type}
                            onChange={(e)=>{setSensor_type(e.target.value)}}
                            id="inputSensorType" className="form-control">
                            {/* <option selected>Choose...</option> */}
                            <option>Temperature</option>
                            <option>Humidity</option>
                            <option>RainFall</option>
                        </select>
                    </div>
                <div className="form-group p-3">
                    <label htmlFor="inputSensor">Sensor Name</label>
                    <input 
                        value={name}
                        onChange={(e)=>{setName(e.target.value)}}
                        type="text" className="form-control" id="inputSensor" placeholder="Sensor 1,2.."/>
                </div>
                <div className="form-group p-3">
                    <label htmlFor="inputSensorPort">Port Number</label>
                    <input 
                        value={port}
                        onChange={(e)=>{setPort(e.target.value)}}
                        type="text" className="form-control" id="inputSensorPort" />
                </div>
                
            
                <button type="submit" className="btn btn-green">Connect</button>
            </form>
        
    )
}