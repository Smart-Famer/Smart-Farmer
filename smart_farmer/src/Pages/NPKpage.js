import React from "react";
import Input from "../components/inputForms/InputForm"
import NPK from "../components/inputForms/NPK";

export default function NPKpage() {
    return (
        <div>
            <Input formName='NPK Input Form'>
                <NPK />
            </Input>
        </div>
    )
}