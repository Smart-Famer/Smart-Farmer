import React from "react";
import ListView from "../components/admin/assistantList";
import { Container } from "reactstrap";
import { useState, useEffect } from "react";

export default function ViewAll() {
  const [input, setInput] = useState("");
  const [countryListDefault, setCountryListDefault] = useState([]);

  useEffect(() => {
    const fetchFarms = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_HOST}/api/admin/get-all-assistants`
      );
      const json = await response.json();

      if (response.ok) {
        //
        setCountryListDefault(json);
      }
    };

    fetchFarms();
  }, []);
  const searchKeys = ["first_name", "second_name"];

  const search = (data) => {
    return data.filter((iteam) =>
      searchKeys.some((searchKey) =>
        iteam[searchKey].toLowerCase().includes(input)
      )
    );
  };

  return (
    <div className="p-5">
      <Container className="p-5 bg-white">
        <div className="p-2">
          <input
            type="text"
            placeholder="Search..."
            className="search"
            onChange={(e) => setInput(e.target.value)}
          ></input>
        </div>
        <div className="m-2" style={{ overflowx: "auto" }}>
          <ListView iteamList={search(countryListDefault)} />
        </div>
      </Container>
    </div>
  );
}
