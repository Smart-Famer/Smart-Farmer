import React, { useState } from "react"
import './Login.css';
import { BsPersonCircle } from 'react-icons/bs'
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import UserSession from "../Utils/UserSession"





export default function Login() {
    const [state,setState] = React.useState({email:"",password:""});

  

    function handleSubmit(e) {
        e.preventDefault();
        const email = state.email;
        const password = state.password;
        console.log(email, password);
        fetch("http://localhost:5000/login-user", {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data, "userRegister");
            if (data.status === "ok") {
            //   alert("login successful");
              console.log(data.data);
              window.localStorage.setItem("token", data.data);
              window.location.href = "./home";
            }
          });


      }

      const handleChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    return (
        <div className='cover'>
            <div className='login-logo'><BsPersonCircle size={90} /></div>

            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group p-3 px-5">
                    <label htmlFor="email">Username</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="email"
                        onChange={handleChange}
                        name="email"
                    />
                </div>
                <div className="form-group p-3 px-5">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" placeholder="Password" id='password'
                    onChange={handleChange}
                    name="password"

                    />
                </div>
                <div className="form-check p-3 px-5">
                    <input type="checkbox" className="form-check-input" id="rememberMe"
                        onChange={(e) => this.setState({ password: e.target.value })}
                    />
                        <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                </div>
                <button type="submit" className="btn btn-log">Login</button>

                {/* <Button className='login-btn' type='submit'>Login</Button> */}

            </form>


        </div>

    )
}