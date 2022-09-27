// import { Navigate, useParams } from "react-router-dom";
import Temperature from "../components/dashboard/Temperature";
import Weather from "../components/dashboard/Weather";
import Meter from "../components/dashboard/Meter";
import RainFall from "../components/dashboard/RainFall";


export default function Dashboard(props)
{
    // if(!props.user){
    //     return <Navigate to="/login"/>
    // }
    return(
        <div className="home">
            <h1>User </h1>
                <Meter heading='Temperature'>
                    <Temperature/>
                </Meter>
                <Meter heading='Weather'>
                    <Weather/>
                </Meter>
                <Meter heading='Rainfall'>
                    <RainFall/>
                </Meter>
        </div>
    )
}