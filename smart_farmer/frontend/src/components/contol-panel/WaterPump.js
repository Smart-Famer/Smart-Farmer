import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import DisplayAlert from '../DisplayAlert'

export default function WaterPump(props)
{
    const [state,setState]=useState(props.status)
    const [change,setChange]=useState(false)
    
    function toggle(){
        setState(previous=>!previous)
    }
    async function handleChange(e){
        const action = e.currentTarget.checked
        const port = e.currentTarget.id
        const response = await fetch(
          `https://6371f9a7025414c63702ac13.mockapi.io/api/atuautors/water_pump/${port}`,
          {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ state: action }),
          }
        );
        const json = await response.json();
        if(json){
            setChange(true)
        }

        
    }
    return (
      <div>
        <div>
          {change && state && (
            <DisplayAlert
              type="success"
              content={`${props.pumpname} has started!!!`}
            />
          )}
          {change && !state && (
            <DisplayAlert
              type="warning"
              content={`${props.pumpname} has stoped!!!`}
            />
          )}
          <div>
            <h5>{props.pumpname}</h5>
          </div>
          <div>
            <FormGroup switch>
              <Input
                type="switch"
                id={props.port}
                checked={state}
                onClick={() => {
                  toggle();
                }}
                onChange={handleChange}
              />
            </FormGroup>
          </div>
        </div>
      </div>
    );
}