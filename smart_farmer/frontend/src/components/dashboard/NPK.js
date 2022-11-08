import React, { useEffect, useMemo, useRef, useState } from "react";
import {Row,Col} from "reactstrap";
import { Link } from "react-router-dom";

export default function NPK(){

    const sourceId = 'NPK_123'
    const [npkLevel, setNpkLevel] = useState('')




    // useEffect(()=>{
    //     if(npkLevel){
    //         const array = npkLevel.split(",")
    //         nitrogen.current = array[0]
    //         phosphorus.current = array[1]
    //         potassium.current = array[2]

    //         console.log(nitrogen)

    //     }
        
    // },[npkLevel])



    useEffect(() => {
      const fetchNpkLevels = async () => {
        const response = await fetch(`http://localhost:4000/api/datareading/${sourceId}`)
        const json = await response.json()



        if (response.ok) {
            setNpkLevel(json.reading)
        }
      }
      fetchNpkLevels()
    }, [])

    return(
        <>
            <Row className="align-items-center px-5">
                <Col ><h6 className="align-middle">Nitrogen <b>N</b></h6></Col>
                <Col ><h6 className="bg-secondary bg-opacity-25 rounded py-3 text-center">{npkLevel.split(",")[0]} mgL<sup>-1</sup></h6></Col>
            </Row>
            
            <Row className="align-items-center px-5">
                <Col ><h6 className="align-middle">Phosphorus <b>P</b></h6></Col>
                <Col ><h6 className="bg-secondary bg-opacity-25 rounded py-3 text-center">{npkLevel.split(",")[1]} mgL<sup>-1</sup></h6></Col>
            </Row>
            
            <Row className="align-items-center px-5">
                <Col ><h6 className="align-middle">Potassium <b>K</b></h6></Col>
                <Col ><h6 className="bg-secondary bg-opacity-25 rounded py-3 text-center">{npkLevel.split(",")[2]} mgL<sup>-1</sup></h6></Col>
            </Row>
            <div className="d-flex flex-row-reverse">
                    <Link to="/user/farm/npkinput" style={{ textDecoration: 'none' }}>{"Add Inputs>"}</Link>
            </div>
            
        </>
    )
}