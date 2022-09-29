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