import React, { useEffect, useState } from "react";
import {Row,Col } from "reactstrap";
import { useFarmContext } from "../../hooks/useFarmContext";

export default function Temperature(){
    const {farm} = useFarmContext()
    const sourceIds = farm.sensors.Temperature.map((sensor)=>sensor.port)
    const [temperatures, setTemperatures] = useState({})

    const sensor_names = farm.sensors.Temperature.map((sensor)=>{
        return sensor.name.replace(farm.name+"_","")
    })

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
            console.log(json);
            if(json){
                setTemperatures(json);
            }

        }

        fetchTemperature()
    }, [])
    const components = sourceIds.map((id)=>{
        return <Col key={id} ><h3 className="bg-secondary bg-opacity-25 rounded py-3 text-center">{temperatures[id]}&deg;C</h3>
        <h6 className="text-center">{nameId[id]}</h6>
        </Col>
    })
    return(
        <Row>
            {components}
        </Row>
    )
}