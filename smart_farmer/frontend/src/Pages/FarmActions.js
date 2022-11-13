
import Header from "../components/login/Header.js"
import { Link } from "react-router-dom"
import { Container, Row, Col } from "reactstrap";
import LoginNavBar from "../components/NavBars/LoginNavbar"
import Sidebar from "../components/Sidebar/SideBar.js"
import FarmCard from "../components/FarmManagement/farmCard"
import { useAuthContext } from "../hooks/useAuthContext.js";
import { useEffect } from "react";
import { useState } from "react";
import { useFarmContext } from "../hooks/useFarmContext.js";
import '../components/FarmManagement/farmCard'
import { HiViewGridAdd } from "react-icons/hi";
import FarmForm from "../components/FarmManagement/farmForm"

export default function  Home() {
    const {user} = useAuthContext()
    const {dispatchFarm} = useFarmContext()
    const [farm_list, setFarmList] = useState([])
    //console.log(farm_list)
    useEffect(() => {
        
        const fetchFarms = async () => {
            const response = await fetch(`${process.env.REACT_APP_HOST}/api/manager/get-farms`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ farm_ids: user.details.farms }),
              }
            );
            const json = await response.json()
            //console.log(json)
            if (response.ok) {
                setFarmList(json)
            }
        }
        fetchFarms()
        dispatchFarm({type:"REMOVE"})
    }, [])

    const farm_components = farm_list.map((farm)=><Col key={farm._id}><FarmCard id={farm._id} name={farm.name} location={farm.location}></FarmCard></Col>)
    
    return (
        <div className="main-container">
            <Sidebar />
            <div class="row m-4 mx-auto">
                    <FarmForm/>
            </div>
        </div>
    )
}