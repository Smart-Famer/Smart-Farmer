import React, { useEffect, useState } from "react";
import {Row,Col } from "reactstrap";

export default function Temperature(){

    const sourceIds = ["Temp_2","Temp_5"]
    const [temperatures, setTemperatures] = useState([])
    
    // console.log(temperatures)
    // console.log(JSON.stringify({sourceIds:sourceIds}))
    useEffect(() => {
        const fetchTemperature=async ()=>{
            let i=0;
            let temp_list=[]
            for(i;i< sourceIds.length;i++){
                const response = await fetch(`${process.env.REACT_APP_HOST}/api/datareading/${sourceIds[i]}`)
                const json = await response.json()
                temp_list.push(json)
            }
            console.log(temp_list)
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
    console.log(temperatures)
    const components = temperatures.map((temp)=>{
        return <Col ><h3 className="bg-secondary bg-opacity-25 rounded py-3 text-center">{temp.reading}&deg;C</h3></Col>
    })
    // console.log(components)
    return(
        <Row>
            {components}
        </Row>
    )
}