// import { Navigate, useParams } from "react-router-dom";
import WaterPumpContainer from "../components/contol-panel/WaterPumpContainer";
import CameraContainer from "../components/contol-panel/CameraContainer";
import Sidebar from "../components/Sidebar/SideBar";
import { useFarmContext } from "../hooks/useFarmContext";
import { useEffect } from "react";

export default function Dashboard(props) {
  const { farm } = useFarmContext();

  const pumps = farm?.actuators?.Pump;

  useEffect(() => {
    console.log("Farm is ", farm);
  }, [farm]);

  // const pumps=[
  //     {
  //         name:"Pump1",
  //         status:"on"
  //     },
  //     {
  //         name:"Pump2",
  //         status:"off"
  //     }
  // ]
  const cameras = ["camera-1", "camera-2"];
  return (
    <div className="main-container">
      <Sidebar />
      <div className="Control">
        <WaterPumpContainer pumps={pumps} threshhold="10" />
        <CameraContainer cameras={cameras} />
      </div>
    </div>
  );
}
