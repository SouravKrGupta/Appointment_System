import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <nav>
      <div className="navbar-navbar">
        <div>
          <h2>Doctors</h2>
        </div>
        <div>
          <ul className="nav-btn-all">
            {/* <li className="nav-btn-li">
              <Link className="nav-btn-link" >Home</Link>
            </li>
            <li className="nav-btn-li">
              <Link className="nav-btn-link" >Dashboard</Link>
            </li> */}

            {user ? (
              <li className="nav-btn-li">
                <Link className="nav-btn-link">Logout</Link>
              </li>
            ) : (
              <>
                <li className="nav-btn-li">
                  <Link className="nav-btn-link">Login</Link>
                </li>
                <li className="nav-btn-li">
                  <Link className="nav-btn-link">Signup</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
