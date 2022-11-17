import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { useLogin } from "../../hooks/useLogin";
import ModalTemp from "../Modal/Modal";
import "./Login.css";
import Validation from "./loginValidation";

export default function Login() {
  const [modalShow, setModalShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validateError, setError] =useState("")
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(Validation(email,password));
    await login(email, password);
    setModalShow(true)
    setEmail("");
    setPassword("");
  };

  return (
    <div className="cover">
      <div className="login-logo">
        <BsPersonCircle size={90} />
      </div>

      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group p-3 px-5">
          <label htmlFor="email">Username</label>
          <input
            type="text"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="form-group p-3 px-5">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        {/* <div className="form-check p-3 px-5">
                    <input type="checkbox" className="form-check-input" id="rememberMe"
                        onChange={(e) => this.setState({ password: e.target.value })}
                    />
                        <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                </div> */}
        <button disabled={isLoading} type="submit" className="btn btn-log">
          Login
        </button>
        {/* {error && <DisplayAlert type={"danger"} content={error} />} */}
        {validateError && <ModalTemp
        title={"Error"}
        message={validateError}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />}
      {error && !validateError && <ModalTemp
        title={"Error"}
        message={error}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />}
        {/* <Button className='login-btn' type='submit'>Login</Button> */}
      </form>
      
    </div>
  );
}
