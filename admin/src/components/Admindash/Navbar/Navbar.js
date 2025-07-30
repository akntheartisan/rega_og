import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";
import { client } from "../../../Client/Clientaxios";
import { AdminContext } from "../../../App";

const Navbar = () => {
  const { admin, setAdmin } = useContext(AdminContext);

  const navigate = useNavigate();

  const logout = async () => {
    const logout = await client.post(
      "/admin/logout",
      {},
      { withCredentials: true }
    );
    console.log(logout);

    if (logout.status === 200) {
      setAdmin("");
      navigate("/admin");
    }
  };
  return (
    <>
      <div className="logo mt-4" style={{ color: "white" }}>
        <img src="/assets/logo.png" alt="logo" />
      </div>

      <div className="list mt-5">
        <NavLink
          className={({ isActive }) => (isActive ? "listitem activetab" : "")}
          to="/admin/dashboard"
        >
          DashBoard
        </NavLink>

        <NavLink
          className={({ isActive }) => (isActive ? "listitem activetab" : "")}
          to="/admin/primary"
        >
          Products
        </NavLink>

        <NavLink
          className={({ isActive }) => (isActive ? "listitem activetab" : "")}
          to="/admin/project"
        >
          SubProducts
        </NavLink>

        <NavLink
          className={({ isActive }) => (isActive ? "listitem activetab" : "")}
          to="/admin/order"
        >
          Orders
        </NavLink>

        <NavLink
          className={({ isActive }) => (isActive ? "listitem activetab" : "")}
          to="/admin/addComponent"
        >
          Components
        </NavLink>

        <NavLink
          className={({ isActive }) => (isActive ? "listitem activetab" : "")}
          to="/admin/refund"
        >
          Refund Details
        </NavLink>

        <NavLink
          className={({ isActive }) => (isActive ? "listitem activetab" : "")}
          to="/admin/contact"
        >
          Contact
        </NavLink>

        <NavLink
          className={({ isActive }) => (isActive ? "listitem activetab" : "")}
          to="/admin/users"
        >
          Users
        </NavLink>

        <NavLink
          className={({ isActive }) => (isActive ? "listitem activetab" : "")}
          to="/admin/enquiry"
        >
          Enquiry
        </NavLink>
        <button className="logout-btn" onClick={logout}>
          logout
        </button>
      </div>
    </>
  );
};

export default Navbar;
