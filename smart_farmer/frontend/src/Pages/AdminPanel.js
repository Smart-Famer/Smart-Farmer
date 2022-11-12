// import { Navigate, useParams } from "react-router-dom";
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
  //   return <Navigate to="/login" />;
  // }
  const { dispatchFarm } = useFarmContext();
  const [farm_list, setFarmList] = useState([]);
  console.log(farm_list)
  useEffect(() => {
    const fetchFarms = async () => {
      const response = await fetch(
        `http://localhost:4000/api/manager/get-farms`,
        {
          // method: "POST",
          // headers: {
          //   "Content-Type": "application/json",
          // },
          // body: JSON.stringify({ farm_ids: user.details.farms }),
        }
      );
      const json = await response.json();
      //console.log(json)
      if (response.ok) {
        setFarmList(json);
      }
    };
    fetchFarms();
    dispatchFarm({ type: "ADD" });
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
                  <Counter count="10" />
                </Meter>
              </Col>

              <Col>
                <Meter heading="Number of Mangers">
                  <Counter count="15" />
                </Meter>
              </Col>

              <Col>
                <Meter heading="Number of Farm Assistants">
                  <Counter count="26" />
                </Meter>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}
