import { Navigate, useParams } from "react-router-dom";
import Temperature from "../components/NavBars/Temperature/Temperature";
import Weather from "../components/NavBars/Weather/Weather";


export default function Dashboard(props)
{
    // if(!props.user){
    //     return <Navigate to="/login"/>
    // }
    return(
        <div className="home">
            <h1>User </h1>
            <Weather/>
            <Temperature/>
        </div>
    )
}