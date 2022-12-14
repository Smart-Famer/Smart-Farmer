import "bootstrap/dist/css/bootstrap.css";
import { React, useState } from "react";
import "../App.css";
import { useAuthContext } from "../hooks/useAuthContext";
import InputForm from "./inputForms/InputForm";
import ProfileForm from "./userManagment/profileForm";

export default function Profile(props) {
  const user = useAuthContext().user.details;

  const [curPass, setCurPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handlePassword = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const response = await fetch(
      `${process.env.REACT_APP_HOST}/api/user/update-password/${user._id}`,
      {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          curPass,
          newPass,
        }),
      }
    );
    const json = await response.json();
    if (response.ok) {
      setSuccess("Password changed Successfully!");
      setCurPass("");
      setNewPass("");
    } else if (!response.ok) {
      setError(json.error);
    }
  };
  return (
    <div className="row justify-content-center">
      <InputForm formName="Profile View">
        <div className="row me-3">
          <div className="col-12 col-md-6 mb-4">
            <ProfileForm />
          </div>
          <div className="col-md-2"></div>
          <div className="col-12 col-md-3">
            <div className="row justify-content-center">
              <form className="form">
                <legend className="form-legend">Change Password</legend>
                <input
                  type="password"
                  className="form-control mb-3"
                  placeholder="Enter Current Password"
                  value={curPass}
                  onChange={(e) => {
                    setCurPass(e.target.value);
                  }}
                />
                <input
                  type="password"
                  className="form-control mb-3"
                  placeholder="Enter New Password"
                  value={newPass}
                  onChange={(e) => {
                    setNewPass(e.target.value);
                  }}
                />
                <button
                  className="btn btn-danger"
                  type="button"
                  id="button-addon2"
                  onClick={handlePassword}
                >
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </InputForm>
    </div>
  );
}
