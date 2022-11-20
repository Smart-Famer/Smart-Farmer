import React from "react";
import Input from "../components/inputForms/InputForm";
import NPK from "../components/inputForms/NPKinput";

export default function NPKpage() {
    return (
        <div className="row justify-content-center">
            <div className="col-11 col-md-10 col-lg-8">
                <Input formName='NPK Input Form'>
                    <NPK />
                </Input>
            </div>
        </div>
    )
}