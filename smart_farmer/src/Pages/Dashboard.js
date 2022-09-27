// import { Navigate, useParams } from "react-router-dom";
import Temperature from "../components/dashboard/Temperature";
import Weather from "../components/dashboard/Weather";
import Meter from "../components/dashboard/Meter";
import RainFall from "../components/dashboard/RainFall";
import ElectricConductivity from "../components/dashboard/ElectricConductivity";
import { Container,Row,Col} from "reactstrap";


export default function Dashboard(props)
{
    // if(!props.user){
    //     return <Navigate to="/login"/>
    // }
    return(
        <div className="home">
            <h1>User </h1>
                <Container>
                    <Row>
                        <Col>
                            <Meter heading='Temperature'>
                                <Temperature/>
                            </Meter>
                        </Col>
                        <Col>
                            <Meter heading='Weather'>
                                <Weather/>
                            </Meter>
                        </Col>
                        <Col>
                            <Meter heading='Rainfall'>
                                <RainFall/>
                            </Meter>
                        </Col>
                        <Col>
                            <Meter heading='Rainfall'>
                                <RainFall/>
                            </Meter>
                        </Col>
                        
                        <Col>
                            <Meter heading='Electric Conductivity'>
                                <ElectricConductivity/>
                            </Meter>
                        </Col>
                        
                    </Row>
                    

                </Container>
        </div>
    )
}