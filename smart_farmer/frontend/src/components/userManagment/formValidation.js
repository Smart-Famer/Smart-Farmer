import validator from "validator";

export default function Validation(first_name, second_name, email, password, c_password) {
  var error = "";
  if (!first_name && !second_name && !email && !password && !c_password) {
    return error = "Fields need to filled !";
  }
  if (!email) {
    return error = "Email Required !";
  } else if (!validator.isEmail(email)) {
    return error= "This isn't an email !";
  }
  if (password == c_password) {
    return error= "Password does not match !";
  }
}


