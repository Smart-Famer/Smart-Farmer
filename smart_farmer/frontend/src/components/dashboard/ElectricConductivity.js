import React from "react";
import {Row,Col} from "reactstrap";
import { Link } from "react-router-dom";

export default function ElectricConductivity(){
    return(
        <>
        <Row className="px-5">
            <Col ><h1 className="bg-secondary bg-opacity-25 rounded py-3 text-center">5sm<sup>-1</sup></h1></Col>
        </Row>
        <div className="d-flex flex-row-reverse">
                    <Link to="/elecinput" style={{ textDecoration: 'none' }}>{"Add inputs>"}</Link>
        </div>
        </>
    )
}