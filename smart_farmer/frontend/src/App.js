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
const socket = io(`${process.env.REACT_APP_HOST}`);


function App() {
  const { user } = useAuthContext();


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : 
                                          (user.details.user_type!=="Admin"?
                                                                          <Navigate to="/user/home"/>
                                                                          :<Navigate to="/admin/dashboard"/>)}
        />
        <Route
          path="/user/*"
          element={user ? 
                        (user.details.user_type!= "Admin" ? 
                            <FarmContextProvider>
                              <UserLayout socket={socket} /> 
                            </FarmContextProvider>
                            :<Navigate to="/admin/dashboard"/>)
                        :<Navigate to="/login"/>}
                      />

        {/* routing for admin users */}
        <Route path='/adminLogin' element={!user ? <AdminLogin/> : 
                                                                  (user.details.user_type==="Admin"?
                                                                                                  <Navigate to="/admin/dashboard"/>
                                                                                                  : <Navigate to="/user/home"/>)}/>

        <Route path='/admin/*' element={user  ? 
                                              (user.details.user_type==="Admin"?
                                                <AdminLayout/>
                                                :<Navigate to="/user/home" />) 
                                              : <Navigate to="/adminLogin"/> }/>

        <Route path="*" element={<Error />} />
      </Routes>
      <footer>
        
      </footer>
    </BrowserRouter>
  );
}

export default App;
