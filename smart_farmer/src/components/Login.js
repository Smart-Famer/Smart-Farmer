import './Login.css';
import { BsPersonCircle } from 'react-icons/bs' 




export default function Login()
{
    console.log("test")
    return(
        <div className='cover'>
            {/* <div className='login-logo'><BsPersonCircle size={80} /></div> */}

            <h1>Login</h1>
            <label>Username</label>
            <input type='text' placeholder='Username'/>
            <label>Password</label>
            <input type='text' placeholder='Password'/>
            <div className='login-btn'> Login</div>
        </div>
        
    )
}