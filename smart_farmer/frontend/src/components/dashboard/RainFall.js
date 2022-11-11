import React, { useEffect, useState } from "react";
import {Row,Col} from "reactstrap";
import { useFarmContext } from "../../hooks/useFarmContext";

export default function RainFall(props){
    const {farm} = useFarmContext()
  

    const sourceId = farm.sensors.RainFall.map((sensor)=>sensor.port)[0]
    const [rainfall, setRainfall] = useState(null)

    useEffect(() => {
      const fetchRainFall = async () => {
        const response = await fetch(`${process.env.REACT_APP_HOST}/api/datareading/${sourceId}`
        );
        const json = await response.json()

        if (response.ok) {
            setRainfall(json)
        }
      }
  
      fetchRainFall()
    }, [])
    return(
        <Row className="px-5">
            <Col ><h1 className="bg-secondary bg-opacity-25 rounded py-3 text-center">{rainfall && (rainfall.reading)} mm</h1></Col>
        </Row>
    )
}