import React from "react";
import {Row,Col } from "reactstrap";
import DoughnutChart from "./DoughNutChart";

export default function SoilHumidity(){
    return(
        <Row>
            <Col className="d-flex justify-content-center" ><DoughnutChart activeColor='#ff4d4d' inActiveColor='#ffe6e6' reading={60} readingName={'Sensor 01'}/></Col>
            <Col className="d-flex justify-content-center" ><DoughnutChart activeColor='#ff4d4d' inActiveColor='#ffe6e6' reading={65} readingName={'Sensor 02'}/></Col>
        </Row>
    )
}