import React from "react";
import ListView from "../components/admin/listView";
import { Container } from "reactstrap";
import { useState, useEffect } from "react";
import SearchBar from "../components/searchBar/SearchBar";

export default function ViewAll() {
  const [input, setInput] = useState("");
  const [countryListDefault, setCountryListDefault] = useState([]);
  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    const fetchFarms = async () => {
      const response = await fetch(`http://localhost:4000/api/admin/`);
      const json = await response.json();

      if (response.ok) {
        // console.log(json);
        setCountryListDefault(json);
      }
    };

    fetchFarms();
  }, []);

  const updateInput = async (input) => {
    console.log(countryListDefault);
    const filtered = countryListDefault.filter((farm) => {
      //   console.log(farm);
      return farm.name.toLowerCase().includes(input.toLowerCase());
    });
    setInput(input);
    setCountryList(filtered);
  };

  return (
    <div>
      <Container>
        <div>
          <SearchBar input={input} onChange={updateInput} />
        </div>

        <ListView iteamList={countryList} />
      </Container>
    </div>
  );
}
