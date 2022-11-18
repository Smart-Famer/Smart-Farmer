import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import DisplayAlert from "../DisplayAlert";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useUpdate } from "../../hooks/useUpdate";

export default function ProfileForm(props) {
  const user = useAuthContext().user.details;
  const { dispatchAuthState } = useAuthContext();
  const [first_name, setfirstName] = useState(user.first_name);
  const [second_name, setSecondName] = useState(user.second_name);
  const [location, setLocation] = useState(user.location);
  const [email, setEmail] = useState(user.email);
  const [readonly, setReadonly] = useState(true);
  const { updateUser, error, success, setError, setSuccess } = useUpdate();

  const handleChange = (method, ev) => {
    if (!readonly) {
      method(ev.target.value);
    }
  };
  const handleCancel = () => {
    setReadonly(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const newObj = await updateUser({
      first_name,
      second_name,
      location,
      email,
    });
    if (!newObj.error) {
      setfirstName(newObj.details.first_name);
      setSecondName(newObj.details.second_name);
      setLocation(newObj.details.location);
      setEmail(newObj.details.email);
      setSuccess("Profile Updated Successfully!");
      // console.log(user)
      setReadonly(true);
    } else {
      setError(newObj.error);
      setReadonly(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="First Name"
            value={first_name}
            onChange={(e) => {
              handleChange(setfirstName, e);
            }}
            required={true}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            Second Name
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="Second Name"
            value={second_name}
            onChange={(e) => {
              handleChange(setSecondName, e);
            }}
            required={true}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            User ID
          </label>
          <input
            type="text"
            className="form-control"
            value={user._id}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              handleChange(setEmail, e);
            }}
            required={true}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            Location
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="Location"
            value={location}
            onChange={(e) => {
              handleChange(setLocation, e);
            }}
            required={true}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            Position
          </label>
          <input
            type="text"
            className="form-control"
            value={user.user_type}
            readOnly
            required={true}
          />
        </div>

        <div className="row allign-items-center">
          {readonly && (
            <div className="col-auto">
              <button
                onClick={() => {
                  setReadonly(false);
                }}
                type="submit"
                className="btn btn-primary"
              >
                Edit Profile
              </button>
            </div>
          )}
          {!readonly && (
            <div className="col-auto">
              <button type="submit" className="btn btn-success">
                Update Profile
              </button>
              <button
                className="btn btn-secondary ms-2"
                onClick={() => {
                  handleCancel();
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        <br></br>
        {error && <DisplayAlert type={"danger"} content={error} />}
        {success && <DisplayAlert type={"success"} content={success} />}
      </form>
    </div>
  );
}
