
import Header from "../components/login/Header.js"
import { Link } from "react-router-dom"
import { Container, Row, Col } from "reactstrap";
import LoginNavBar from "../components/NavBars/LoginNavbar"
import Sidebar from "../components/Sidebar/SideBar.js"
import Card from "../components/cards/card.js"
import { useAuthContext } from "../hooks/useAuthContext.js";
import { useEffect } from "react";
import { useState } from "react";
import { useFarmContext } from "../hooks/useFarmContext.js";

export default function  Home() {
    const {user} = useAuthContext()
    const {dispatchFarm} = useFarmContext()
    const [farm_list, setFarmList] = useState([])
    //console.log(farm_list)
    useEffect(() => {
        
        const fetchFarms = async () => {
            const response = await fetch(`http://localhost:4000/api/manager/get-farms`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({farm_ids:user.details.farms})
            })
            const json = await response.json()
            //console.log(json)
            if (response.ok) {
                setFarmList(json)
            }
        }
        fetchFarms()
        dispatchFarm({type:"REMOVE"})
    }, [])

    const farm_components = farm_list.map((farm)=><Col key={farm._id}><Card id={farm._id} name={farm.name} location={farm.location}></Card></Col>)
    
    return (
        <div className="main-container">
            <Sidebar />
            <div className="home">
                <Header />
                <div className="farm-card p-5">
                    
                    <Container >
                        <Row>
                            {farm_components}
                        </Row>


                    </Container>

                </div>
            </div>


        </div>
    )
}