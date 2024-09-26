import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { UserContext } from "../../App";
import UserProfile from "../Header/UserProfile";
import { NavLink, Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { styled } from "@mui/material/styles";
import "./mobileView.css";

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

const MobileViewMenu = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserContext);
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
    // navigate('/userdash');
  };

  const handleClick = (newOpen) => () => {
    setOpen(newOpen);
    // navigate('/userdash');
  };
  return (
    <>
      <div>
        <Button onClick={toggleDrawer(true)}>
          <MenuOpenIcon sx={{ fontSize: "30px", color: "white" }} />
        </Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: 250, background: "#0c1923", height: "100vh" }}
            role="presentation"
            // onClick={toggleDrawer(false)}
          >
            <List sx={{ padding: "10px",width:'100%' }}>
              {userData ? (
             
                <NavLink
                className="signin_userdash"
                 to={'/userdash'}
                >
                 <AccountCircleIcon/> Hi, {userData.name}
                </NavLink>
              ) : (
                <Link to="/register">
                  <AccountButton
                    variant="contained"
                    startIcon={<AccountCircleIcon sx={{ color: "white" }} />}
                    fullWidth
                  >
                    SignIn
                  </AccountButton>
                </Link>
              )}
             
            </List>

            <List className="responsive_link_wrapper">
              <NavLink
                className="responsive_link"
                activeClassName="active_link"
                to={"/"}
              >
                Home
              </NavLink>
            </List>
            <List className="responsive_link_wrapper">
              <NavLink
                className="responsive_link"
                activeClassName="active_link"
                to={"/about"}
              >
                About Us
              </NavLink>
            </List>
            <List className="responsive_link_wrapper">
              <NavLink
                className="responsive_link"
                activeClassName="active_link"
                to={"/"}
              >
                Product
              </NavLink>
            </List>
            <List className="responsive_link_wrapper">
              <NavLink
                className="responsive_link"
                activeClassName="active_link"
                to={"/contact"}
              >
                Contact
              </NavLink>
            </List>
          </Box>
        </Drawer>
      </div>
    </>
  );
};

export default MobileViewMenu;
