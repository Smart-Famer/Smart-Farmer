import React from "react";
import Input from "../components/inputForms/InputForm";
import NPK from "../components/inputForms/NPKinput";
import Sidebar from "../components/Sidebar/SideBar";

export default function NPKpage() {
    return (
        <div className="main-container">
            <Sidebar/>
            <div>
                <Input formName='NPK Input Form'>
                    <NPK />
                </Input>
            </div>
        </div>
    )
}