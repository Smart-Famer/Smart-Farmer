import React from "react";
import Input from "../components/inputForms/InputForm";
import AddSensor from "../components/settings/AddSensor";
import AddActuator from "../components/settings/AddActuator";
import Sidebar from "../components/Sidebar/SideBar";

export default function SettingsPage()
{
    return(
        <div className="main-container">
            <div class="row">
                <div className="col-6 m-1">
                    <Input formName='Add New Sensor'>
                        <AddSensor />
                    </Input>
                </div>
                <div className="col-6 m-1">
                    <Input formName='Add New Actuator'>
                        <AddActuator />
                    </Input>
                </div>
            </div>
            
        </div>
        
    )
}