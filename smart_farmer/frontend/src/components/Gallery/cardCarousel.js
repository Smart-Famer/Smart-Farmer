import React from "react";
import { useNavigate } from "react-router-dom";
import { usePhotoContext } from "../../hooks/usePhotoContext";
import "./Carousel.css";
import PhotoCard from "./photoCard";

function CardCarousel({ date }) {
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
  const { photos, dispatchPhotos } = usePhotoContext();

  if (photos[date]) {
    return (
      <div>
        <div className="row m-4">
          <div className="col-9 col-md-6 col-lg-3">
            <div className="row">
              <h4 className="font-monospace">Photos Taken on: </h4>
            </div>
            <div className="row">
              <h4 className="font-monospace">
                {date} - {dayArr[new Date(date).getDay()]}{" "}
              </h4>
            </div>
          </div>
          <div className="col-2 col-md-3 col-lg-2 ms-1">
            <button
              className="btn btn-secondary"
              onClick={() => {
                navigate("/user/farm/gallery");
              }}
            >
              Go to Gallery
            </button>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 m-3">
          {photos[date].map((element) => (
            <div className="col">
              <PhotoCard date={date} _id={element._id} />
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="row m-4">
          <div className="col-12 col-lg-3">
            <h4 className="row fw-bold text-danger font-monospace">
              No Photos are Taken on
            </h4>
            <h4 className="row fw-bold text-danger font-monospace">
              {date} - {dayArr[new Date(date).getDay()]}{" "}
            </h4>
          </div>
          <div className="col-12 col-lg-3 mt-2">
            <button
              className="btn btn-secondary"
              onClick={() => {
                navigate("/user/farm/gallery");
              }}
            >
              Go to Gallery
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CardCarousel;
