import {React,useState} from 'react'
import {Container,Row,Col} from 'reactstrap'
import "../App.css"
import { useAuthContext } from '../hooks/useAuthContext'
import Sidebar from './Sidebar/SideBar'
import 'bootstrap/dist/css/bootstrap.css';
import ProfileForm from './userManagment/profileForm'
import { MdSettingsSystemDaydream } from 'react-icons/md'
import DisplayAlert from './DisplayAlert';

export default function Profile(props) {
    const user = useAuthContext().user.details
    console.log(user)
    const {dispatchAuthState} = useAuthContext()
    const [curPass, setCurPass] = useState("")
    const [newPass, setNewPass] = useState("")
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)

    const handlePassword = async(e)=>{
        e.preventDefault()
        setError(null)
        setSuccess(null)
        const response = await fetch(
          `${process.env.REACT_APP_HOST}/api/user/update-password/${user._id}`,
          {
            method: "POST",
            crossDomain: true,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
              curPass,
              newPass,
            }),
          }
        );
        const json = await response.json()
        if(response.ok){
            setSuccess("Password changed Successfully!")
            setCurPass("")
            setNewPass("")
        }else if(!response.ok){
            setError(json.error)
        }
    }
    return(
        <div className='main-container'>
            <Sidebar/>
            <div className='profile--container mt-3'>
                <div className='profile--heading'>
                    <h5>Profile View</h5>
                </div>
                <div className='profile--data'>
                    <div class="container">
                        <div class="row">
                            <div class="col-7">
                                <div class="row ps-5 pe-5">
                                    <ProfileForm/>
                                </div>
                                <div class="col-12 ps-5 pe-5">
                                    <div class="input-group mb-2">                                    
                                        <input type="password" aria-label="First name" class="form-control" placeholder='Enter Current Password' value={curPass} onChange={(e)=>{setCurPass(e.target.value)}}/>
                                        <input type="password" aria-label="Last name" class="form-control" placeholder='Enter New Password' value={newPass} onChange={(e)=>{setNewPass(e.target.value)}}/>
                                        <button class="btn btn-danger" type="button" id="button-addon2" onClick={handlePassword}>Change Password</button>
                                    </div>
                                    {error && (<DisplayAlert type={'danger'} content={error} />)}
                                    {success && (<DisplayAlert type={'success'} content={success} />)}

                                </div>
                            </div>
                            <div class="col">
                                <div class="row ps-5 pe-5 mb-3">
                                    <img class="img-fluid img-thumbnail" src={`/images/${user.profile_picture}`} alt="Profile Picture"/>
                                </div>
                                <div class="row ps-5 pe-5 mb-3">
                                    <div class="input-group">
                                        <input type="file" class="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload"/>
                                        <button class="btn btn-sm btn-danger" type="button" id="inputGroupFileAddon04">Change</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr></hr>
                    </div>
                </div>       
            </div> 
        </div>        
           
        
    )
}