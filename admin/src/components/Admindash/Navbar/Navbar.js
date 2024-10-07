import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <>
      <h4 className="logo" style={{ color: "white" }}>Admin Dashboard</h4>

      <div className="list mt-5">
        <div className="listitem rega-dashboard">
          <Link to="/admin/dashboard">DashBoard</Link>
        </div>
        <div className="listitem">
          <Link to="/admin/primary">Products</Link>
        </div>
        <div className="listitem">
          <Link to="/admin/project">SubProducts</Link>
        </div>
        <div className="listitem">
          <Link to="/admin/order">Orders</Link>
        </div>
        <div className="listitem">
          <Link to="/admin/contact">Contact</Link>
        </div>
        <div className="listitem">
          <Link to="/admin/users">Users</Link>
        </div>
        <div className="listitem">
          <Link to="/admin/enquiry">Enquiry</Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;