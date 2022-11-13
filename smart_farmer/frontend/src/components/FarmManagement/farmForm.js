import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import DisplayAlert from '../DisplayAlert';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useUpdate } from '../../hooks/useUpdate';

export default function ProfileForm(props) {
    const user = useAuthContext().user.details
    const {dispatchAuthState} = useAuthContext()
    const [first_name, setfirstName] = useState(user.first_name)
    const [second_name, setSecondName] = useState(user.second_name)
    const [location, setLocation] = useState(user.location)
    const [email, setEmail] = useState(user.email)
    const [readonly, setReadonly] = useState(true)
    const {updateUser,error,success, setError, setSuccess} = useUpdate()

    const handleChange= (method,ev)=>{
        if(!readonly){
            method(ev.target.value)
        }
    }
    const handleCancel =()=>{
      setReadonly(true)
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null)
    setSuccess(null)
    const newObj = await updateUser({first_name,second_name,location,email,})
    if(!newObj.error){
      setfirstName(newObj.details.first_name)
      setSecondName(newObj.details.second_name)
      setLocation(newObj.details.location)
      setEmail(newObj.details.email)
      setSuccess("Profile Updated Successfully!")
      // console.log(user)
      setReadonly(true)
    }else{
      setError(newObj.error)
      setReadonly(false)
    }
  };

  return (
    <div class="container h-100">
        <div class="row h-100 justify-content-center align-items-center">
            <form class="col-12">
                <legend>Add Farm</legend>
                <div class="form-group">
                    <label for="formGroupExampleInput">Example label</label>
                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input"/>
                </div>
                <div class="form-group">
                    <label for="formGroupExampleInput2">Another label</label>
                    <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input"/>
                </div>
            </form>   
        </div>
    </div>
      
  );
}

