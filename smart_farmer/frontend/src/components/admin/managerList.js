import React, { useEffect } from "react";
import { Table } from "reactstrap";
import { useState } from "react";


function AssistFarm(props) {
  const [farm_list, setList] = useState();
  // const [components_list, setComponents] = useState()
  // console.log(farm_list)
  const fetchFarms = async (id) => {
    // console.log(id);
    const response = await fetch(
      `${process.env.REACT_APP_HOST}/api/farm/get-user-farms/${id}`
    );
    const json = await response.json();
    // alert(JSON.stringify(json.length))
    // console.log(json)
    if (response.ok) {
      // console.log(json);
      // setFarmList(json);
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

export default function ManagerList(content) {
  // const [farm_list, setFarmList] = useState([]);
  // const [farm_iteam_list, setFarmIteamList] = useState([]);

  // const fetchFarms = async (farm) => {
  //   console.log(farm);
  //   const response = await fetch(
  //     `${process.env.REACT_APP_HOST}/api/manager/get-farm/${farm}`
  //   );
  //   const json = await response.json();
  //   console.log(json);
  //   if (response.ok) {
  //     setFarmList([...farm_list, json]);
  //   }
  // };
  // useEffect(() => {
  //   const fetchFarms = async (id_list) => {
  //     const response = await fetch(
  //       `${process.env.REACT_APP_HOST}/api/manager/get-farms`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ farm_ids: id_list }),
  //       }
  //     );
  //     const json = await response.json();
  //     alert(JSON.stringify(json.length))

  //     console.log(json)
  //     if (response.ok) {
  //       console.log(json);
  //       setFarmList([...farm_list,json]);
  //     }
  //   };

  //   content.iteamList.forEach((element) => {
  //     console.log(element.farms);
  //     fetchFarms(element.farms);
  //   });
  // }, []);

  // console.log(farm_list);


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
        {content.iteamList.map((manager) => (
          <tr key={manager.id}>
            <td>{manager.first_name}</td>
            <td>{manager.second_name}</td>
            <td>{manager.email}</td>
            <td>
            <AssistFarm _id={manager._id} />
            </td>
            <td>{manager.location}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
