import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../cards/card.css'
import { useNavigate } from "react-router";
import { useFarmContext } from "../../hooks/useFarmContext";
import { MdCreate } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";


export default function Card(props) {

    //console.log("props",props)
    const {dispatchFarm} = useFarmContext()
    const navigate = useNavigate()
    const handleClick = async ()=>{
        const response = await fetch(`${process.env.REACT_APP_HOST}/api/manager/get-farms`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ farm_ids: [props.id] }),
          }
        );
        const json = await response.json()
        //console.log("farm",json)
        if (response.ok) {
            let farm = json[0]

            const res1 = await fetch(`${process.env.REACT_APP_HOST}/api/modules/get-sensors`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ sensor_ids: farm.sensors }),
              }
            );
            const sensors = await res1.json()

            const res2 = await fetch(`${process.env.REACT_APP_HOST}/api/modules/get-actuators`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ actuator_ids: farm.actuators }),
              }
            );
            const actuators = await res2.json()

            farm={
                ...farm,
                sensors,
                actuators
            }
            dispatchFarm({
                type:"ADD",
                payload:farm
            })
        }
        navigate("/user/farm/dashboard")
    }

    return (

        <div className="row--farm ">
            <div className="col-sm-12">
                <div id={props.key} className="card">
                <div class="embed-responsive">
                  <iframe
                    width={"100%"}
                    height={"300px"}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
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