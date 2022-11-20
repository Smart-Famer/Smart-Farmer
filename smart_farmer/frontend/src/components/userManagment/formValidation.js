import validator from "validator";

export default function Validation(
  first_name,
  second_name,
  email,
  password,
  c_password
) {
  var error = "";
  if (!first_name && !second_name && !email && !password && !c_password) {
    throw Error("Fields need to filled !");
  }
  if (!email) {
    return (error = "Email Required !");
  } else if (!validator.isEmail(email)) {
    throw Error("This isn't an email !");
  }
  if (!password) {
    throw Error("Password Required !");
  } else if (!password.length > 7) {
    throw Error("Weak password!");
  }
  if (password !== c_password) {
    throw Error("Password does not match !");
  }
}
