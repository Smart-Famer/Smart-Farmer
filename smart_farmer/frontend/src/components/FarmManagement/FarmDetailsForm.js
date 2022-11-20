import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFarmContext } from "../../hooks/useFarmContext";

export default function FarmDetailsForm() {
  const user = useAuthContext().user.details;
  const { farm } = useFarmContext();

  return (
    <div className="me-4">
      <form>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
            <strong>Farm Name</strong>
          </label>
          <input
            type="text"
            className="form-control-plaintext"
            id="formGroupExampleInput"
            placeholder="Farm Name"
            defaultValue={farm.name}
          />
        </div>
        <hr></hr>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            <strong>
              Farm Area (m <sup>2</sup>)
            </strong>
          </label>
          <input
            type="number"
            className="form-control-plaintext"
            id="formGroupExampleInput2"
            placeholder="Farm Area"
            defaultValue={farm.area}
          />
        </div>
        <hr></hr>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            <strong>Latitude</strong>
          </label>
          <input
            type="number"
            className="form-control-plaintext"
            id="formGroupExampleInput2"
            placeholder="Latitude"
            defaultValue={farm.location.latitude}
          />
        </div>
        <hr></hr>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            <strong>Longitude</strong>
          </label>
          <input
            type="number"
            className="form-control-plaintext"
            id="formGroupExampleInput2"
            placeholder="Longitude"
            defaultValue={farm.location.longitude}
          />
        </div>
        <hr></hr>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            <strong>Address</strong>
          </label>
          <input
            type="text"
            className="form-control-plaintext"
            id="formGroupExampleInput2"
            placeholder="Address"
            defaultValue={farm.address}
          />
        </div>
      </form>
    </div>
  );
}
