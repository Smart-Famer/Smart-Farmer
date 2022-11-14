import React from "react";
import "./navStyle.css";
import { Link ,Navigate} from "react-router-dom";
import { useAdminLogout } from "../../hooks/useAdminLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function AdminLoginNavBar() {
  const user = useAuthContext();
  const { logout } = useAdminLogout();
  const handleClick = () => {
    logout();
    return <Navigate to="/adminLogin" />;
  };

  return (
    <div className="nav-container">
      <nav className="top-nav">
        <img
          className="login-nav-icon"
          alt="Brand"
          src="../images/nav-icon.png"
        />
        <Link
          className="login-logo-name"
          style={{ textDecoration: "none" }}
          to="/adminLogin"
        >
          <h4>Smart Farmer</h4>
        </Link>
        <Link
          className="login-contact-btn"
          style={{ textDecoration: "none" }}
          onClick={handleClick}
        >
          <h4>Logout</h4>
        </Link>
      </nav>
      <div className="bottom-border"></div>
    </div>
  );
}
