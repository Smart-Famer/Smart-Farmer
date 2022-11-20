import React, { useEffect, useState } from "react";
import AssistantCard from "../components/cards/assistant_card.js";
import Input from "../components/inputForms/InputForm";
import AddAssistant from "../components/userManagment/addAssistant";
import CreateAssistant from "../components/userManagment/createAssitant";
import { useFarmContext } from "../hooks/useFarmContext";

export default function CreateAssistantPage() {
  const [assistants, setAssistants] = useState([]);
  const { farm } = useFarmContext();
  useEffect(() => {
    const fetchAssistants = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_HOST}/api/user/get-assistants`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ farm_id: farm._id }),
        }
      );

      const json = await response.json();
      setAssistants(json);
    };
    fetchAssistants();
  }, []);

  const assistant_components = assistants.map((assistant) => (
    <div className="col mb-2 h-100" key={assistant._id}>
      <AssistantCard
        id={assistant._id}
        name={assistant.first_name + " " + assistant.second_name}
        location={assistant.location}
        email={assistant.email}
        profile_pic={assistant.profile_picture}
        assistants={assistants}
        setAssistants={setAssistants}
      ></AssistantCard>
    </div>
  ));
  if (assistant_components?.length === 0) {
    assistant_components.push(<h3>No Assistants in the Farm</h3>);
  }
  return (
    <div className="container-fluid">
      <div className="m-lg-5 m-md-4 m-3">
        <div className="col-9 col-sm-5 col-md-4 col-lg-3">
          <AddAssistant assistants={assistants} setAssistants={setAssistants} />
        </div>
        <div>
          <div className="card-deck row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1">
            {assistant_components}
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-lg-6 col-sm-10 ">
            <Input formName="Create Assitant Account">
              <CreateAssistant
                assistants={assistants}
                setAssistants={setAssistants}
              />
            </Input>
          </div>
        </div>
      </div>
    </div>
  );
}
