// import { Navigate, useParams } from "react-router-dom";
import Temperature from "../components/dashboard/Temperature";
import Weather from "../components/dashboard/Weather";
import Meter from "../components/dashboard/Meter";
import RainFall from "../components/dashboard/RainFall";
import ElectricConductivity from "../components/dashboard/ElectricConductivity";
import { Container,Row,Col} from "reactstrap";
import NPK from "../components/dashboard/NPK";
import Humidity from "../components/dashboard/Humidity";
import SoilHumidity from "../components/dashboard/SoilHumidity";
import Sidebar from "../components/Sidebar/SideBar1";
import RecentPhotos from "../components/dashboard/RecentPhotos";
import HistoricalData from "../components/dashboard/HistoricalData";
import { Navigate, useParams } from "react-router";
import {useAuthContext} from "../hooks/useAuthContext"
import { useEffect } from "react";
import { useFarmContext } from "../hooks/useFarmContext";


export default function Dashboard(props)
{
    const {user} = useAuthContext()
    const { farm } = useFarmContext();
    const socket = props.socket;
    
    useEffect(() => {
        if(user){
            console.log(socket)
            const farmId = farm._id
            socket.emit("join_room", farmId);  
            console.log('joined to '+farmId)

            
            socket.on("dataReadingUpdate",(dataReading)=>{
                debugger
                console.log(dataReading)
            });
            
        }
    },[user]);

    if(!user){
        return <Navigate to="/login"/>      
    }

    

    return(
        <div className="row main-container">
            <div className="">
                <Container>
                    <Row>
                                               
                        <Col>
                            <Meter heading='Temperature'>
                                <Temperature/>
                            </Meter>
                        </Col>


                        <Col>
                            <Meter heading='Electric Conductivity'>
                                <ElectricConductivity/>
                            </Meter>
                        </Col>
                        <Col>
                            <Meter heading='Rainfall'>
                                <RainFall/>
                            </Meter>
                        </Col>

                        <Col>
                            <Meter heading='Weather'>
                                <Weather/>
                            </Meter>
                        </Col>
                        
                        
                        <Col>
                            <Meter heading='NPK Levels'>
                                <NPK/>
                            </Meter>
                        </Col>
                        
                        <Col>
                            <Meter heading='Humidity'>
                                <Humidity/>
                            </Meter>
                        </Col>
                        
                        <Col>
                            <Meter heading='Soil Humidity'>
                                <SoilHumidity/>
                            </Meter>
                        </Col>                   
                    </Row>
                    

                </Container>
                <Container>
                    <div className="row">
                            <Col>
                                <Meter heading='Recent Photos'>
                                    <RecentPhotos/>
                                </Meter>
                            </Col>
                    </div>
                    <div className="row">
                            <Col>
                                <Meter heading='Historical Data'>
                                    <HistoricalData/>
                                </Meter>
                            </Col>

                    </div>
                </Container>
        </div>

        </div>
    )
}