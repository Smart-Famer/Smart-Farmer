import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './card.css';
import { useNavigate } from "react-router";
import { useFarmContext } from "../../hooks/useFarmContext";
import { MdCreate } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";


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
                <div class="embed-responsive">
                  <iframe
                    width={"100%"}
                    height={"300px"}
                    loading="lazy"
                    allowfullscreen
                    referrerpolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCi02J9WcBGHLfNAViDd2n41OsK6PMZN30
                      &q=Matara,Sri Lanka">
                  </iframe>
                </div>
                    <div className="card-body">
                        <h5 className="card-title">{props.name}<button href="#" className="btn btn-sm btn-dark ms-3 rounded-pill" onClick={handleClick}><MdCreate size={15}/></button></h5>
                        <p className="card-location">{props.location}</p>
                        <div class="row">
                          <div class="col-10">
                            <button href="#" className="btn btn-success rounded-pill" onClick={handleClick}>Enter</button>
                          </div>
                          <div class="col-2">
                            <button href="#" className="btn btn-sm btn-danger" onClick={handleClick}><MdDeleteOutline size={20}/></button>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}