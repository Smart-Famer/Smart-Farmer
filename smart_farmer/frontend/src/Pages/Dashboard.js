import { useEffect } from "react";
import { Navigate } from "react-router";
import { Col, Container, Row } from "reactstrap";
import ElectricConductivity from "../components/dashboard/ElectricConductivity";
import HistoricalData from "../components/dashboard/HistoricalData";
import Humidity from "../components/dashboard/Humidity";
import Meter from "../components/dashboard/Meter";
import NPK from "../components/dashboard/NPK";
import RainFall from "../components/dashboard/RainFall";
import RecentPhotos from "../components/dashboard/RecentPhotos";
import SoilHumidity from "../components/dashboard/SoilHumidity";
import Temperature from "../components/dashboard/Temperature";
import Weather from "../components/dashboard/Weather";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFarmContext } from "../hooks/useFarmContext";

export default function Dashboard(props) {
  const { user } = useAuthContext();
  const { farm } = useFarmContext();
  const socket = props.socket;

  useEffect(() => {
    if (user) {
      const farmId = farm._id;
      socket.emit("join_room", farmId);
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="row main-container">
      <div className="">
        <Container>
          <Row>
            <Col>
              <Meter heading="Temperature">
                <Temperature socket={socket} />
              </Meter>
            </Col>

            <Col>
              <Meter heading="Electric Conductivity">
                <ElectricConductivity />
              </Meter>
            </Col>
            <Col>
              <Meter heading="Rainfall">
                <RainFall socket={socket} />
              </Meter>
            </Col>

            <Col>
              <Meter heading="Weather">
                <Weather />
              </Meter>
            </Col>

            <Col>
              <Meter heading="NPK Levels">
                <NPK />
              </Meter>
            </Col>

            <Col>
              <Meter heading="Humidity">
                <Humidity socket={socket} />
              </Meter>
            </Col>

            <Col>
              <Meter heading="Soil Humidity">
                <SoilHumidity socket={socket} />
              </Meter>
            </Col>
          </Row>
        </Container>
        <Container>
          <div className="row">
            <Col>
              <Meter heading="Recent Photos">
                <RecentPhotos />
              </Meter>
            </Col>
          </div>
          <div className="row">
            <Col>
              <Meter heading="Historical Data">
                <HistoricalData />
              </Meter>
            </Col>
          </div>
        </Container>
      </div>
    </div>
  );
}
