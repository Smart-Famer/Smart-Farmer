import React, { useState } from "react";
import './inputform.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DisplayAlert from "../DisplayAlert";
import { useFarmContext } from "../../hooks/useFarmContext";

export default function ElectricConductivityInput() {
    const [inputElecCon, setInputElecCon] = useState('')
    const [error, setError] = useState(null) 
    const {farm} = useFarmContext()
    // console.log(farm)
    

  const handleSubmit = async (e) => {
    e.preventDefault()

    const reading = inputElecCon
    const sourceId = farm.elec_conductivity_key
    let timestamp = new Date().toJSON();

    const dataReading = {reading,sourceId,timestamp}
    
    const response = await fetch('http://localhost:4000/api/datareading',{
        method: 'POST', 
        body:JSON.stringify(dataReading),
        headers: {
            'Content-type':'application/json'
        }
    })
    const json = await response.json()

    if(!response.ok){
      setError(json.error)
    }
    if(response.ok){
      setError(null)
      setInputElecCon('')
      console.log('New electric conductivity level added:',json)
    }

  }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group row p-3">
                    <div className="col-sm-7">
                        <input 
                                type="text" 
                                data-testid="elec-con-input"
                                className="form-control"
                                id="inputElecCon" 
                                placeholder="Electric Conductivity"
                                value={inputElecCon}
                                onChange={(e)=>{setInputElecCon(e.target.value)}}
                                />
                    </div>
                    <label htmlFor="inputElecCon" className="col-sm-1 col-form-label">sm<sup>-1</sup></label>

                </div>
             <button className="btn btn-green btn-block m-4">Submit</button>
            {error && (<DisplayAlert type={'danger'} content={error} />)}
            </form>
        </div>

    )
}