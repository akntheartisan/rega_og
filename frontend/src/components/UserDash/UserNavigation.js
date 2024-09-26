import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import MenuIcon from "@mui/icons-material/Menu";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { client } from "../Client/Client";
import bike from "./man.png";

const UserNavigation = () => {
  const { userData, setUserData } = useContext(UserContext);

  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const profile = () => {
    console.log("profileform");
    navigate("/profileform");
  };

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

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <div>
          <div
            style={{
              display: "flex",
              marginLeft: "15px",
              height: "60px",
              alignItems: "center",
            }}
          >
            <img src={bike} style={{ objectFit: "contain" }} /> &nbsp;&nbsp;
            <p
              style={{
                fontSize: "20px",
                fontWeight: "510",
                textTransform: "capitalize",
              }}
            >
              {userData.name}
            </p>
          </div>
          <hr />
        </div>

        <div style={{ marginLeft: "10px" }}>
          <div
            style={{
              display: "flex",
              marginLeft: "15px",
              height: "60px",
              alignItems: "center",
            }}
          >
            <AccountCircleIcon sx={{ color: "#878787" }} />

            <button
              style={{
                border: "none",
                backgroundColor: "transparent",
              }}
              onClick={cart}
            >
              <h6 style={{ color: "#878787" }}>Account Settings</h6>
            </button>
          </div>
        </div>
        <div style={{ marginLeft: "10px" }}>
          <div
            style={{
              display: "flex",
              marginLeft: "15px",
              height: "60px",
              alignItems: "center",
            }}
          >
            <ShoppingBagIcon sx={{ color: "#878787" }} />
            <button
              style={{
                border: "none",
                backgroundColor: "transparent",
              }}
              onClick={cart}
            >
              <h6 style={{ color: "#878787" }}>Cart Details</h6>
            </button>
          </div>
        </div>

        <div style={{ marginLeft: "10px" }}>
          <div
            style={{
              display: "flex",
              marginLeft: "15px",
              height: "60px",
              alignItems: "center",
            }}
          >
            <DriveFileMoveIcon sx={{ color: "#878787" }} />
            <button
              style={{
                border: "none",
                backgroundColor: "transparent",
              }}
              onClick={orders}
            >
              <h6 style={{ color: "#878787" }}>My Orders</h6>
            </button>
          </div>
        </div>
        <div style={{ marginTop: "auto" }}>
          <hr />
          <div style={{ display: "flex", marginLeft: "15px" }}>
            <button
              style={{ border: "none", backgroundColor: "transparent" }}
              onClick={logout}
            >
              <p
                style={{
                  fontSize: "18px",
                  color: "#878787",
                  fontWeight: "550",
                  marginBottom: "15px",
                }}
              >
                <LogoutIcon />
                &nbsp;&nbsp;Logout
              </p>
            </button>
          </div>
        </div>
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon sx={{color:'white',fontSize:30}}/>
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default UserNavigation;
