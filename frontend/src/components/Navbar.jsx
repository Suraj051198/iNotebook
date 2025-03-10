import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../context/Auth/AuthContext";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          iNotebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {isAuthenticated && (
              <li className="nav-item">
                <Link 
                  className={`nav-link ${location.pathname === "/" ? "active" : ""}`} 
                  to="/"
                >
                  Home
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} 
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          
          {!isAuthenticated ? (
            <div className="d-flex">
              <Link className="btn btn-light me-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-outline-light" to="/signup">
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="d-flex align-items-center">
              <span className="text-light me-3">
                Welcome, {user?.name || "User"}
              </span>
              <button onClick={handleLogout} className="btn btn-outline-light">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;