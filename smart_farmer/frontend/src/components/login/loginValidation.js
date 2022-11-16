import React from "react";
import validator from "validator";

export default function Validation(email, password) {
  var error = "";
  if (!email && !password) {
    return error = "Fields need to filled !";
  }
  if (!email) {
    return error = "Email Required !";
  } else if (!validator.isEmail(email)) {
    return error= "This isn't an email !";
  }
  if (!password) {
    return error= "Password Required !";
  }
}


