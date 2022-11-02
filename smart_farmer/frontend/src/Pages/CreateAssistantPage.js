import React from "react";
import Input from "../components/inputForms/InputForm";
import Sidebar from "../components/Sidebar/SideBar";
import CreateAss from "../components/userManagment/createAssitant";

export default function CreateAssistantPage() {
    return (
        <div className="main-container">
            <Sidebar/>
            <div>
                <Input formName='Create Assitant Account'>
                    <CreateAss />
                </Input>
            </div>
        </div>
    )
}