import React from "react";
import { Table } from "reactstrap";
import { useState } from "react";

export default function ManagerList(content) {
  const [farm_list, setFarmList] = useState([]);

  const fetchFarms = async (farm) => {
    console.log(farm);
    const response = await fetch(
      `${process.env.REACT_APP_HOST}/api/manager/get-farm/:${farm}`
    );
    const json = await response.json();
    console.log(json)
    if (response.ok) {
      setFarmList(json);
    }
  };

  console.log(content.iteamList);
  return (
    <Table striped>
      <thead>
        <tr>
          <th>Firts Name</th>
          <th>Second Name</th>
          <th>Email</th>
          <th>Farms</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {content.iteamList.map((iteam) => (
          <tr key={iteam.id}>
            <td>{iteam.first_name}</td>
            <td>{iteam.second_name}</td>
            <td>{iteam.email}</td>
            <td>
              {/* <ul>
                {iteam.farms.map((farm) => (
                  <li>{fetchFarms(farm)}</li>
                ))}
              </ul> */}
            </td>
            <td>{iteam.location}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
