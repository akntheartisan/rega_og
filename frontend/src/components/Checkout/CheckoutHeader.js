import React from "react";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UserProfile from "../Header/UserProfile";
import './checkout.css'
import { NavLink } from "react-router-dom";
import logo from "./logo.png"

const AccountButton = styled(Button)({
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#f28123",
  borderColor: "#f28123",
  "&:hover": {
    backgroundColor: "#f28123",
    borderColor: "#f28123",
  },
  "&:active": {
    backgroundColor: "#f28123",
    borderColor: "#f28123",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});


const CheckoutHeader = () => {
    const { userData, setUserData } = useContext(UserContext);
  return (
    <>
      <div className="checkhead">
        <div className="checklogo">
        
            <img src={logo} alt />
         
        </div>
        <nav className="main-menu">
                  <ul>
                    <li className="current-list-item">
                      <NavLink style={{fontSize:"16px"}}
                        exact
                        to="/"
                        className={({ isActive }) => (isActive ? "active" : undefined)}
                      >
                        Home
                      </NavLink>
                    </li>

                    <li>
                      <NavLink style={{fontSize:"16px"}}
                      
                        to="/about"
                        className={({ isActive }) => (isActive ? "active" : undefined)}
                      >
                        About
                      </NavLink>
                    </li>

                    <li>
                      <NavLink style={{fontSize:"16px"}}
                        to="/product"
                        className={({ isActive }) => (isActive ? "active" : undefined)}
                      >
                        Product
                      </NavLink>
                    </li>

                    <li>
                      <NavLink style={{fontSize:"16px"}}
                        to="/contact"
                        className={({ isActive }) => (isActive ? "active" : undefined)}
                      >
                        Contact
                      </NavLink>
                    </li>
                  </ul>
                </nav>
        <div className="sign">
          {userData ? (
            <UserProfile />
          ) : (
            <Link to="/register">
              <AccountButton
                variant="contained"
                startIcon={<AccountCircleIcon sx={{ color: "white" }} />}
              >
                SignIn
              </AccountButton>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default CheckoutHeader;
