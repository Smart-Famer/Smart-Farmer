import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Settings() {
    return (
            <form >
                <div className="form-group  p-3">
                        <label for="inputSensorType">Sensor Type</label>
                        <select id="inputSensorType" className="form-control">
                            <option selected>Choose...</option>
                            <option>Temperature</option>
                            <option>Humidity</option>
                            <option>RainFall</option>
                        </select>
                    </div>
                <div className="form-group p-3">
                    <label for="inputSensor">Sensor Name</label>
                    <input type="text" className="form-control" id="inputSensor" placeholder="Sensor 1,2.."/>
                </div>
                <div className="form-group p-3">
                    <label for="inputSensorPort">Port Number</label>
                    <input type="text" className="form-control" id="inputSensorPort" />
                </div>
                
            
                <button type="submit" className="btn btn-green">Connect</button>
            </form>
        
    )
}