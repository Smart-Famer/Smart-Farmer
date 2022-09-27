import React from "react";
import {Row,Col } from "reactstrap";

export default function Temperature(){
    return(
        <Row>
            <Col ><h3 className="bg-secondary bg-opacity-25 rounded py-3 text-center">27&deg;C</h3></Col>
            <Col ><h3 className="bg-secondary bg-opacity-25 rounded py-3 text-center">27&deg;C</h3></Col>
        </Row>
    )
}