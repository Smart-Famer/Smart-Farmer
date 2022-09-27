import React from "react";
import { Container,Row,Col } from "reactstrap";
import './Meter.css'

export default function Meter(props){
    return(
        <div>

            
            <Container className='meter--container'>
                <div className='meter--heading'>
                    <h5>{props.heading}</h5>
                </div>
                <div className='meter--data'>
                     {props.children}                   
                </div>
            
            </Container>
            
        </div>
    )
}