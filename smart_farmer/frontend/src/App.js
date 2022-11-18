import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

import "react-router-dom";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { FarmContextProvider } from "./context/FarmContext";
import { useAuthContext } from "./hooks/useAuthContext";
import AdminLayout from "./Pages/AdminLayout";
import AdminLogin from "./Pages/AdminLogin";
import Error from "./Pages/Error";
import LoginPage from "./Pages/LoginPage";
import UserLayout from "./Pages/UserLayout";
import {io} from "socket.io-client";
const socket = io("http://localhost:4000");
// const socket = io.connect('http://localhost:4000')


function App() {
  //console.log(user.username)
  // console.log(UserSession.username)
  const { user } = useAuthContext();


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/user/home" />}
        />
        <Route
          path="/user/*"
          element={user && user.details.user_type!= "Admin"? 
          <FarmContextProvider>
            <UserLayout socket={socket} /> 
          </FarmContextProvider>
          :<Navigate to="/login" />}
        />

        {/* routing for admin users */}
        <Route path='/adminLogin' element={!user ? <AdminLogin/> : <Navigate to="/admin/dashboard"/> }/>
        <Route path='/admin/*' element={user  ? <AdminLayout/> : <Navigate to="/adminLogin"/> }/>

        <Route path="*" element={<Error />} />
      </Routes>
      <footer>
        
      </footer>
    </BrowserRouter>
  );
}

export default App;
