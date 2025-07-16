import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DriveFileMoveIcon from "@mui/icons-material/DriveFileMove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { useState, useContext } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import ProfileForm from "../Profile/ProfileForm";
import LogoutIcon from "@mui/icons-material/Logout";
import { client } from "../Client/Client";

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

export default function UserProfile() {
  const navigate = useNavigate();

  const { userData, setUserData } = useContext(UserContext);
  // console.log(userData);
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openProfile, setOpenProfile] = useState(false);

  const Profile = () => {
    console.log("profile opened");
    navigate('/userdash');
  };

  const cart = () => {
    const id = userData._id;
    navigate('/cart',{ state: { id } });
  }

  const order = () => {
    const id = userData._id;
    navigate('/orders',{ state: { id } });
  }

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = async () => {
    try {
      await client.post("/user/logout", {}, { withCredentials: true });
    } catch (error) {
      console.error("Logout error:", error);
    }

    setUserData("");
    navigate("/");
    localStorage.removeItem("authToken");
  };

  return (
    <>
      <AccountButton
        variant="contained"
        startIcon={<AccountCircleIcon sx={{ color: "white" }} />}
        id="basic-button"
        onClick={handleClick}
        fullWidth
      >
        Hi, {userData.name}
      </AccountButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {/* <MenuItem>Profile</MenuItem> */}
        <MenuItem onClick={Profile} sx={{ display: "flex", gap: "15px" }}>
          <AccountCircleIcon />
          Profile
        </MenuItem>
        <MenuItem onClick={cart} sx={{ display: "flex", gap: "15px" }}>
        <ShoppingCartIcon />
          Cart
        </MenuItem>
        <MenuItem onClick={order} sx={{ display: "flex", gap: "15px" }}>
        <DriveFileMoveIcon />
          My Orders
        </MenuItem>
        <MenuItem onClick={logout} sx={{ display: "flex", gap: "15px" }}>
          <LogoutIcon />
          Logout
        </MenuItem>
      </Menu>
      {/* <ProfileForm openProfile={openProfile} setOpenProfile={setOpenProfile} /> */}
    </>
  );
}
