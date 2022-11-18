import React from "react";
import Input from "../components/inputForms/InputForm";
import AddSensor from "../components/settings/AddSensor";
import AddActuator from "../components/settings/AddActuator";
import Sidebar from "../components/Sidebar/SideBar";
import EditSensor from "../components/settings/EditSensor";
import EditActuator from "../components/settings/EditActuator";
import { useParams } from "react-router";

export default function ModuleActionsPage() {
  const {type,module,_id} = useParams()
  return (
    <div className="">
      <div className="row justify-content-center mt-4">
        {type==="add-sensor"&&<div className="col-11 col-md-6 col-lg-5">
          <Input formName="Add New Sensor">
            <AddSensor />
          </Input>
        </div>}
        {type==="edit-sensor"&&<div className="col-11 col-md-6 col-lg-5">
          <Input formName="Edit Sensor">
            <EditSensor module={module} _id={_id}/>
          </Input>
        </div>}
        {type==="add-actuator"&&<div className="col-11 col-md-6 col-lg-5">
          <Input formName="Add New Actuator">
            <AddActuator />
          </Input>
        </div>}
        {type==="edit-actuator"&&<div className="col-11 col-md-6 col-lg-5">
          <Input formName="Edit Actuator">
            <EditActuator module={module} _id={_id}/>
          </Input>
        </div>}
      </div>
    </div>
  );
}
