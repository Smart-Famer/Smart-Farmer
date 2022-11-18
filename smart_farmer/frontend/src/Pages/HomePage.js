import Header from "../components/login/Header.js";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import LoginNavBar from "../components/NavBars/LoginNavbar";
import Sidebar from "../components/Sidebar/SideBar.js";
import FarmCard from "../components/FarmManagement/farmCard";
import { useAuthContext } from "../hooks/useAuthContext.js";
import { useEffect } from "react";
import { useState } from "react";
import { useFarmContext } from "../hooks/useFarmContext.js";
import "../components/FarmManagement/farmCard";
import { HiViewGridAdd } from "react-icons/hi";

export default function Home() {
  const navigate = useNavigate();
  let { user } = useAuthContext();
  const { dispatchFarm } = useFarmContext();
  const [farm_list, setFarmList] = useState([]);
  //console.log(farm_list)
  const handleAction = () => {
    navigate("/user/farm-actions/add/00");
  };
  useEffect(() => {
    const fetchFarms = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_HOST}/api/manager/get-farms`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ farm_ids: user.details.farms }),
        }
      );
      const json = await response.json();
      // alert(JSON.stringify(json.length))

      //console.log(json)
      if (response.ok) {
        setFarmList(json);
      }
    };
    fetchFarms();
    dispatchFarm({ type: "REMOVE" });
  }, [user]);

  const farm_components = farm_list.map((farm) => (
    <div className="col mb-3" key={farm._id}>
      <FarmCard
        id={farm._id}
        name={farm.name}
        address={farm.address}
        latitude={farm.location.latitude}
        longitude={farm.location.longitude}
      ></FarmCard>
    </div>
  ));

  return (
    <div className="main-container">
      <div className="home">
        <Header />
        <div className="farm-card p-4">
          {user.details.user_type === "Manager" && (
            <div className="text-center mb-4">
              <button
                className="btn btn-md btn-success rounded-pill"
                onClick={handleAction}
              >
                <i class="bi bi-plus-lg shadow fw-bold"></i>
              </button>
            </div>
          )}
          <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3">
            {farm_components}
          </div>
        </div>
      </div>
    </div>
  );
}
