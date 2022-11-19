import React, { useEffect, useRef, useState } from "react";
import "./inputform.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DisplayAlert from "../DisplayAlert";
import { useFarmContext } from "../../hooks/useFarmContext";
import PopUpModal from "../Modal/Modal";



export default function NPKInput() {
  const [modalShow, setModalShow] = useState(false);
  const [nitrogenLevel, setNitrogenLevel] = useState("");
  const [potassium, setPotassiumLevel] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [validateError, setValidate] =useState("");

  const { farm } = useFarmContext();


  const [error, setError] = useState(null);

  const isNumber=(str) =>{
    if (str.trim() === '') {
      return false;
    }
  
    return !isNaN(str);
  }
  const Validate= (n,p,k)=>{
    console.log(n);
    var error = "";
    if (!n || !p || !k) {
      return error = "Enter input value !";
    }
    else if(!isNumber(n) || !isNumber(p) || !isNumber(k)){
      return error = "Enter a number as input !";

    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidate(Validate(nitrogenLevel,phosphorus,potassium))
    
    const sourceId = farm.NPK_levels_key;
    let timestamp = new Date().toJSON();

    const dataReading = { 
       sourceId,
       timestamp,
       n:nitrogenLevel,
       p:phosphorus,
       k:potassium
     };


    const response = await fetch(`${process.env.REACT_APP_HOST}/api/datareading/npklevel`,
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
      setNitrogenLevel("");
      setPhosphorus("");
      setPotassiumLevel("");
      console.log("New npk level added:", json);
    }
    setModalShow(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group row p-3">
          <label htmlFor="inputNitrogen" className="col-sm-4 col-form-label">
            Nitrogen
          </label>
          <div className="col-sm-4">
            <input
              value={nitrogenLevel}
              type="text"
              className="form-control"
              id="inputNitrogen"
              data-testid="n-input"
              onChange={(e) => {
                setNitrogenLevel(e.target.value);
              }}
            />
          </div>
          <label htmlFor="inputNitrogen" className="col-sm-1 col-form-label">
            mgl<sup>-1</sup>
          </label>
        </div>
        <div className="form-group row p-3">
          <label htmlFor="inputPhosphorus" className="col-sm-4 col-form-label">
            Phosphorus
          </label>
          <div className="col-sm-4">
            <input
              value={phosphorus}
              type="text"
              className="form-control"
              id="inputPhosphorus"
              data-testid="p-input"
              onChange={(e) => {
                setPhosphorus(e.target.value);
              }}
            />
          </div>
          <label htmlFor="inputPhosphorus" className="col-sm-1 col-form-label">
            mgl<sup>-1</sup>
          </label>
        </div>
        <div className="form-group row p-3">
          <label htmlFor="inputPotassium" className="col-sm-4 col-form-label">
            Potassium
          </label>
          <div className="col-sm-4">
            <input
              value={potassium}
              type="text"
              className="form-control"
              id="inputPotassium"
              data-testid="k-input"
              onChange={(e) => {
                setPotassiumLevel(e.target.value);
              }}
            />
          </div>
          <label htmlFor="inputPotassium" className="col-sm-1 col-form-label">
            mgl<sup>-1</sup>
          </label>
        </div>
        <button className="btn btn-green btn-block m-4">Submit</button>
        {/* {error && (<DisplayAlert type={'danger'} content={error}/>)}  */}
        {validateError && (
          <PopUpModal
            title={"Error"}
            message={validateError}
            color="danger"
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        )}
        {!validateError && !error && (
          <PopUpModal
            title={"Successful"}
            message={"New npk levels added successfully"}
            color="primary"
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        )}
      </form>
    </div>
  );
}
