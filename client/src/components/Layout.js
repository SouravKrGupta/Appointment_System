import { Badge, message } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/LayoutStyles.css";
import { adminMenu, userMenu } from "./../Data/data";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  // logout function
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };
  // =========== doctor menu ===============
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list",
    },
  ];
  // =========== doctor menu ===============

  // rendering menu list
  const SidebarMenu = user?.isAdmin
    ? adminMenu.filter((menu) => menu.name !== "Profile")
    : user?.isDoctor
    ? doctorMenu
    : userMenu.filter((menu) => menu.name !== "Profile");

  return (
    <>
      <div className={`main`}>
        <div className="layout">
          <div className="sidebar bg-info bg-gradient px-3">
            <div className="logo">
              <h6>AppointDoc</h6>
              <hr />
            </div>
            <div className="menu">
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <div
                    key={menu.name}
                    className={`menu-item ${isActive && "active"}`}
                  >
                    <i className={menu.icon}></i>
                    <Link to={menu.path}>{menu.name}</Link>
                  </div>
                );
              })}
              <div className="menu-item" onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login">Logout</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div style={{backgroundColor:'#00CED4'}} className="header">
              <div
                className="header-content position-relative"
                style={{ cursor: "pointer" }}
              >
                <Badge
                style={{top:'-10px', left:'-7px'}}
                  className="position-absolute"
                  count={
                    user && user.notification ? user.notification.length : 0
                  }
                  onClick={() => {
                    navigate("/notification");
                  }}
                ></Badge>
                <i className="fa-solid fa-bell "></i>
              </div> 
              <div className="user-doctor-admin-name">
                <h5>{user?.name}</h5>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
