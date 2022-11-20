import React, { useState } from "react";
import { useFarmContext } from "../../hooks/useFarmContext";

export default function WaterPump(props) {
  const { farm } = useFarmContext();
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleClick = async (mode) => {
    const msg = `${props?.name.split("_")[1]} ${mode} on port ${
      props?.port.split("-")[1]
    }`;
    const response = await fetch(
      `${process.env.REACT_APP_DATA_SERVER}/api/get-requests`,
      {
        method: "POST",
        body: JSON.stringify({
          secret_key:farm.secret_key,
          data:{msg},
        }),

        headers: { "Content-type": "application/json" },
      }
    );

    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      console.log(json);
      setSuccess(`Pump succesfully ${mode}!`);
    }
    setTimeout(() => {
      setSuccess(null);
      setError(null);
    }, 3000);
  };

  return (
    <div>
      <div
        id={props.key}
        className="card bg-light border-success mb-4 text-center"
      >
        <div className="card-body ">
          <h5 className="card-title">{props?.name.split("_")[1]}</h5>
          <h6 className="card-subtitle mt-2 mb-2 text-muted ">
            Port - {props.port.split("-")[1]}
          </h6>
          <hr></hr>
          <div className="text-center">
            <button
              href="#"
              className="btn btn-success me-2"
              onClick={() => {
                handleClick("started");
              }}
            >
              Start
            </button>
            <button
              href="#"
              className="btn btn-danger"
              onClick={() => {
                handleClick("stoped");
              }}
            >
              Stop
            </button>
          </div>
          {error && <div className="text-red mt-2">{error}</div>}
          {success && <div className="text-success mt-2">{success}</div>}
        </div>
      </div>
    </div>
  );
}
