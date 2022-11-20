import React, { useEffect } from "react";
import { Button, Table } from "reactstrap";
import { useState } from "react";
import { RiDeleteBin5Fill } from 'react-icons/ri';
import ConfirmDelete from "./confirmModal";


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

export default function ManagerList(content) {
  const [modalShow, setModalShow] = useState(false);
  const [delete_id, setDeleteID] = useState(false);
  const [delete_name, setDeleteName] = useState(false);

  const handleDelete = (id,name)=>{

    setModalShow(true)
    setDeleteID(id)
    setDeleteName(name)
  }

  return (
    <div>
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
          <tr key={manager._id}>
            <td>{manager.first_name}</td>
            <td>{manager.second_name}</td>
            <td>{manager.email}</td>
            <td>
            <AssistFarm _id={manager._id} />
            </td>
            <td>{manager.location}</td>
            <td><Button color="danger" onClick={()=> handleDelete(manager._id,manager.first_name)} ><RiDeleteBin5Fill /></Button></td>
            <ConfirmDelete
              title={"Are you sure?"}
              message={"Are you sure you want to delete "+ delete_name +"?"}
              id={delete_id}
              show={modalShow}
              onHide={() => setModalShow(false)}
              updateManagerList = {content.updateManagerList}
            />
          </tr>
          
        ))}
      </tbody>
    </Table>
    
    </div>
    
    
  );
}
