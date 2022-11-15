import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

export default function Counter(props) {
  const navigate = useNavigate();
  const handleClick = () => {
    switch (props.card_id) {
      case "Farm": {
        console.log(props.card_id);
        navigate("/admin/viewAllFarms");
        break;
      }

      case "Manager": {
        console.log(props.card_id);
        navigate("/admin/viewAllManagers");
        break;
      }

      case "Assistant": {
        console.log(props.card_id);
        navigate("/admin/viewAllAssistants");
        break;
      }
    }
    // navigate("/admin/viewAllFarms");
  };

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
          <Button color="success" onClick={handleClick}>
            View
          </Button>
        }
      </div>
    </Row>
  );
}
