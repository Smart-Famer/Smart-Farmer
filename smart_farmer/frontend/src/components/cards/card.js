import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './card.css';
import { useNavigate } from "react-router";
import { useFarmContext } from "../../hooks/useFarmContext";

export default function Card(props) {

    //console.log("props",props)
    const {dispatchFarm} = useFarmContext()
    const navigate = useNavigate()
    const handleClick = async ()=>{
    console.log("handle");
        }
        navigate("/user/viewAll")
    

    return (

        <div className="row--farm">
            <div className="col-sm-12">
                <div id={props.key} className="card">
                    <div className="card-body">
                        <h5 className="card-title">{props.name}</h5>
                        <p className="card-location">{props.location}</p>
                        <button href="#" className="btn btn-green" onClick={handleClick}>View</button>
                    </div>
                </div>
            </div>
        </div>

    )
}