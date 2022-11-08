import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import './ControlPanel.css';
import WaterPump from "./WaterPump"
import { Form, FormGroup, Label, Input } from 'reactstrap';


export default function WaterPumpContainer(props)
{
    const cols= props.pumps.map(pump=> <Col><WaterPump pumpname={pump.name} status={pump.status} /></Col>)
    const [threshHold, setThreshHold] = useState(props.threshhold)

    function handleChange(event){
        setThreshHold(event.target.value)
    }
    function handleSubmit(event){
        event.preventDefault();
        //console.log(threshHold)
    }
    return(
        <div>
            <div className='control-water-pump-container mt-3'>
                <div className='pump-container-title'>
                    <h5>Water Pump</h5>
                </div>
                <div className='pump-container'>
                    <Container>
                        <Row>
                            {cols}
                        </Row>
                    </Container>
                </div>
                <div className='threshhold-btn-container'>
                    <Form onSubmit={handleSubmit}>
                        <Row className='g-2'>
                            <Col>
                                <Input 
                                id="exampleNumber" 
                                name="number" 
                                placeholder= "Enter ThreshHold"
                                type="text"
                                value={threshHold}
                                onChange={handleChange}/>
                            </Col>
                            <Col>
                                <Button type="submit" className="btn btn-green mb-4 threshhold-btn" >Set Threshhold</Button>
                            </Col>
                        </Row>
                        
                    </Form>
                </div>
            </div>
        </div>
    )
}