import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { getToken, getUserRole } from "./Helper";
import logo from "./assests/GreeceN'Oils(2).png";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [collapseOpen, setCollapseOpen] = useState(false); 
  const navigate = useNavigate();
  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsLoggedIn(true);
      const role = getUserRole();
      console.log({ role });
      setIsAdmin(role === "admin");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsAdmin(false);
    const role = localStorage.getItem("role");
    if (role === "admin") navigate("/login");
    else navigate("/");
  };

  const toggleCollapse = () => {
    setCollapseOpen(!collapseOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="" style={{ width: "80px", height: "55px" }} />
         Grease N' Oils
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon">
            <i className="fas fa-bars"></i>
          </span>
        </button>
        <div
          className={`collapse navbar-collapse ${collapseOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ml-auto">
            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    LOGIN
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    REGISTER
                  </Link>
                </li>
              </>
            ) : (
              <>
                {isAdmin ? (
                  <>
                    <li className="nav-item">
                      <Link to="/profile" className="nav-link">
                        YOUR PROFILE
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/category" className="nav-link">
                        CATEGORY
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/orders" className="nav-link">
                        ORDERS
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link to="/profile" className="nav-link">
                        YOUR PROFILE
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/" className="nav-link">
                        HOME
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/service" className="nav-link">
                        BOOK YOUR SERVICES
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/userorder" className="nav-link">
                        YOUR ORDERS
                      </Link>
                    </li>
                  </>
                )}
                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="btn btn-link nav-link"
                  >
                    LOGOUT
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
