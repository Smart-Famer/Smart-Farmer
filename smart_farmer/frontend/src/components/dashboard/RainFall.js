import React, { useEffect, useState } from "react";
import {Row,Col} from "reactstrap";

export default function RainFall(props){
    const sourceId = 'Rain_7'
    const [rainfall, setRainfall] = useState(null)

    useEffect(() => {
      const fetchRainFall = async () => {
        const response = await fetch(`http://localhost:4000/api/datareading/${sourceId}`)
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