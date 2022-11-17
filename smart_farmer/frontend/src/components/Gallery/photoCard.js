import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { usePhotoContext } from "../../hooks/usePhotoContext";

export default function PhotoCard({ date, _id }) {
  const { photos, dispatchPhotos } = usePhotoContext();
  const photo = photos[date].find((obj) => obj._id === _id);

  const handleDelete = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_HOST}/api/photos/delete-photo/${_id}`,
      {
        method: "GET",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    const json = await response.json();
    if (!response.ok) {
      console.log("here");
      console.log(json);
      return;
    }
    if (photos[date].length === 1) {
      dispatchPhotos({ type: "DELETE-DATE", payload: { date } });
      //bakend api call to delete the photo
    } else {
      dispatchPhotos({ type: "DELETE-PHOTO", payload: { date, _id } });
      //backend api call to delete photo
    }
  };

  // console.log(countState)
  return (
    <div className="col">
      <div className="card">
        <img src={photo.src} className="card-img-top" alt="Waterfall" />
        <div className="card-body ">
          <h5 className="card-title"></h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Time - {photo.time}</li>
            <li className="list-group-item">
              Camera Angle - {photo.camera_angle}
            </li>
          </ul>
          <button
            className="btn btn-danger btn-sm mt-3 ms-3"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
