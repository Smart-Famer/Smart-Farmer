import React from "react";
import Input from "../components/inputForms/InputForm";
import ElecInput from "../components/inputForms/ElectricConductivityInput.js"
import Sidebar from "../components/Sidebar/SideBar"

export default function EleInput() {
    return (
        <div className="row container justify-content-center">
            <div className="col-11 col-md-6 col-lg-5">
                <Input formName='Electric Conductivity Input'>
                    <ElecInput />
                </Input>
            </div>
        </div>
    )
}