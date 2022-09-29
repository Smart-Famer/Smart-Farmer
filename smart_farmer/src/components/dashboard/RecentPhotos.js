import React from "react";
import {Row,Col } from "reactstrap";
import farmImage1 from './images/farmImage1.jpg'
import farmImage2 from './images/farmImage2.jpg'
import "../../App.css"

export default function RecentPhotos(){
    return(
        <Row className="recentPhotos--container">
            <Col className="d-flex justify-content-center" >
                <div>
                    <Row>
                        <Col>Date:</Col>
                        <Col>: 02/09/2022</Col>
                    </Row>
                    <Row>
                        <Col>Time:</Col>
                        <Col>: 16.33</Col>
                    </Row>
                    <Row>
                        <Col>Camara angle</Col>
                        <Col>: 1</Col>
                    </Row>
                    <img className="w-75" src={farmImage1} alt="farmImage1"/>
                </div>
            </Col>
            <Col className="d-flex justify-content-center" >
                <div>
                    <Row>
                        <Col>Date:</Col>
                        <Col>: 02/09/2022</Col>
                    </Row>
                    <Row>
                        <Col>Time:</Col>
                        <Col>: 16.33</Col>
                    </Row>
                    <Row>
                        <Col>Camara angle</Col>
                        <Col>: 1</Col>
                    </Row>
                    <img className="w-75" src={farmImage2} alt="farmImage2"/>
                </div>
            </Col>
        </Row>
    )
}