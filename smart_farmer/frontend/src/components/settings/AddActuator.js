import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AddActuator() {
    return (
            <form >
                <div className="form-group  p-3">
                        <label for="inputActuatorType">Actuator Type</label>
                        <select id="inputActuatorType" className="form-control">
                            <option selected>Choose...</option>
                            <option>Camera</option>
                            <option>Water Pump</option>
                        </select>
                    </div>
                <div className="form-group p-3">
                    <label for="inputSensor">Actuator Name</label>
                    <input type="text" className="form-control" id="inputActuator" placeholder="Actuator 1,2.."/>
                </div>
                <div className="form-group p-3">
                    <label for="inputActuatorPort">Port Number</label>
                    <input type="text" className="form-control" id="inputActuatorPort" />
                </div>
                
            
                <button type="submit" className="btn btn-green">Connect</button>
            </form>
        
    )
}