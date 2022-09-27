import { Navigate, useParams } from "react-router-dom";

export default function Dashboard(props)
{
    if(!props.user){
        return <Navigate to="/login"/>
    }
    return(
        <div className="home">
            <h1>User </h1>
        </div>
    )
}