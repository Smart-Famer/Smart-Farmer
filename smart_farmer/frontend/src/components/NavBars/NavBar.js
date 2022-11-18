import { Link, Navigate } from "react-router-dom";
import "./navStyle.css";
import { useLogout } from "../../hooks/useLogout";
export default function NavBar() {
  const { logout } = useLogout();
  const handleClick = () => {
    logout();
    return <Navigate to="/" />;
  };

  return (
    <header className="">
      <nav className="navbar navbar-expand-md">
        <div className="navbar-brand fs-3 ms-2">
          <button
            className="btn float-start"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvas"
            role="button"
          >
            <img
              className="inline-block align-text-top me-2"
              alt="Brand"
              src="../images/nav-icon.png"
              width="35"
              height="30"
            />
          </button>
          <span className="top-nav-logo-name fw-bold">Smart Farmer</span>
        </div>
        <button
          className="navbar-toggler me-3"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse ul-bg" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item ms-auto">
              <Link
                className="nav-link mx-3 fs-5"
                style={{ textDecoration: "none" }}
                to="/user/viewProfilePage"
              >
                Profile
              </Link>
            </li>
            <li className="nav-item ms-auto">
              <Link onClick={handleClick} className="nav-link mx-3 fs-5" to="/">
                Logout
              </Link>
            </li>
            <li className="nav-item ms-auto">
              <Link
                className="nav-link mx-3 fs-5"
                style={{ textDecoration: "none" }}
                to="/user/home"
              >
                Home
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="bottom-border"></div>
    </header>
  );
}
