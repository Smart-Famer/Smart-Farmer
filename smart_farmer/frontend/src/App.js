import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-router-dom";
import UserLayout from "./Pages/UserLayout";
import LoginPage from "./Pages/LoginPage";
import Admin from "./Pages/AdminPanel"
import Error from "./Pages/Error";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { FarmContextProvider } from "./context/FarmContext";

function App() {
  //console.log(user.username)
  // console.log(UserSession.username)
  const { user } = useAuthContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/user/home" />}
        />
        <Route
          path="/user/*"
          element={user ? 
          <FarmContextProvider>
            <UserLayout /> 
          </FarmContextProvider>
          :<Navigate to="/login" />}
        />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
