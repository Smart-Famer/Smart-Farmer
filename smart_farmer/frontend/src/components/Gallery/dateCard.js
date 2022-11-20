import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePhotoContext } from "../../hooks/usePhotoContext";

export default function DateCard({ date }) {
  const navigate = useNavigate();
  const dayArr = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthArr = [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const { photos, dispatchPhotos } = usePhotoContext();
  const [countState, setCount] = useState(() => {
    let count = {};

    photos[date].forEach((element) => {
      if (Object.keys(count).includes(element.camera_angle)) {
        count[element.camera_angle] += 1;
      } else {
        count[element.camera_angle] = 1;
      }
    });

    return count;
  });

  return (
    <div className="card h-100">
      <img
        src={photos[date][0].src}
        className="card-img-top"
        alt="One Image on the day"
      />
      <div className="card-body">
        <h5 className="card-title">{date}</h5>
        {/* <h5 className="card-title">{monthArr[new Date(date).getUTCMonth()]} {new Date(date).getDate()} - {new Date(date).getUTCFullYear()}</h5> */}
        <h6 className="card-subtitle mb-2 text-muted">
          {dayArr[new Date(date).getDay()]}
        </h6>
        <p className="card-text">
          Consists total of {photos[date].length} photos
        </p>
        <ul className="list-group list-group-flush">
          {Object.keys(countState).map((element) => {
            return (
              <li className="list-group-item">
                {element} - {countState[element]} photos
              </li>
            );
          })}
        </ul>
        <button
          className="btn btn-success btn-sm m-3"
          onClick={() => {
            navigate(`/user/farm/gallery/${date}`);
          }}
        >
          View
        </button>
      </div>
    </div>
  );
}
