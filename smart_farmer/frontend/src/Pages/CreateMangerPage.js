import React, { useEffect, useState } from "react";
import Input from "../components/inputForms/InputForm";
import CreateManager from "../components/userManagment/createManager";

export default function CreateManagerPage() {
  return (
    <div className="main-container">
      <div>
        <Input formName="Create Manager">
          <CreateManager />
        </Input>
      </div>
    </div>
  );
}
