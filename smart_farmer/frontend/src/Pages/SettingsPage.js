import React from "react";
import Input from "../components/inputForms/InputForm";
import AddSensor from "../components/settings/AddSensor";
import AddActuator from "../components/settings/AddActuator";
import Sidebar from "../components/Sidebar/SideBar";
import EditSensor from "../components/settings/EditSensor";

export default function SettingsPage() {
  return (
    <div className="main-container">
      <div className="row">
        <div className="col-6 m-1">
          <Input formName="Add New Sensor">
            <AddSensor />
          </Input>
        </div>
        <div className="col-6 m-1">
          <Input formName="Edit Sensor">
            <EditSensor />
          </Input>
        </div>
        <div className="col-6 m-1">
          <Input formName="Add New Actuator">
            <AddActuator />
          </Input>
        </div>
      </div>
    </div>
  );
}
