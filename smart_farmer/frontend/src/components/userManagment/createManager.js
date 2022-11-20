import React, { useState } from "react";
import { useSignup } from "../../hooks/useManagerSignUp";
import ModalTemp from "../Modal/Modal";
import Validate from "./formValidation";

export default function CreateManager() {
  const [modalShow, setModalShow] = useState(false);
  const [validateError, setValidated] = useState("");
  const [first_name, setfirstName] = useState("");
  const [second_name, setSecondName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const { signup, error, isLoading, setError } = useSignup();
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      Validate(first_name, second_name, email, password, confirmPassword);
      setError(null);
      setSuccess(null);
      const newObj = await signup(
        first_name,
        second_name,
        email,
        password,
        location
      );

      if (newObj._doc) {
        setfirstName("");
        setSecondName("");
        setPassword("");
        setConfirmPassword("");
        setLocation("");
        setEmail("");
        setSuccess("Manager Created Successfully!");
      }
    } catch (err) {
      setValidated(err.message);
    }
    setModalShow(true);
  };

  return (
    <div className="pe-4">
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3 row">
          <label className="col-sm-4 col-form-label">First Name</label>

          <div className="col-sm-7">
            <input
              type="text"
              className="form-control"
              value={first_name}
              onChange={(e) => {
                setfirstName(e.target.value);
              }}
              required={true}
            />
          </div>
        </div>
        <div className="form-group mb-3 row">
          <label className="col-sm-4 col-form-label">Second Name</label>

          <div className="col-sm-7">
            <input
              type="text"
              className="form-control"
              value={second_name}
              onChange={(e) => {
                setSecondName(e.target.value);
              }}
              required={true}
            />
          </div>
        </div>
        <div className="form-group mb-3 row">
          <label className="col-sm-4 col-form-label">Email</label>

          <div className="col-sm-7">
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required={true}
            />
          </div>
        </div>
        <div className="form-group mb-3 row">
          <label className="col-sm-4 col-form-label">Password</label>

          <div className="col-sm-7">
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required={true}
            />
          </div>
        </div>
        <div className="form-group mb-3 row">
          <label className="col-sm-4 col-form-label">Confirm Password</label>

          <div className="col-sm-7">
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              required={true}
            />
          </div>
        </div>
        <div className="form-group mb-3 row">
          <label className="col-sm-4 col-form-label">Location</label>
          <div className="col-sm-7">
            <input
              type="text"
              className="form-control"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
              required={true}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-green btn-block m-4">
          Create
        </button>
        {/* {error && (<DisplayAlert type={'danger'} content={error} />)}
        {success && (<DisplayAlert type={'success'} content={success} />)} */}
        {validateError && (
          <ModalTemp
            title={"Error"}
            message={validateError}
            color="danger"
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        )}
        {!validateError && !error && (
          <ModalTemp
            title={"Successful"}
            message={"Manager created Successfully"}
            show={modalShow}
            color="primary"
            onHide={() => setModalShow(false)}
          />
        )}
      </form>
    </div>
  );
}
