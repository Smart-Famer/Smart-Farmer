import React from "react";
import { Table } from "reactstrap";

export default function AssistantList(content) {
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
