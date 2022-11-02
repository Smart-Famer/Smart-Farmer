import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';

export default function WaterPump(props)
{
    const [state,setState]=useState(props.status==="on"?true:false)
    function toggle(){
        setState(previous=>!previous)
    }
    return(
        <div>
            <div>
                <div>
                    <h5>{props.pumpname}</h5>
                </div>
                <div>
                    <FormGroup switch>
                        <Input
                            type="switch"
                            checked={state}
                            onClick={() => {
                            toggle();
                            }}
                        />
                    </FormGroup>
                </div>
            
            </div>
        </div>
    )
}