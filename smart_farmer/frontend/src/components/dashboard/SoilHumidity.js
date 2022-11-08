import React, { useEffect, useState } from "react";
import {Row,Col } from "reactstrap";
import DoughnutChart from "./DoughNutChart";

export default function SoilHumidity(){
    const sourceIds = ["shum_4","shum_5"]
    const [humidities, setHumidities] = useState([])
    

    useEffect(() => {
        const fetchHumidity=async ()=>{
            let i=0;
            let humidies_list=[]
            for(i;i< sourceIds.length;i++){
                const response = await fetch(`${process.env.REACT_APP_HOST}/api/datareading/${sourceIds[i]}`)
                const json = await response.json()
                humidies_list.push(json)
            }
            //console.log(humidies_list)
            setHumidities(humidies_list)
    
        }

        fetchHumidity()
    }, [])
    //console.log(humidities)
    const components = humidities.map((humidity)=>{
        return <Col className="d-flex justify-content-center" ><DoughnutChart activeColor={'#ff4d4d'} inActiveColor={'#ffe6e6'} reading={Number(humidity.reading)} readingName={'Sensor 01'}/></Col>
    })

    return(
        <Row>
            {components}
        </Row>
    )
}