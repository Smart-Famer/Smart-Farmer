import React, { useEffect, useState } from "react";
import {Row,Col } from "reactstrap";
import { useFarmContext } from "../../hooks/useFarmContext";
import DoughnutChart from "./DoughNutChart";

export default function Humidity({socket}){
    const {farm} = useFarmContext()
    const sourceIds = farm.sensors.Humidity.map((sensor)=>sensor.port)
    const [humidities, setHumidities] = useState({})
    
    const sensor_names = {}
    farm.sensors.Humidity.forEach(sensor => {
        sensor_names[sensor.port] = sensor.name.replace(farm.name + "_", "");
    });


    useEffect(() => {
        const fetchHumidity=async ()=>{

            const response = await fetch(
              `${
                process.env.REACT_APP_HOST
              }/api/datareading/all/?sourceids=${sourceIds.join()}`
            );
            const json = await response.json();
            if (response.ok) {
              setHumidities(json);
            }
    
        }

        fetchHumidity()
    }, [])

    socket.on("dataReadingUpdate", (dataReading) => {
      if (sourceIds.includes(dataReading.sourceId)) {
        const temp = {
          ...humidities,
          [dataReading.sourceId]: dataReading.reading,
        };
        setHumidities(temp);
      }
    });

    const components = sourceIds.map((id)=>{
        return <Col key={sourceIds.indexOf(id)} className="d-flex justify-content-center" ><DoughnutChart activeColor={'#2fb648'} inActiveColor={'#c2efca'} reading={Number(humidities[id])} readingName={sensor_names[id].split("_")[1]}/></Col>
    })

    return(
        <Row>
            {components}
        </Row>
    )
}