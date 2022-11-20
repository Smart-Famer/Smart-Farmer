import CameraContainer from "../components/contol-panel/CameraContainer";
import WaterPumpContainer from "../components/contol-panel/WaterPumpContainer";
import { useFarmContext } from "../hooks/useFarmContext";

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

