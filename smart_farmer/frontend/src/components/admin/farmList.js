import React from "react";
import { Table } from "reactstrap";

export default function FarmList(content) {
  return (
    <Table striped>
      <thead>
        <tr>
          <th>Farm Name</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {content.iteamList.map((iteam) => (
          <tr key={iteam.id}>
            <td>{iteam.name}</td>
            <td>{iteam.address}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
