import React, { useEffect, useState } from "react";
import {Row,Col } from "reactstrap";

export default function Temperature(){

    const sourceIds = ['Temp_5','Temp_6']
    const [temperatures, setTemperatures] = useState([])

    useEffect(() => {
      const fetchTemperature = async () => {
        const temps =  sourceIds.map(async (sourceId)=>{
            const response = await fetch(`http://localhost:4000/api/datareading/${sourceId}`)
            const json = await response.json()

            console.log(json)
            if (response.ok) {
                return json.reading
            }
        })
         setTemperatures(temps)
      }
  
      fetchTemperature()
    }, [])

    const components = temperatures.map((t)=>{
        <Col ><h3 className="bg-secondary bg-opacity-25 rounded py-3 text-center">{t}&deg;C</h3></Col>
    })

    return(
        <Row>
            {components}
        </Row>
    )
}