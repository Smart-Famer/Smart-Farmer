import React from "react";
import {Row,Col } from "reactstrap";
import DoughnutChart from "./DoughNutChart";

export default function Humidity(){
    return(
        <Row>
            <Col className="d-flex justify-content-center" ><DoughnutChart activeColor={'#2fb648'} inActiveColor={'#c2efca'} reading={60} readingName={'Sensor 01'}/></Col>
            <Col className="d-flex justify-content-center" ><DoughnutChart activeColor={'#2fb648'} inActiveColor={'#c2efca'}  reading={65} readingName={'Sensor 02'}/></Col>
        </Row>
    )
}