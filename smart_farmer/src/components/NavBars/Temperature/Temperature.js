import React from "react";
import { Container,Row,Col } from "reactstrap";
import './Temperature.css'

export default function Temperature(){
    return(
        <div>

            
            <Container className='temperature--container'>
                <div className='temperature--heading'>
                    <h5>Temperature</h5>
                </div>
                <div className='temperature--data'>
                    <Row>
                        <Col ><h3 className="temperature--reading bg-secondary bg-opacity-25 rounded py-3">27<sup>o</sup>C</h3></Col>
                        <Col ><h3 className="temperature--reading bg-secondary bg-opacity-25 rounded py-3">27<sup>o</sup>C</h3></Col>
                    </Row>
                    
                </div>
            
            </Container>
            
        </div>
    )
}