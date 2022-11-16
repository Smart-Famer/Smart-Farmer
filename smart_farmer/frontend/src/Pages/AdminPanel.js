import Header from "../components/login/Header";
import Meter from "../components/dashboard/Meter";
import { Container, Row, Col } from "reactstrap";
import Counter from "../components/admin/counter";
import { Navigate } from "react-router";
import { useAuthContext } from "../hooks/useAuthContext.js";
import { useEffect } from "react";
import { useState } from "react";
import { useFarmContext } from "../hooks/useFarmContext.js";

export default function AdminPanel(props) {
  // const { user } = useAuthContext();
  // if (!user) {
  //   return <Navigate to="/adminLogin" />;
  // }
  const [farm_list, setFarmList] = useState([]);
  const [manager_list, setManagerList] = useState([]);
  const [assitant_list, setAssiatantList] = useState([]);
  useEffect(() => {
    const fetchFarms = async () => {
      const response = await fetch(
        `http://localhost:4000/api/admin/`
      );
      const json = await response.json();
      if (response.ok) {
        setFarmList(json);
      }
    };
    const fetchManagers= async () => {
      const response = await fetch(
        `http://localhost:4000/api/admin/get-all-mangers`
      );
      const json = await response.json();
      // console.log(json);
      if (response.ok) {
        setManagerList(json);
      }
    };
    const fetchAssistants = async () => {
      const response = await fetch(
        `http://localhost:4000/api/admin/get-all-assistants`
      );
      const json = await response.json();
      // console.log(json);
      if (response.ok) {
        setAssiatantList(json);
      }
    };

    fetchFarms();
    fetchManagers();
    fetchAssistants();

  }, []);

  return (
    <div className="main-container">
      <div className="home">
        <Header />
        <div className="farm-card p-5">
          <Container>
            <Row>
              <Col>
                <Meter heading="Number of Farms">
                  <Counter card_id="Farm" count={farm_list.length} />
                </Meter>
              </Col>

              <Col>
                <Meter heading="Number of Mangers">
                  <Counter card_id="Manager"  count={manager_list.length} />
                </Meter>
              </Col>

              <Col>
                <Meter heading="Number of Farm Assistants">
                  <Counter card_id="Assistant" count={assitant_list.length} />
                </Meter>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}
