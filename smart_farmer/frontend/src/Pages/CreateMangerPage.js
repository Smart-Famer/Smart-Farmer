import React from "react";
import Input from "../components/inputForms/InputForm";
import CreateManager from "../components/userManagment/createManager";

export default function CreateManagerPage() {
  return (
    <div className="main-container px-5">
      <div className="m-lg-5 m-md-5 m-5 col-12 col-lg-6 col-sm-10 ">
        <Input formName="Create Manager">
          <CreateManager />
        </Input>
      </div>
    </div>
  );
}
