import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useFarmContext } from '../../hooks/useFarmContext';
import { useSignup } from '../../hooks/useSignup';
import DisplayAlert from '../DisplayAlert';

export default function AddAss(props) {
  const [_id, setID] = useState("")
  const {assistants,setAssistants} = props
  const [error, setError] = useState(null)
  const {farm} = useFarmContext()
  const [success, setSuccess] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null)
    setSuccess(null)
    if(assistants.find(x=>x._id===_id)){
        setError("Assistant with the given ID is already added. Try a new one!")
        return
    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/api/user/attach-farm`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ farm_id: farm._id, user_id: _id }),
      }
    );
    const json = await response.json()
    if(response.ok){
        setAssistants([...assistants,json])
        setID("")
        setSuccess("Assistant Added Successfully!")
    }else{
        setError(json.error)
    }



    // const newObj = await signup(first_name, second_name, email, password, location)
    // if(!error && newObj){
    //   setfirstName("")
    //   setSecondName("")
    //   setPassword("")
    //   setLocation("")
    //   setEmail("")
    //   setAssistants([...assistants,newObj])
    // }

  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group row p-3">
            <div className="col-sm-7">
                <input 
                        type="text" 
                        className="form-control" 
                        value={_id}
                        onChange={(e)=>{setID(e.target.value)}}
                        required={true}
                        />
            </div>
            <label className="col-sm-1 col-form-label">Enter Assistant ID</label>

        </div>
        <button type="submit" className="btn btn-green btn-block m-4">Add</button>
        {error && (<DisplayAlert type={'danger'} content={error} />)}
        {success && (<DisplayAlert type={'success'} content={success} />)}
      </form>
    </div>
      
  );
}

