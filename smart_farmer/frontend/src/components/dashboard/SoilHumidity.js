import React, { useEffect, useState } from "react";
import {Row,Col } from "reactstrap";
import { useFarmContext } from "../../hooks/useFarmContext";
import DoughnutChart from "./DoughNutChart";

export default function SoilHumidity({socket}){
    const {farm} = useFarmContext()
    const sourceIds = farm.sensors.Soil.map((sensor)=>sensor.port)
    const [soilhumidities, setSoilHumidities] = useState({})
    const [components, setComponents] = useState([]);
    const sensor_names = {}
    farm.sensors.Soil?.forEach((sensor) => {
      sensor_names[sensor.port] = sensor.name.replace(farm.name + "_", "");
    });
    
    useEffect(() => {
        const fetchHumidity=async ()=>{
          try{
            const response = await fetch(
              `${
                process.env.REACT_APP_HOST
              }/api/datareading/all/?sourceids=${sourceIds.join()}`
            );
            const json = await response.json();
            if (response.ok) {
              setSoilHumidities(json);
            }
          }catch(e){

          }
    
        }

        fetchHumidity()
    }, [])

    useEffect(() => {
      if(soilhumidities){        
        setComponents(sourceIds?.map((id)=>{
          return (
            <Col
              key={sourceIds.indexOf(id)}
              className="d-flex justify-content-center"
            >
              <DoughnutChart
                activeColor={"#ff4d4d"}
                inActiveColor={"#ffe6e6"}
                reading={Number(soilhumidities[id]??0)}
                readingName={sensor_names[id]}
              />
            </Col>
          );
      }))
      }
    }, [soilhumidities]);

    socket.on("dataReadingUpdate", (dataReading) => {
      if (sourceIds?.includes(dataReading.sourceId)) {
        const temp = {
          ...soilhumidities,
          [dataReading.sourceId]: dataReading.reading,
        };
        setSoilHumidities(temp);
      }
    });
 

    return(
        <Row>
            {components}
            {components.length===0&&<h4 className="text-center"><p className=" text-danger p-2">No Soil Humidity Sensors found</p></h4>}
        </Row>
    )
}