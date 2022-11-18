import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import DisplayAlert from "../DisplayAlert";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router";

export default function FarmForm(props) {
  const user = useAuthContext().user.details;
  const [farm_name, setFarmName] = useState("");
  const [farm_area, setArea] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const { dispatchAuthState } = useAuthContext();
  // console.log(address)
  const updateFarm = async (farm_id, data) => {
    const response = await fetch(
      `${process.env.REACT_APP_HOST}/api/farm/update-farm/${farm_id}`,
      {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          ...data,
        }),
      }
    );

    const json = await response.json();
    if (response.ok) {
      setSuccess("Farm updated successsfully");
      alert("Farm updated successsfully");
      navigate("/user/home");
    } else {
      // alert(json.error)
      setError(json.error);
    }
  };

  const addFarm = async (data) => {
    const response1 = await fetch(
      `${process.env.REACT_APP_HOST}/api/farm/add-farm`,
      {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          ...data,
        }),
      }
    );
    const json1 = await response1.json();

    if (response1.ok) {
      const response2 = await fetch(
        `${process.env.REACT_APP_HOST}/api/user/attach-farm`,
        {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            farm_id: json1._id,
            user_id: user._id,
          }),
        }
      );
      const json2 = await response2.json();
      if (response2.ok) {
        console.log("updated user", json2);
        setSuccess("New farm created successfully");
        dispatchAuthState({ type: "UPDATE", payload: { details: json2 } });
        alert("New farm created successfully");
        // alert(JSON.stringify(json2))
        navigate("/user/home");
      } else {
        await fetch(
          `${process.env.REACT_APP_HOST}/api/farm/delete-farm/${json1._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setError(json2.error);
      }
    } else {
      setError(json1.error);
    }
  };

  const setFarmDetails = async (farm_id) => {
    const response = await fetch(
      `${process.env.REACT_APP_HOST}/api/farm/get-farm/${farm_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();
    if (response.ok) {
      // console.log(json)
      setFarmName(json.name);
      setArea(json.area);
      setLatitude(json.location.latitude);
      setLongitude(json.location.longitude);
      setAddress(json.address);
    } else {
      setError(json.error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (props.action === "edit") {
      updateFarm(props.farm_id, {
        name: farm_name,
        area: farm_area,
        location: {
          latitude: latitude,
          longitude: longitude,
        },
        address: address,
      });
    } else {
      addFarm({
        name: farm_name,
        area: farm_area,
        location: {
          latitude: latitude,
          longitude: longitude,
        },
        address: address,
      });
    }
  };

  useEffect(() => {
    if (props.action === "edit") {
      setFarmDetails(props.farm_id);
    }
  }, []);
  return (
    <div className="me-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
            Farm Name
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Farm Name"
            value={farm_name}
            onChange={(e) => {
              setFarmName(e.target.value);
            }}
            required={true}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            Farm Area (m <sup>2</sup>)
          </label>
          <input
            type="number"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="Farm Area"
            value={farm_area}
            onChange={(e) => {
              setArea(e.target.value);
            }}
            required={true}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            Latitude
          </label>
          <input
            type="number"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="Latitude"
            value={latitude}
            onChange={(e) => {
              setLatitude(e.target.value);
            }}
            required={true}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            Longitude
          </label>
          <input
            type="number"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="Longitude"
            value={longitude}
            onChange={(e) => {
              setLongitude(e.target.value);
            }}
            required={true}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="Address"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            required={true}
          />
        </div>

        {props.action === "edit" && (
          <button type="submit" className="btn btn-success">
            Edit Farm
          </button>
        )}
        {props.action === "add" && (
          <button type="submit" className="btn btn-success">
            Add Farm
          </button>
        )}

        <br></br>
        {error && <DisplayAlert type={"danger"} content={error} />}
        {success && <DisplayAlert type={"success"} content={success} />}
      </form>
    </div>
  );
}
