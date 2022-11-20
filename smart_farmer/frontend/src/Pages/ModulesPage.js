import React from "react"
import { useNavigate } from "react-router"
import ActuatorTable from "../components/settings/ActuatorTable"
import SensorTable from "../components/settings/SensorTable"

export default function Modules(){
    const navigate = useNavigate()

    return(
        <>
            <div className="row mt-3 justify-content-center me-2 ms-2">
                <div className="card col-md-8 col-lg-7 col-xl-6">
                    <div className="card-body">
                        <h5 className="card-title">Sensors</h5>
                        <div>
                            <SensorTable/>
                        </div>
                        <button className="btn btn-success rounded-circle shadow" onClick={()=>{navigate("/user/farm/Modules/add-sensor/module/00")}}><i className="bi-plus"></i></button>
                    </div>
                </div>
            </div>
            <div className="row mt-3 justify-content-center me-2 ms-2">
                <div className="card col-md-8 col-lg-7 col-xl-6">
                    <div className="card-body">
                        <h5 className="card-title">Actuators</h5>
                        <div>
                            <ActuatorTable/>
                        </div>
                        <button className="btn btn-success rounded-circle shadow" onClick={()=>{navigate("/user/farm/Modules/add-actuator/module/00")}}><i className="bi-plus"></i></button>
                    </div>
                </div>
            </div>

        </>

    )


}