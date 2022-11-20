import React from "react";
import { useFarmContext } from "../../hooks/useFarmContext";
import { Link, Navigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./Sidebar.css";

export default function Sidebar1() {
  const { farm } = useFarmContext();
  const { user } = useAuthContext();
  return (
    //         <a className="btn btn-primary" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
    //   Link with href
    // </a>
    // <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
    //   Button with data-bs-target
    // </button>
    <>
      <div
        className="offcanvas offcanvas-start w-25"
        tabIndex="-1"
        id="offcanvas"
        data-bs-keyboard="false"
        data-bs-backdrop="true"
        data-bs-scroll="true"
        style={{ maxWidth: 200 }}
      >
        <div className="offcanvas-header  text-white">
          <h5
            className="offcanvas-title d-none d-sm-block fw-bold"
            id="offcanvas"
          >
            {farm?.name}
          </h5>
          <button
            type="button"
            className="btn-close text-reset close--icon"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-header text-white">
          <h6 className="offcanvas-title d-none d-sm-block" id="offcanvas">
            {farm?.address}
          </h6>
        </div>
        <div className="offcanvas-body px-0">
          <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start"
            id="menu"
          >
            <li className="nav-item fs-5 ">
              <Link
                className="nav-link text-truncate"
                to="/user/farm/dashboard"
              >
                <i className="bi-columns-gap sidebar--icons"></i>
                <span className="ms-1 d-none d-sm-inline">Dashboard</span>
              </Link>
            </li>
            <br></br>
            {user?.details.user_type === "Manager" && (
              <>
                <li className="nav-item fs-5">
                  <Link
                    className="nav-link text-truncate"
                    to="/user/farm/createAcc"
                  >
                    <i className="bi-person-plus sidebar--icons"></i>
                    <span className="ms-1 d-none d-sm-inline">
                      Create Account
                    </span>
                  </Link>
                </li>
                <br></br>
              </>
            )}
            {user?.details.user_type === "Assistant" && (
              <>
                <li className="nav-item fs-5">
                  <Link
                    className="nav-link text-truncate"
                    to="/user/farm/controlPanel"
                  >
                    <i className="bi-toggles2 sidebar--icons"></i>
                    <span className="ms-1 d-none d-sm-inline">
                      Control Panel
                    </span>
                  </Link>
                </li>
                <br></br>
              </>
            )}
            <li className="nav-item fs-5">
              <Link
                className="nav-link text-truncate"
                to="/user/farm/cropYield"
              >
                <i className="bi-graph-up sidebar--icons"></i>
                <span className="ms-1 d-none d-sm-inline">Crop Yield</span>
              </Link>
            </li>
            <br></br>
            <li className="nav-item fs-5">
              <Link className="nav-link text-truncate" to="/user/farm/gallery">
                <i className="bi-images sidebar--icons"></i>
                <span className="ms-1 d-none d-sm-inline">Gallery</span>
              </Link>
            </li>
            <br></br>
            <li className="nav-item fs-5">
              <Link className="nav-link text-truncate" to="/user/farm/Modules">
                <i className="bi-gear sidebar--icons"></i>
                <span className="ms-1 d-none d-sm-inline">Modules</span>
              </Link>
            </li>
            <br></br>
            {user?.details.user_type === "Manager" && (
              <>
                <li className="nav-item fs-5">
                  <Link
                    className="nav-link text-truncate"
                    to="/user/farm/farm-details"
                  >
                    <i class="bi bi-info-circle"></i>
                    <span className="ms-1 d-none d-sm-inline">
                      Farm Details
                    </span>
                  </Link>
                </li>
                <br></br>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
