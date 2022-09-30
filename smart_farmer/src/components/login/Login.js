import React, { useState } from "react"
import './Login.css';
import { BsPersonCircle } from 'react-icons/bs'
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import UserSession from "../Utils/UserSession"





export default function Login() {

 
    const [user,setUser] = useState({
        username:""
    })
    const navigate=useNavigate();
    function handleChange(event){
        setUser(prevUser=>({
            ...prevUser,
            [event.target.name]:event.target.value.split("@")[0]
        }))
    }

    function handleSubmit(){
        setUser(prevUser=>({
            ...prevUser,
            type:prevUser.username==="joe"?"Manager":"Assistant"
        }))
       
        navigate(`/`)
    }

    return (
        <div className='cover'>
            <div className='login-logo'><BsPersonCircle size={90} /></div>

            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div class="form-group p-3 px-5">
                    <label for="username">Username</label>
                    <input required onChange={handleChange} type="email" class="form-control" name="username" aria-describedby="emailHelp" placeholder="Username"/>
                </div>
                <div class="form-group p-3 px-5">
                    <label for="InputPassword">Password</label>
                    <input required  type="password" class="form-control" name="password" placeholder="Password"/>
                </div>
                <div class="form-check p-3 px-5">
                    <input  type="checkbox" class="form-check-input" name="rememberMe"/>
                        <label class="form-check-label" for="rememberMe">Remember me</label>
                </div>
                <button type="submit" class="btn btn-log">Login</button>

                {/* <Button className='login-btn' type='submit'>Login</Button> */}

            </form>


        </div>

    )
}