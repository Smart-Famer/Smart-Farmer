import React from "react";
import Input from "../components/inputForms/InputForm";
import ElecInput from "../components/inputForms/ElectricConductivityInput.js"

export default function EleInput() {
    return (
        <div>
            <Input formName='Electric Conductivity Input'>
                <ElecInput />
            </Input>

        </div>
    )
}