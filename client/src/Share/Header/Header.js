import React from "react";
import "./Header.css";
import { useSelector } from "react-redux";

const Header = () => {
  const user  = useSelector((state) => state);
  console.log(user);
  return (
    <nav>
      <div className="navbar-navbar">
        <div>
          <h2>Doctors</h2>
        </div>
      </div>
    </nav>
  );
};

export default Header;
