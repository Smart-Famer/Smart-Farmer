import React, { useState } from 'react';
import { FormGroup, Input } from 'reactstrap';

export default function Camera(props)
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