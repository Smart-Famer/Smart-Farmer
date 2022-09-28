import React from "react";
import { Row, Col } from "reactstrap";
import './inputform.css';

export default function NPK() {
    return (
        <div className="input-box">
            <div className="input-row p-3">
                <label className='data-label col-sm-2'>Nitrogen</label>
                <input className='data-input col-sm-5' type='text'></input>
                <label className='data-label col-sm-2'>mgL<sup>-1</sup></label>
            </div>
            <div className="input-row p-3">
                <label className='data-label col-sm-2'>Phosphorus</label>
                <input className='data-input col-sm-5' type='text'></input>
                <label className='data-label col-sm-2'>mgL<sup>-1</sup></label>
            </div>
            <div className="inpur-row p-3">
                <label className='data-label col-sm-2'>Potassium</label>
                <input className='data-input col-sm-5' type='text'></input>
                <label className='data-label col-sm-2'>mgL<sup>-1</sup></label>
            </div>



        </div>
    )
}