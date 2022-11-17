import React, { useEffect,useState } from "react";
import {Row,Col} from "reactstrap";
import { Link } from "react-router-dom";

import { useFarmContext } from "../../hooks/useFarmContext";

export default function NPK(){
    const {farm} = useFarmContext()
    const sourceId = farm.NPK_levels_key
    const [nLevel, setNLevel] = useState('')
    const [pLevel, setPLevel] = useState('')
    const [kLevel, setKLevel] = useState('')

    useEffect(() => {
      const fetchNpkLevels = async () => {
        const response = await fetch(`${process.env.REACT_APP_HOST}/api/datareading/npklevel/${sourceId}`
        );
        const json = await response.json()
        if (response.ok) {
            setNLevel(json.n)
            setPLevel(json.p)
            setKLevel(json.k)
        }
      }
      fetchNpkLevels()
    }, [])

    return(
        <>
            <Row className="align-items-center px-5">
                <Col ><h6 className="align-middle">Nitrogen <b>N</b></h6></Col>
                <Col ><h6 className="bg-secondary bg-opacity-25 rounded py-3 text-center">{nLevel} mgL<sup>-1</sup></h6></Col>
            </Row>
            
            <Row className="align-items-center px-5">
                <Col ><h6 className="align-middle">Phosphorus <b>P</b></h6></Col>
                <Col ><h6 className="bg-secondary bg-opacity-25 rounded py-3 text-center">{pLevel} mgL<sup>-1</sup></h6></Col>
            </Row>
            
            <Row className="align-items-center px-5">
                <Col ><h6 className="align-middle">Potassium <b>K</b></h6></Col>
                <Col ><h6 className="bg-secondary bg-opacity-25 rounded py-3 text-center">{kLevel} mgL<sup>-1</sup></h6></Col>
            </Row>
            <div className="d-flex flex-row-reverse">
                    <Link to="/user/farm/npkinput" style={{ textDecoration: 'none' }}>{"Add Inputs>"}</Link>
            </div>
            
        </>
    )
}