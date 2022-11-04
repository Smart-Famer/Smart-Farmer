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
import Sidebar from "../components/Sidebar/SideBar";
import RecentPhotos from "../components/dashboard/RecentPhotos";
import HistoricalData from "../components/dashboard/HistoricalData";
import { Navigate, useParams } from "react-router";
import { propTypes } from "react-bootstrap/esm/Image";
import UserSession from "../components/Utils/UserSession"


export default function Dashboard(props)
{
    // if(UserSession.username===undefined){
    //     return <Navigate to="/login"/>
    // }
    return(
        <div className="main-container">
            <Sidebar/>
            <div className="home">
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
                        
                        <Col>
                            <Meter heading='Recent Photos'>
                                <RecentPhotos/>
                            </Meter>
                        </Col>
                
                        <Col>
                            <Meter heading='Historical Data'>
                                <HistoricalData/>
                            </Meter>
                        </Col>
                        
                        
                    </Row>
                    

                </Container>
        </div>

        </div>
    )
}