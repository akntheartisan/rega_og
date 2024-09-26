import React, { useContext } from "react";
import UserHeader from "./UserHeader";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProfileForm from "../Profile/ProfileForm";
import { UserContext } from "../../App";
import { Paper } from "@mui/material";
import bike from "./man.png";
import { IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { client } from "../Client/Client";
import { useLocation } from "react-router-dom";
import './userdash.css';

const UserDash = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserContext);
  console.log(userData);


  const cart = () => {
    const id = userData._id;
    console.log("cart");
    navigate("/cart", { state: { id } });
  };

  const orders = () => {
    const id = userData._id;
    console.log("cart");
    navigate("/orders", { state: { id } });
  };

  const logout = async () => {
    try {
      await client.post("/user/logout", {}, { withCredentials: true });
    } catch (error) {
      console.error("Logout error:", error);
    }

    setUserData("");
    navigate("/");
  };
  return (
    <>
      <UserHeader />
      <div className="container">
        <div className="row">
          <div className="col-md-3 sidemenu">
            <Paper
              elevation={5}
              sx={{
                padding: "20px",
                display: "flex",
                gap: "10px",
                marginTop: "15px",
              }}
            >
              <img src={bike} style={{ objectFit: "contain" }} />
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "510",
                  textTransform: "capitalize",
                }}
              >
                {userData.name}
              </p>
            </Paper>
            <Paper elevation={5} sx={{ marginTop: "20px" }}>
              <div style={{ marginLeft: "10px" }}>
                <div
                  style={{
                    display: "flex",
                    marginLeft:'15px',
                    height: "60px",
                    alignItems: "center",
                  }}
                >
                  <AccountCircleIcon sx={{ color: "#878787" }} />
                  &nbsp;&nbsp;
                  <h5 style={{ color: "#878787" }}>Account Settings</h5>
                </div>

                <button
                  style={{
                    border: "none",
                    backgroundColor: "transparent",
                    marginLeft: "50px",
                  }}
                  onClick={cart}
                >
                  Profile Information
                </button>
              </div>
              <hr />
              <div style={{ marginLeft: "10px" }}>
                <div
                  style={{
                    display: "flex",
                    marginLeft:'15px',
                    height: "60px",
                    alignItems: "center",
                  }}
                >
                  <ShoppingBagIcon sx={{ color: "#878787" }} />
                  &nbsp;&nbsp;
                  <h5 style={{ color: "#878787" }}>Cart Details</h5>
                </div>

                <button
                  style={{
                    border: "none",
                    backgroundColor: "transparent",
                    marginLeft: "50px",
                  }}
                  onClick={cart}
                >
                  Go to Cart
                </button>
              </div>
              <hr />
              <div style={{ marginLeft: "10px" }}>
                <div
                  style={{
                    display: "flex",
                    marginLeft:'15px',
                    height: "60px",
                    alignItems: "center",
                  }}
                >
                  <DriveFileMoveIcon sx={{ color: "#878787" }} />
                  &nbsp;&nbsp;
                  <h5 style={{ color: "#878787" }}>My Orders</h5>
                </div>

                <button
                  style={{
                    border: "none",
                    backgroundColor: "transparent",
                    marginLeft: "50px",
                  }}
                  onClick={orders}
                >
                  Orders
                </button>
              </div>
              <hr />

              <div style={{display:'flex', marginLeft:'15px'}}>
                <button
                  style={{ border: "none", backgroundColor: "transparent" }}
                  onClick={logout}
                >
                  <p
                    style={{
                      fontSize: "18px",
                      color: "#878787",
                      fontWeight: "550",
                      marginBottom:'15px'
                    }}
                  >
                    <LogoutIcon />
                    &nbsp;&nbsp;Logout
                  </p>
                </button>
              </div>
            </Paper>
          </div>
          <div className="col-lg-9 col-12">
            <ProfileForm/>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDash;
