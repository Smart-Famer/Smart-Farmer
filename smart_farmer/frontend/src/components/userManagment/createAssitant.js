import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useSignup } from '../../hooks/useSignup';
import DisplayAlert from '../DisplayAlert';

export default function CreateAss(props) {
  const [validated, setValidated] = useState(false);
  const [first_name, setfirstName] = useState("")
  const [second_name, setSecondName] = useState("")
  const [password, setPassword] = useState("")
  const [location, setLocation] = useState("")
  const [email, setEmail] = useState("")
  const {signup, error, isLoading, setError} = useSignup()
  const {assistants,setAssistants} = props
  const [success, setSuccess] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null)
    setSuccess(null)
    const newObj = await signup(first_name, second_name, email, password, location)
    if(newObj._doc){
      setfirstName("")
      setSecondName("")
      setPassword("")
      setLocation("")
      setEmail("")
      setAssistants([...assistants,newObj._doc])
      setSuccess("Assistant Created Successfully!")
    }

  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group row p-3">
            <div className="col-sm-7">
                <input 
                        type="text" 
                        className="form-control" 
                        value={first_name}
                        onChange={(e)=>{setfirstName(e.target.value)}}
                        required={true}
                        />
            </div>
            <label className="col-sm-1 col-form-label">First Name</label>

        </div>
        <div className="form-group row p-3">
            <div className="col-sm-7">
                <input 
                        type="text" 
                        className="form-control"
                        value={second_name}
                        onChange={(e)=>{setSecondName(e.target.value)}}
                        required={true}
                        />
            </div>
            <label className="col-sm-1 col-form-label">Second Name</label>

        </div>
        <div className="form-group row p-3">
            <div className="col-sm-7">
                <input 
                        type="email" 
                        className="form-control" 
                        value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}
                        required={true}
                        />
            </div>
            <label className="col-sm-1 col-form-label">Email</label>

        </div>
        <div className="form-group row p-3">
            <div className="col-sm-7">
                <input 
                        type="password" 
                        className="form-control" 
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
                        required={true}
                        />
            </div>
            <label className="col-sm-1 col-form-label">Password</label>

        </div>
        <div className="form-group row p-3">
            <div className="col-sm-7">
                <input 
                        type="text" 
                        className="form-control" 
                        value={location}
                        onChange={(e)=>{setLocation(e.target.value)}}
                        required={true}
                        />
            </div>
            <label className="col-sm-1 col-form-label">Location</label>

        </div>
        <button type="submit" className="btn btn-green btn-block m-4">Create</button>
        {error && (<DisplayAlert type={'danger'} content={error} />)}
        {success && (<DisplayAlert type={'success'} content={success} />)}
      </form>
    </div>
      
  );
}

