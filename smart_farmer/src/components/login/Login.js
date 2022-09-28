import './Login.css';
import { BsPersonCircle } from 'react-icons/bs'
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';




export default function Login() {
    return (
        <div className='cover'>
            <div className='login-logo'><BsPersonCircle size={90} /></div>

            <h1>Login</h1>
            <form>
                <div class="form-group p-3 px-5">
                    <label for="username">Username</label>
                    <input type="email" class="form-control" id="username" aria-describedby="emailHelp" placeholder="Username"/>
                </div>
                <div class="form-group p-3 px-5">
                    <label for="InputPassword">Password</label>
                    <input type="password" class="form-control" placeholder="Password"/>
                </div>
                <div class="form-check p-3 px-5">
                    <input type="checkbox" class="form-check-input" id="rememberMe"/>
                        <label class="form-check-label" for="rememberMe">Remember me</label>
                </div>
                <button type="submit" class="btn btn-log">Login</button>

                {/* <Button className='login-btn' type='submit'>Login</Button> */}

            </form>


        </div>

    )
}