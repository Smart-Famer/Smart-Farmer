import React, { useEffect, useState } from "react";
import {Row,Col} from "reactstrap";
import { Link } from "react-router-dom";

export default function ElectricConductivity(){
    const sourceId = 'Elect_123'
    const [electricCon, setElectricCon] = useState(null)

    useEffect(() => {
      const fetchWorkouts = async () => {
        const response = await fetch(`http://localhost:4000/api/datareading/${sourceId}`)
        const json = await response.json()

        if (response.ok) {
            setElectricCon(json)
        }
      }
  
      fetchWorkouts()
    }, [])

    return(
        <>
        <Row className="px-5">
            <Col ><h1 data-testid="elec-con" className="bg-secondary bg-opacity-25 rounded py-3 text-center" >{electricCon && (electricCon.reading)} sm<sup>-1</sup></h1></Col>
        </Row>
        <div className="d-flex flex-row-reverse">
                    <Link to="/elecinput" style={{ textDecoration: 'none' }}>{"Add inputs>"}</Link>
        </div>
        </>
    )
}