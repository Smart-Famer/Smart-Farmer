import Login from "../components/Login";
<<<<<<< HEAD:smart_farmer/src/Pages/Home.js
import Header from "../components/Header";

=======
import LoginNavBar from "../components/NavBars/LoginNavbar"
import Weather from "../components/Weather";
>>>>>>> origin/main:smart_farmer/src/Pages/HomePage.js

export default function Home()
{
    return(
        <div className="home">
<<<<<<< HEAD:smart_farmer/src/Pages/Home.js
            <div className="home-header"><Header /></div>
            <div className="home-login"><Login /></div>
=======
            <LoginNavBar/>
            <div className="home-header"><h1>Home</h1></div>
>>>>>>> origin/main:smart_farmer/src/Pages/HomePage.js
            
        </div>
    )
}