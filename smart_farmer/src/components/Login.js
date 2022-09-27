import './Login.css';
import { BsPersonCircle } from 'react-icons/bs' 



export default function Login()
{
    return(
        <div className='cover'>
            {/* <div className='login-logo'><BsPersonCircle size={80} /></div> */}
            <h1>Login</h1>
            <lable>Username</lable>
            <input type='text' placeholder='Username'/>
            <lable>Password</lable>
            <input type='text' placeholder='Password'/>
            <div className='login-btn'> Login</div>
        </div>
        
    )
}