import React, { useState } from "react";
import Sidebar from "../Sidebar/SideBar";
import './inputform.css';
import {useFarmContext} from '../../hooks/useFarmContext'

export default function CropYieldInput(props){
    const {farm} = useFarmContext()
    const farm_id = farm._id
    const [crop_name,setCropName] = useState('')
    const [date,setDate] = useState('')
    const [amount,setAmount] = useState('')
    const [error,setError] = useState('')

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const response = await fetch(`${process.env.REACT_APP_HOST}/api/cropyield/`,
          {
            method: "POST",
            body: JSON.stringify({
              farm_id: farm_id,
              crop_name: crop_name,
              date: date,
              yield: amount,
            }),

            headers: { "Content-type": "application/json" },
          }
        );

        const json = await response.json()
        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setCropName('')
            setDate('')
            setAmount('')
            setError('')
        }
    }

    return (
            <div className="main-container">
                <Sidebar/>
              <form onSubmit={handleSubmit} >
                  <div className="form-group p-3">
                      <label htmlFor="crop_name">Crop Name</label>
                      <input 
                          value={crop_name}
                          onChange={(e)=>{setCropName(e.target.value)}}
                          type="text" className="form-control" id="crop_name" placeholder="Crop Name" required={true}/>
                  </div>
                  <div className="form-group p-3">
                      <label htmlFor="date">Date</label>
                      <input 
                          value={date}
                          onChange={(e)=>{setDate(e.target.value)}}
                          type="date" className="form-control" id="date" required={true}/>
                  </div>
                  <div className="form-group p-3">
                      <label htmlFor="yield">Crop Yield</label>
                      <input 
                          value={amount}
                          onChange={(e)=>{setAmount(e.target.value)}}
                          type="text" className="form-control" id="yield" placeholder="Crop yield in kilo" required={true}/>
                  </div>
                  
              
                  <button type="submit" className="btn btn-green">Connect</button>
                  {error&&<div className="error">{error}</div>}
              </form>
            </div>
          
      )
}