import React from "react";
import Input from "../components/inputForms/InputForm";
import CreateFarm from "../components/Farm";
import Sidebar from "../components/Sidebar/SideBar";

export default function CreateFarmAcc() {
    return (
        <div className="main-container">
            <Sidebar />
            <div>
                <Input formName='Create Farm'>
                    <CreateFarm />
                </Input>
            </div>
        </div>
    )
}