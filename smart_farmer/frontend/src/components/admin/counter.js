import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

export default function Counter(props) {

  const navigate = useNavigate()
    const handleClick = async ()=>{
      navigate("/admin/viewAll")
    }

  return (
    <Row>
      <Col>
        <div className="mx-auto w-50 p-3">
          <h3 className="bg-secondary bg-opacity-25 rounded py-3 text-center">
            {props.count}
          </h3>
        </div>
      </Col>
      <div className="d-flex flex-row-reverse">
        {
          <Button color="success" onClick={handleClick} >
            View
          </Button>
        }
      </div>
    </Row>
  );
}
