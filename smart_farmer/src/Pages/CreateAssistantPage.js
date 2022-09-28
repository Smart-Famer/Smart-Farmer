import React from "react";
import Input from "../components/inputForms/InputForm";
import CreateAss from "../components/userManagment/createAssitant";

export default function CreateAssistantPage() {
    return (
        <Input formName='Create Assitant Account'>
            <CreateAss />
        </Input>
    )
}