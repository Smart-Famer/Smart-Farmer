import React from "react";
import ListView from "../components/admin/farmList";
import { Container } from "reactstrap";
import { useState, useEffect } from "react";

export default function ViewAll() {
  const [input, setInput] = useState("");
  const [countryListDefault, setCountryListDefault] = useState([]);

  useEffect(() => {
    const fetchFarms = async () => {
      const response = await fetch(`${process.env.REACT_APP_HOST}/api/admin/`);
      const json = await response.json();

      if (response.ok) {
        console.log(json);
        setCountryListDefault(json);
      }
    };

    fetchFarms();
  }, []);
  const searchKeys = ["name", "address"];
  const search = (data) => {
    return data.filter((iteam) =>
      searchKeys.some((search) => iteam[search].toLowerCase().includes(input))
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
        <div className="m-5">
          <ListView iteamList={search(countryListDefault)} />
        </div>
      </Container>
    </div>
  );
}
