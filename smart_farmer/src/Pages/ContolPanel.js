// import { Navigate, useParams } from "react-router-dom";
import WaterPumpContainer from "../components/contol-panel/WaterPumpContainer";
import CameraContainer from "../components/contol-panel/CameraContainer";



export default function Dashboard(props)
{
    // if(!props.user){
    //     return <Navigate to="/login"/>
    // }
    const pumps=[
        {
            name:"Pump1",
            status:"on"
        },
        {
            name:"Pump2",
            status:"off"
        }
    ]
    const cameras=["camera-1","camera-2"]
    return(
        <div>
            <div className="Control">
                <WaterPumpContainer pumps={pumps} threshhold="10" />
                <CameraContainer cameras={cameras}/>
            </div>       
        </div>
    )
}