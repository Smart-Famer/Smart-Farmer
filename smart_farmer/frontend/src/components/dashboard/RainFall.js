import React, { useEffect, useState } from "react";
import {Row,Col} from "reactstrap";
import { useFarmContext } from "../../hooks/useFarmContext";

export default function RainFall({socket}){
    const {farm} = useFarmContext()
  

    const source_Id = farm.sensors.RainFall.map((sensor)=>sensor.port)[0]
    const [rainfall, setRainfall] = useState(null)

    useEffect(() => {
      const fetchRainFall = async () => {
        const response = await fetch(`${process.env.REACT_APP_HOST}/api/datareading/${source_Id}`
        );
        const json = await response.json()

        if (response.ok) {
            setRainfall(json)
        }
      }
  
      fetchRainFall()
    }, [])

    socket.on("dataReadingUpdate", (dataReading) => {
      if (source_Id === dataReading.sourceId){
        let temp = {reading:dataReading.reading}
        setRainfall(temp)
      }
    });

    return(
        <Row className="px-5">
            <Col ><h1 className="bg-secondary bg-opacity-25 rounded py-3 text-center">{rainfall && (rainfall.reading)} mm</h1></Col>
        </Row>
    )
}