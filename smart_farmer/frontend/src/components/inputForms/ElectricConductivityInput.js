import React, { useState } from "react";

import "./inputform.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DisplayAlert from "../DisplayAlert";
import { useFarmContext } from "../../hooks/useFarmContext";
import PopUpModal from "../Modal/Modal";
import validator from "validator";

export default function ElectricConductivityInput() {
  const [modalShow, setModalShow] = useState(false);
  const [inputElecCon, setInputElecCon] = useState("");
  const [error, setError] = useState(null);
  const [validateError, setValidate] = useState("");
  const { farm } = useFarmContext();

  const isNumber = (str) => {
    if (str.trim() === "") {
      return false;
    }

    return !isNaN(str);
  };
  const Validate = (input) => {
    var error = "";
    if (!input) {
      return (error = "Enter input value !");
    } else if (!isNumber(input)) {
      return (error = "Enter a number as input !");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidate(Validate(inputElecCon));

    const reading = inputElecCon;
    const sourceId = "elec";
    let timestamp = new Date().toJSON();

    const dataReading = {
      reading,
      sourceId,
      timestamp,
      secret_key: farm.secret_key,
    };

    const response = await fetch(
      `${process.env.REACT_APP_HOST}/api/datareading`,
      {
        method: "POST",
        body: JSON.stringify(dataReading),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
      setInputElecCon("");
    }
    setModalShow(true);
  };
  return (
    <div className="me-3">
      <form onSubmit={handleSubmit}>
        <div className="form-group row p-3">
          <div className="col-sm-7">
            <input
              type="text"
              data-testid="elec-con-input"
              className="form-control"
              id="inputElecCon"
              placeholder="Electric Conductivity"
              value={inputElecCon}
              onChange={(e) => {
                setInputElecCon(e.target.value);
              }}
            />
          </div>
          <label htmlFor="inputElecCon" className="col-sm-1 col-form-label">
            sm<sup>-1</sup>
          </label>
        </div>
        <button className="btn btn-green btn-block m-4">Submit</button>
        {/* {error && (<DisplayAlert type={'danger'} content={error} />)} */}
        {validateError && (
          <PopUpModal
            title={"Error"}
            message={validateError}
            color="danger"
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        )}
        {!validateError && (
          <PopUpModal
            title={"Successful"}
            message={"New electric conductivity level added successfully"}
            color="primary"
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        )}
      </form>
    </div>
  );
}
