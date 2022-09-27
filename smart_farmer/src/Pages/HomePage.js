import Login from "../components/Login";
import LoginNavBar from "../components/NavBars/LoginNavbar"
import Weather from "../components/NavBars/Weather/Weather";

export default function Home()
{
    return(
        <div className="home">
            <LoginNavBar/>
            <div className="home-header"><h1>Home</h1></div>
            
        </div>
    )
}