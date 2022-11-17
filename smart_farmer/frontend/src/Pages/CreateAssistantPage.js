import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import AssistantCard from "../components/cards/assistant_card.js";
import Input from "../components/inputForms/InputForm";
import Sidebar from "../components/Sidebar/SideBar";
import AddAss from "../components/userManagment/addAssistant";
import CreateAss from "../components/userManagment/createAssitant";
import { useFarmContext } from "../hooks/useFarmContext";


export default function CreateAssistantPage() {

    const [assistants, setAssistants] = useState([])
    const {farm} = useFarmContext()
    // const {assistants, dispatchAssistants} = useAssistantContext()
    useEffect(()=>{
        const fetchAssistants = async ()=>{
            const response = await fetch(`${process.env.REACT_APP_HOST}/api/user/get-assistants`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ farm_id: farm._id }),
              }
            );

            const json = await response.json()
            setAssistants(json)
        }
        fetchAssistants()
    },[])
    // console.log(assistants)
    
    const assistant_components = assistants.map((assistant)=><Col key={assistant._id}><AssistantCard id={assistant._id} name={assistant.first_name+" "+assistant.second_name} location={assistant.location} email={assistant.email} profile_pic={assistant.profile_picture} assistants={assistants} setAssistants={setAssistants}></AssistantCard></Col>)
    if(assistant_components.length===0){
        assistant_components.push(<h3>No Assistants in the Farm</h3>)
    }
    return (
        <div className="main-container">
            <div>
                <div className="farm-card p-5">
                    
                    <Container >
                        <Row>
                            {assistant_components}
                        </Row>
                    </Container>

                </div>
                <Input formName='Add Assitant'>
                    <AddAss assistants={assistants} setAssistants={setAssistants} />
                </Input>
                <Input formName='Create Assitant'>
                    <CreateAss assistants={assistants} setAssistants={setAssistants} />
                </Input>
                
            </div>
        </div>
    )
}