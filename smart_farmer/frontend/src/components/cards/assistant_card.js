import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './card.css';
import { useNavigate } from "react-router";
import { useFarmContext } from "../../hooks/useFarmContext";

export default function AssistantCard(props) {

    //console.log("props",props)
    const {assistants, setAssistants,name,location,email,id} = props
    const {farm} = useFarmContext()
    const handleDelete = async ()=>{
        const response = await fetch(`${process.env.REACT_APP_HOST}/api/user/detach-farm`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ farm_id: farm._id, user_id: id }),
          }
        );
        const json = await response.json()
        //console.log("farm",json)
        if (response.ok) {
            const newArr = assistants.filter(function(ass) {
                return ass._id != id;
            });
            
            setAssistants(newArr)
        }
    }

    return (

        <div className="row--farm">
            <div className="col-sm-12">
                <div id={props.key} className="card">
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <h6 className="card-title">{id}</h6>
                        <hr></hr>
                        <p className="card-location">Email - {email}</p>
                        <p className="card-location">Location - {location}</p>
                        <button href="#" className="btn btn-danger" onClick={handleDelete}>Remove</button>
                    </div>
                </div>
            </div>
        </div>

    )
}