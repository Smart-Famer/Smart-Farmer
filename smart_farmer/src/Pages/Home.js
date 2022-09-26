import Login from "../components/Login";

export default function Home()
{
    return(
        <div className="home">
            <div className="home-header"><h1>Home</h1></div>
            <div className="home-login"><Login /></div>
            
        </div>
    )
}