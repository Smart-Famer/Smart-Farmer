// import { Navigate, useParams } from "react-router-dom";
import WaterPumpContainer from "../components/contol-panel/WaterPumpContainer";
import CameraContainer from "../components/contol-panel/CameraContainer";
import Sidebar from "../components/Sidebar/SideBar";
import { useFarmContext } from "../hooks/useFarmContext";
import { useEffect } from "react";

export default function Dashboard(props) {
  const { farm } = useFarmContext();

    return(
        <div className="">
            
                <WaterPumpContainer/>

            <div>
                <CameraContainer cameras={farm?.actuators.Camera}/>
            </div>       
        </div>
    )
}

