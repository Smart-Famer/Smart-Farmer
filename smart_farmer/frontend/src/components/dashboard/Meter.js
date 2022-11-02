import React from "react";
import './Meter.css'

export default function Meter(props){
    return(
        <div>
            <div className='meter--container mt-3'>
                <div className='meter--heading'>
                    <h5>{props.heading}</h5>
                </div>
                <div className='meter--data'>
                     {props.children}                   
                </div>
            
            </div>         
        </div>
    )
}