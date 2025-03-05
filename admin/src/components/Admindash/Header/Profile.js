import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useContext } from "react";
import { Stack, TextField, InputAdornment, Box } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import { AdminContext } from "../../../App";
import EditProfile from "./EditProfile";
// import PasswordEdit from "./PasswordEdit";

import { useNavigate } from "react-router-dom";
import { client } from "../../../Client/Clientaxios";

export default function Profile() {
  const navigate = useNavigate();

  const { admin, setAdmin } = useContext(AdminContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
//   const [openEditPro, setOpenEdit] = useState(false);
  const [openPass, setOpenPass] = useState(false);

//   const handleClickOpenEdit = () => {
//     setOpenEdit(true);
//   };

  const passwordUpdate = () => {
    setOpenPass(true);
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = async () => {
    const logout = await client.post('/admin/logout',{},{withCredentials:true});
    console.log(logout);

    if(logout.status === 200){
      setAdmin('');
      navigate("/admin");
    }
    
    
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <AccountCircleIcon />
      </Button>
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
        {/* <MenuItem onClick={passwordUpdate}>Password Update</MenuItem> */}
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
      {/* <EditProfile
        user={user}
        setOpenEdit={setOpenEdit}
        openEditPro={openEditPro}
        handleClickOpenEdit={handleClickOpenEdit}
      /> */}
      <EditProfile
        admin={admin}
        openPass={openPass}
        setOpenPass={setOpenPass}
        passwordUpdate={passwordUpdate}
      />
    </div>
  );
}