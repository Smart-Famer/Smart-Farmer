import React from 'react';
import './inputform.css';

export default function InputForm(props)
{
    return(
        <div>
            <div className='input--container mt-3'>
                <div className='input--heading'>
                    <h5>{props.formName}</h5>
                </div>
                <div className='input--data'>
                     {props.children}      
                </div>
            
            </div>
        </div>
    )
}