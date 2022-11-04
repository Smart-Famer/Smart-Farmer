import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import { Button } from 'reactstrap';
import './inputform.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function NPKInput() {
 
    const [nitrogenLevel, setNitrogenLevel] = useState('')
    const [potassium, setPotassiumLevel] = useState('')
    const [phosphorus, setPhosphorus] = useState('')
    const inputNPK = ""
    useEffect(()=>{inputNPK=`${nitrogenLevel},${phosphorus},${potassium}`},[nitrogenLevel,phosphorus,potassium])
    const [error, setError] = useState(null)
        
    
      const handleSubmit = async (e) => {
        e.preventDefault()
    
        const reading = ''
        const sourceId = "NPK_123"
        let timestamp = new Date().toJSON();
    
        const dataReading = {reading,sourceId,timestamp}
        
        const response = await fetch('/api/datareading',{
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
        //   setInputNpk('')
          console.log('New electric conductivity level added:',json)
        }
    
      }



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div class="form-group row p-3">
                    <label for="inputNitrogen" class="col-sm-4 col-form-label">Nitrogen</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" id="inputNitrogen" />
                    </div>
                    <label for="inputNitrogen" class="col-sm-1 col-form-label">mgl<sup>-1</sup></label>

                </div>
                <div class="form-group row p-3">
                    <label for="inputPhosphorus" class="col-sm-4 col-form-label">Phosphorus</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" id="inputPhosphorus" />
                    </div>
                    <label for="inputPhosphorus" class="col-sm-1 col-form-label">mgl<sup>-1</sup></label>

                </div>
                <div class="form-group row p-3">
                    <label for="inputPotassium" class="col-sm-4 col-form-label">Potassium</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" id="inputPotassium" />
                    </div>
                    <label for="inputPotassium" class="col-sm-1 col-form-label">mgl<sup>-1</sup></label>

                </div>
                <button type="button" className="btn btn-green btn-block m-4">Submit</button>

            </form>
        </div>

    )
}