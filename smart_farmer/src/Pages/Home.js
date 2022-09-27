import Login from "../components/Login";
import Header from "../components/Header";


export default function Home()
{
    return(
        <div className="home">
            <div className="home-header"><Header /></div>
            <div className="home-login"><Login /></div>
            
        </div>
    )
}