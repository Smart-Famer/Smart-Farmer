import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { useFarmContext } from "../../hooks/useFarmContext";

export default function Counter(props) {
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
        <Link to="/user/farm/elecinput" style={{ textDecoration: "none" }}>
          {<Button color="success">View</Button>}
        </Link>
      </div>
    </Row>
  );
}
