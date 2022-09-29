import React from "react";
import Input from "../components/inputForms/InputForm";
import Settings from "../components/settings/settings";

export default function SettingsPage()
{
    return(
        <div>
            <Input formName='Add New Sensor'>
                <Settings />
            </Input>

        </div>
    )
}