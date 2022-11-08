import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useFarmContext } from "../../hooks/useFarmContext";

export default function AddSensor() {

    const [sensor_type, setSensor_type] = useState('Temperature')
    const [name, setName] = useState('')
    const [port, setPort] = useState('')
    const [error, setError] = useState(null)
    const {farm, dispatchFarm} = useFarmContext()

  const handleSubmit = async (e) => {
    // console.log(sensor_type)
    e.preventDefault()

    const sensor = {sensor_type,name,port}
   
    const response = await fetch('http://localhost:4000/api/modules/add-sensor',{
        method: 'POST', 
        body:JSON.stringify({
          sensor,
          farm_id:farm._id,
          farm_name:farm.name
        }),
        headers: {
            'Content-type':'application/json'
        }
    })
    const json = await response.json()

    if(!response.ok){
      setError(json.err)
      console.log(json.error)
    }
    if(response.ok){
      setError(null)
      setSensor_type('Temperature')
      setName('')
      setPort('')
      dispatchFarm({type:"ADD-SENSOR", payload:json})
      console.log('New sensor added:',json)
    }
  }

    return (
      //should validate port number (4-digit, numeric)
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
                            <option>Soil Humidity</option>
                        </select>
                    </div>
                <div className="form-group p-3">
                    <label htmlFor="inputSensor">Sensor Name</label>
                    <input 
                        value={name}
                        onChange={(e)=>{setName(e.target.value)}}
                        type="text" className="form-control" id="inputSensor" placeholder="Sensor 1,2.." required={true}/>
                </div>
                <div className="form-group p-3">
                    <label htmlFor="inputSensorPort">Port Number</label>
                    <input 
                        value={port}
                        onChange={(e)=>{setPort(e.target.value)}}
                        type="text" className="form-control" id="inputSensorPort" required={true}/>
                </div>
                
            
                <button type="submit" className="btn btn-green">Connect</button>
                {error&&<div className="error">{error}</div>}
            </form>
        
    )
}