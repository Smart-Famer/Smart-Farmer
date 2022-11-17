import React, { useEffect, useState } from "react";
import {Row,Col } from "reactstrap";
import { useFarmContext } from "../../hooks/useFarmContext";

export default function Temperature(){
    const {farm} = useFarmContext()
    const sourceIds = farm.sensors.Temperature.map((sensor)=>sensor.port)
    const [temperatures, setTemperatures] = useState([])

    const sensor_names = farm.sensors.Temperature.map((sensor)=>{
        return sensor.name.replace(farm.name+"_","")
    })
    // console.log(sensor_names);
    // console.log(sourceIds)

    const nameId = {}
    farm.sensors.Temperature.forEach(data => {
        let temp = data.name.split("_")
        let nameWithoutFarmArr = temp.slice(1)
        let nameWithoutFarm = nameWithoutFarmArr.join("_")
        nameId[data.port] = nameWithoutFarm;
    });

    useEffect(() => {
        const fetchTemperature=async ()=>{
            let i=0;
            let temp_list=[]
            for(i;i< sourceIds.length;i++){
                const response = await fetch(`${process.env.REACT_APP_HOST}/api/datareading/${sourceIds[i]}`)
                const json = await response.json()
                temp_list.push(json)
            }
            //console.log(temp_list)
            setTemperatures(temp_list)
    
        }
        // const fetchTemperature = async () => {
        //     const response = await fetch(`http://localhost:4000/api/datareading/get-readings`,{
        //         method:"POST",
        //         headers:{
        //             "Content-Type":"application/json"
        //         },    
        //         body:JSON.stringify({sourceIds:sourceIds})
        //     })
        //     const json = await response.json()
        //     console.log(json)
        //     if (response.ok) {
        //         setTemperatures(json)
        //     }
        // }
        fetchTemperature()
    }, [])
    const components = temperatures.map((temp)=>{
        return <Col key={temp._id} ><h3 className="bg-secondary bg-opacity-25 rounded py-3 text-center">{temp.reading}&deg;C</h3>
        <h6 className="text-center">{nameId[temp.sourceId]}</h6>
        </Col>
    })
    return(
        <Row>
            {components}
        </Row>
    )
}