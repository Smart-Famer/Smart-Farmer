import React from "react";
import Input from "../components/inputForms/InputForm";
import ElecInput from "../components/inputForms/ElectricConductivityInput.js"
import Sidebar from "../components/Sidebar/SideBar"

export default function EleInput() {
    return (
        <div className="main-container">
            <div>
                <Input formName='Electric Conductivity Input'>
                    <ElecInput />
                </Input>
            </div>
        </div>
    )
}