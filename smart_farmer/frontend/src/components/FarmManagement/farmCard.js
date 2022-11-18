import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../cards/card.css";
import { useNavigate } from "react-router";
import { useFarmContext } from "../../hooks/useFarmContext";
import { MdCreate } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function Card(props) {
  //console.log("props",props)
  const { user, dispatchAuthState } = useAuthContext();
  const { dispatchFarm } = useFarmContext();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/user/farm-actions/edit/${props.id}`);
  };

  const handleLeave = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_HOST}/api/user/detach-farm`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          farm_id: props.id,
          user_id: user.details._id,
        }),
      }
    );

    const json = await response.json();
    if (response.ok) {
      dispatchAuthState({
        type: "UPDATE",
        payload: {
          details: {
            farms: user.details.farms.filter((id) => props.id !== id),
          },
        },
      });
      alert("Successfully left the farm");
    } else {
      console.log(json.error);
    }
  };

  const handleDelete = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_HOST}/api/farm/delete-farm/${props.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();
    if (response.ok) {
      dispatchAuthState({
        type: "UPDATE",
        payload: {
          details: {
            farms: user.details.farms.filter((id) => json._id !== id),
          },
        },
      });
      alert("Farm Deleted Successfully");
    } else {
      console.log(json.error);
    }
  };

  const handleEnter = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_HOST}/api/manager/get-farms`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ farm_ids: [props.id] }),
      }
    );
    const json = await response.json();
    //console.log("farm",json)
    if (response.ok) {
      let farm = json[0];

      const res1 = await fetch(
        `${process.env.REACT_APP_HOST}/api/modules/get-sensors`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sensor_ids: farm.sensors }),
        }
      );
      const sensors = await res1.json();

      const res2 = await fetch(
        `${process.env.REACT_APP_HOST}/api/modules/get-actuators`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ actuator_ids: farm.actuators }),
        }
      );
      const actuators = await res2.json();

      farm = {
        ...farm,
        sensors,
        actuators,
      };
      dispatchFarm({
        type: "ADD",
        payload: farm,
      });
    }
    navigate("/user/farm/dashboard");
  };

  return (
    <div className="row--farm ">
      <div className="col-sm-12">
        <div id={props.key} className="card">
          <div className="embed-responsive">
            <iframe
              width={"100%"}
              height={"300px"}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCi02J9WcBGHLfNAViDd2n41OsK6PMZN30&q=${props.latitude},${props.longitude}`}
            ></iframe>
          </div>
          <div className="card-body">
            <h5 className="card-title">
              {props.name}
              {user.details.user_type === "Manager" && (
                <button
                  className="btn btn-sm btn-dark ms-3 rounded-pill"
                  onClick={handleEdit}
                >
                  <i className="bi-pencil"></i>
                </button>
              )}
            </h5>
            <p className="card-location">{props.address}</p>
            <div className="row">
              <div className="col-10">
                <button
                  className="btn btn-success rounded-pill"
                  onClick={handleEnter}
                >
                  Enter <i class="bi bi-box-arrow-in-right"></i>
                </button>
              </div>
              <div className="col-2">
                {user.details.user_type === "Assistant" && (
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={handleLeave}
                  >
                    Leave
                  </button>
                )}
                {user.details.user_type === "Manager" && (
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={handleDelete}
                  >
                    <i className="bi bi-trash3"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
