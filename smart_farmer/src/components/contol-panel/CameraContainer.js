import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import './ControlPanel.css';
import WaterPump from "./WaterPump"
import { Form, FormGroup, Label, Input } from 'reactstrap';

export default function CameraContainer(props)
{
    const options = props.cameras.map(camera=><option>{camera}</option>)
    const [selectedCam, setCam] = useState(props.cameras[0])
    const [preview, setPreview] = useState(null)
    function handleChange(event){
    }
    function handleSubmit(event){
        // alert(`Photo Taken from ${selectedCam}`)
        setCam(event.target.value)
        setPreview("https://picsum.photos/300/200")
        event.preventDefault();
    }

    function deletePreview(){
        setPreview(null)
    }

    function confirmPreview(){
        alert("Image Saved")
        setPreview(null)
    }
    return(
        <div>
            <div className='control-camera-container'>
                <div className='camera-container-title'>
                    <h5>Camera</h5>
                </div>
                <div className='camera-container'>
                    <Form onSubmit={handleSubmit}>
                        <Row className='g-2'>
                            <Col>
                                <Input 
                                id="exampleNumber" 
                                name="camera" 
                                placeholder= "Select Camera"
                                type="select"
                                value={selectedCam}
                                onChange={handleChange}>
                                    {options}
                                </Input>
                            </Col>
                            <Col>
                                <Button type="submit" className="btn btn-green mb-4 threshhold-btn" >Take</Button>
                            </Col>
                        </Row>
                        
                    </Form>
                </div>

                    {preview!==null&&<div className='camera-preview-container'>
                        <div className="preview-image-container"><img className="preview-image" src={preview}/></div>                                
                        <div>
                            <Button className="btn btn-danger btn-sm " onClick={deletePreview}>Delete</Button>
                            <Button className="btn btn-success btn-sm m-4" onClick={confirmPreview}>Confirm</Button>                       
                        </div>
                    </div>}

                </div>
            </div>
        
    )
}