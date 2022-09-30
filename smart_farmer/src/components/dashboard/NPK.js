import React from "react";
import {Row,Col} from "reactstrap";
import { Link } from "react-router-dom";

export default function NPK(){
    return(
        <>
            <Row className="align-items-center px-5">
                <Col ><h6 className="align-middle">Nitrogen <b>N</b></h6></Col>
                <Col ><h6 className="bg-secondary bg-opacity-25 rounded py-3 text-center">68.32mgL<sup>-1</sup></h6></Col>
            </Row>
            
            <Row className="align-items-center px-5">
                <Col ><h6 className="align-middle">Phosphorus <b>P</b></h6></Col>
                <Col ><h6 className="bg-secondary bg-opacity-25 rounded py-3 text-center">10.28mgL<sup>-1</sup></h6></Col>
            </Row>
            
            <Row className="align-items-center px-5">
                <Col ><h6 className="align-middle">Potassium <b>K</b></h6></Col>
                <Col ><h6 className="bg-secondary bg-opacity-25 rounded py-3 text-center">105mgL<sup>-1</sup></h6></Col>
            </Row>
            <div className="d-flex flex-row-reverse">
                    <Link to="/npkinput" style={{ textDecoration: 'none' }}>{"Add Inputs>"}</Link>
            </div>
            
        </>
    )
}