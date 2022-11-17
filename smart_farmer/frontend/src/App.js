import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-router-dom";
import UserLayout from "./Pages/UserLayout";
import LoginPage from "./Pages/LoginPage";
import Error from "./Pages/Error";
import AdminLayout from "./Pages/AdminLayout";
import AdminLogin from "./Pages/AdminLogin";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { FarmContextProvider } from "./context/FarmContext";
// import io from "socket.io-client";
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
            <UserLayout /> 
          </FarmContextProvider>
          :<Navigate to="/login" />}
        />

        {/* routing for admin users */}
        <Route path='/adminLogin' element={!user ? <AdminLogin/> : <Navigate to="/admin/dashboard"/> }/>
        <Route path='/admin/*' element={user  ? <AdminLayout/> : <Navigate to="/adminLogin"/> }/>

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
