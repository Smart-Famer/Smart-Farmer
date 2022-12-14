import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";

function AssistFarm(props) {
  const [farm_list, setList] = useState();
  const fetchFarms = async (id) => {
    const response = await fetch(
      `${process.env.REACT_APP_HOST}/api/farm/get-user-farms/${id}`
    );
    const json = await response.json();
    if (response.ok) {
      let tempList = json.map((farm) => <li>{farm.name}</li>);
      if (tempList.length != 0) setList(tempList);
      else setList(<li>{"No Farms"}</li>);
    }
  };
  useEffect(() => {
    fetchFarms(props?._id);
  }, []);

  return <ul style={{ listStyleType: "none" }}>{farm_list}</ul>;
}

export default function AssistantList(content) {
  return (
    <div style={{overflowx:"auto"}}>
      <Table className="view-table" style={{overflowx:"auto"}} striped>
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
          <tr key={iteam._id}>
            <td>{iteam.first_name}</td>
            <td>{iteam.second_name}</td>
            <td>{iteam.email}</td>
            <td>
              <AssistFarm _id={iteam._id} />
            </td>
            <td>{iteam.location}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    </div>
    
  );
}
