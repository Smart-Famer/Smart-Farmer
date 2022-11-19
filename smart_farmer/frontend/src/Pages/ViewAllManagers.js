import React from "react";
import ListView from "../components/admin/managerList";
import { Container, Button, Row, Col } from "reactstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ViewAll() {
  const [input, setInput] = useState("");
  const [countryListDefault, setCountryListDefault] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchManagers = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_HOST}/api/admin/get-all-mangers`
      );
      const json = await response.json();
      // json.push({ id: 2, first_name: "Ome", second_name: "Zue" });

      if (response.ok) {
        console.log(json);
        setCountryListDefault(json);
      }
    };

    fetchManagers();
  }, []);
  const searchKeys = ["first_name", "second_name"];

  const search = (data) => {
    console.log(data);
    return data.filter((iteam) =>
      searchKeys.some((searchKey) =>
        iteam[searchKey].toLowerCase().includes(input)
      )
    );
  };

  const handleClick = () => {
    navigate("/admin/createManager");
  }

  return (
    <div className="p-5">
      <Container className="p-5 bg-white">
        <div className="p-2">
          <Row>
            <Col>
              <input
                type="text"
                placeholder="Search..."
                className="search"
                onChange={(e) => setInput(e.target.value)}
              ></input>
            </Col>
            <Col className="class-col">
              <Button color="success" onClick={handleClick}>Add Manager</Button>
            </Col>
          </Row>
        </div>

        <div className="m-5">
          <ListView iteamList={search(countryListDefault)} />
        </div>
      </Container>
    </div>
  );
}
