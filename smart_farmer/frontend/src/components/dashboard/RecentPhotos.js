import React from "react";
import { Row, Col } from "reactstrap";
import farmImage1 from "./images/farmImage1.jpg";
import farmImage2 from "./images/farmImage2.jpg";
import "../../App.css";

export default function RecentPhotos() {
  return (
    <div className="container ">
      <div className="row mb-3">
        <div className="col-12 col-md-6 mb-4">
          <div className="row">
            <div className="col">
              <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
                Date
              </label>
            </div>
            <div className="col">
              <input
                type="text"
                readOnly
                className="form-control-plaintext"
                id="staticEmail"
                value="02/09/2022"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
                Time
              </label>
            </div>
            <div className="col">
              <input
                type="text"
                readOnly
                className="form-control-plaintext"
                id="staticEmail"
                value="16:33"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
                Camera Angle
              </label>
            </div>
            <div className="col">
              <input
                type="text"
                readOnly
                className="form-control-plaintext"
                id="staticEmail"
                value="1"
              />
            </div>
          </div>
          <div className="row mt-1">
            <img className="w-75" src={farmImage1} alt="farmImage1" />
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="row">
            <div className="col">
              <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
                Date
              </label>
            </div>
            <div className="col">
              <input
                type="text"
                readOnly
                className="form-control-plaintext"
                id="staticEmail"
                value="02/09/2022"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
                Time
              </label>
            </div>
            <div className="col">
              <input
                type="text"
                readOnly
                className="form-control-plaintext"
                id="staticEmail"
                value="16:33"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
                Camera Angle
              </label>
            </div>
            <div className="col">
              <input
                type="text"
                readOnly
                className="form-control-plaintext"
                id="staticEmail"
                value="1"
              />
            </div>
          </div>
          <div className="row mt-1">
            <img className="w-75" src={farmImage1} alt="farmImage1" />
          </div>
        </div>
      </div>
    </div>
  );
}
