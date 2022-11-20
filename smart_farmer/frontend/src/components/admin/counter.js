import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Row } from "reactstrap";

export default function Counter(props) {
  const navigate = useNavigate();
  const handleClick = () => {
    switch (props.card_id) {
      case "Farm": {
        navigate("/admin/viewAllFarms");
        break;
      }

      case "Manager": {
        navigate("/admin/viewAllManagers");
        break;
      }

      case "Assistant": {
        navigate("/admin/viewAllAssistants");
        break;
      }
    }
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
