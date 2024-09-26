import React from "react";
import "./header.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from "@mui/material";
import Profile from "./Profile";

const Header = () => {
  return (
    <div className="header">
      <div className="wrapper">
        <div className="logo-2">LOGO</div>
        <div className="usericon">
           <Profile/>
        </div>
      </div>
    </div>
  );
};

export default Header;
