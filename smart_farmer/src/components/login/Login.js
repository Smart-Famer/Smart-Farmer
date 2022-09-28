import './Login.css';
import { BsPersonCircle } from 'react-icons/bs'
import { Button } from 'reactstrap';




export default function Login() {
    return (
        <div className='cover'>
            <div className='login-logo'><BsPersonCircle size={90} /></div>

            <h1>Login</h1>

            <label>Username</label>
            <input type='text' placeholder='Username' />
            <label>Password</label>
            <input type='password' placeholder='Password' />
            {/* <div className='login-btn'>
                
                Login
            </div> */}
            <Button className='login-btn' type='submit'>Login</Button>
        </div>

    )
}