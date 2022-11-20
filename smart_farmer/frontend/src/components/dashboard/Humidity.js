import React, { useEffect, useState } from "react";
import {Row,Col } from "reactstrap";
import { useFarmContext } from "../../hooks/useFarmContext";
import DoughnutChart from "./DoughNutChart";

export default function Humidity({socket}){
    const {farm} = useFarmContext()
    const sourceIds = farm.sensors.Humidity?.map((sensor)=>sensor.port)
    const [humidities, setHumidities] = useState({})
    const [components,setComponents] = useState([])
    
    const sensor_names = {}
    farm.sensors.Humidity?.forEach(sensor => {
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
                setHumidities(json);
              }
            }catch(e){

            }
        }

        fetchHumidity()
    }, [])

    useEffect(()=>{
      if(humidities){
          setComponents(sourceIds?.map((id)=>{
            return <Col key={sourceIds.indexOf(id)} className="d-flex justify-content-center" ><DoughnutChart activeColor={'#2fb648'} inActiveColor={'#c2efca'} reading={Number(humidities[id]??0)} readingName={sensor_names[id]}/></Col>  
          }))
      }
    }
    ,[humidities])

    socket.on("dataReadingUpdate", (dataReading) => {
      if (sourceIds?.includes(dataReading.sourceId)) {
        const temp = {
          ...humidities,
          [dataReading.sourceId]: dataReading.reading,
        };
        setHumidities(temp);
      }
    });


    return(
        <Row>
            {components}
            {components.length===0&&<h4 className="text-center"><p className=" text-danger p-2">No Humidity Sensors found</p></h4>}
        </Row>
    )
}