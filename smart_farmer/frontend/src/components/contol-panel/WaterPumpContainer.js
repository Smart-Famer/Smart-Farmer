import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import "./ControlPanel.css";
import WaterPump from "./WaterPump";
import { Form, FormGroup, Label, Input } from "reactstrap";
import DisplayAlert from "../DisplayAlert";
import { useFarmContext } from "../../hooks/useFarmContext";

// const pumps = props.pumps;
// const [actuatorData, setActuatorData] = useState([]);
//   const [threshHold, setThreshHold] = useState(0);
//   const [change, setChange] = useState(false);


// useEffect(() => {
//   const fetchData = async () => {
//     let temp_actuatorData = [];
//     for (let i = 0; i < pumps.length; i++) {
//       const pump = pumps[i];
//       const response = await fetch(
//         `${process.env.REACT_APP_MOCK_SERVER}/${pump.port}`
//       );
//       const json = await response.json();
//       temp_actuatorData.push(json);
//     }
//     setActuatorData(temp_actuatorData);
//     setThreshHold(temp_actuatorData[0].threashold)
//   };
//   fetchData();
// }, []);


// let portNameObj = {};
// props.pumps.forEach((pump) => {
//   portNameObj[pump.port] = pump.name;
// });

// const cols = actuatorData.map((pump) => (
//   <Col key={pump.port}>
//     <WaterPump
//       key={pump.port}
//       port={pump.port}
//       pumpname={portNameObj[pump.port]}
//       status={pump.state}
//     />
//   </Col>
// ));


// function handleChange(e) {
//   setThreshHold(e.currentTarget.value);
// }
// async function handleSubmit(event) {
//   event.preventDefault();
//   let changes = 0;
//   for (let i = 0; i < pumps.length; i++) {
//     const pump = pumps[i];
//     const response = await fetch(
//       `${process.env.REACT_APP_MOCK_SERVER}/${pump.port}`,
//       {
//         method: "PUT",
//         headers: { "content-type": "application/json" },
//         body: JSON.stringify({ threashold: threshHold }),
//       }
//     );
//     const json = await response.json();
//     if (json) {
//       changes++;
//     }
//   }
//   if(changes===pumps.length){
//       setChange(true)
//   }
// }
export default function WaterPumpContainer(props) {

  const {farm} = useFarmContext()
  const [waterPumps, setWaterPumps] = useState()

  useEffect(()=>{
    const temp = farm?.actuators.Pump?.map(pump=>{
      return <div className="col"><WaterPump name={pump.name} port={pump.port} key={pump.id}/></div>
    })
    setWaterPumps(temp)
  },[])
  console.log(waterPumps)

  return (
    <div className="row justify-content-center">
      <div className="col-11 col-sm-10 col-md-7 mt-3 pump">
        <div className="row bg-success text-white p-2 mb-3">
          <h5>Water Pumps</h5>
        </div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 p-4">
            {waterPumps}
        </div>
      </div>
    </div>
  );
}
