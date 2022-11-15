import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Input from "../components/inputForms/InputForm";
import CreateAss from "../components/userManagment/createManager";

export default function CreateManagerPage() {
  const [Managers, setManagers] = useState([]);
  // const {Managers, dispatchManagers} = useAssistantContext()
  useEffect(() => {
    const fetchManagers = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_HOST}/api/user/get-managers`
      );

      const json = await response.json();
      setManagers(json);
    };
    fetchManagers();
  }, []);
  // console.log(assistants)

  return (
    <div className="main-container">
      <div>
        <Input formName="Create Manager">
          <CreateAss manager={Managers} setManager={setManagers} />
        </Input>
      </div>
    </div>
  );
}
