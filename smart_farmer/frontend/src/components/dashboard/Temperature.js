import React, { useEffect, useState } from "react";
import {Row,Col } from "reactstrap";
import { useFarmContext } from "../../hooks/useFarmContext";

export default function Temperature({socket}){
    const {farm} = useFarmContext()
    const sourceIds = farm.sensors.Temperature.map((sensor)=>sensor.port)
    const [temperatures, setTemperatures] = useState({})



    const nameId = {}
    farm.sensors.Temperature.forEach(data => {
        let temp = data.name.split("_")
        let nameWithoutFarmArr = temp.slice(1)
        let nameWithoutFarm = nameWithoutFarmArr.join("_")
        nameId[data.port] = nameWithoutFarm;
    });

    

    useEffect(() => {
        const fetchTemperature=async ()=>{

            const response = await fetch(
              `${process.env.REACT_APP_HOST}/api/datareading/all/?sourceids=${sourceIds.join()}`
            );
            const json  = await response.json();
            if(json){
                setTemperatures(json);
            }

        }

        fetchTemperature()
    }, [])


    socket.on("dataReadingUpdate", (dataReading) => {
      if (sourceIds.includes(dataReading.sourceId)) {
        const temp = {
          ...temperatures,
          [dataReading.sourceId]: dataReading.reading,
        };
        setTemperatures(temp);
      }
    });

    const components = sourceIds.map((id)=>{
        return (
          <Col key={sourceIds.indexOf(id)}>
            <h3 className="bg-secondary bg-opacity-25 rounded py-3 text-center">
              {temperatures[id]}&deg;C
            </h3>
            <h6 className="text-center">{nameId[id]}</h6>
          </Col>
        );
    })
    return(
        <Row>
            {components}
        </Row>
    )
}