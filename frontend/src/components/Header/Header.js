import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../App";
import UserProfile from "./UserProfile";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MobileViewMenu from "../MobileViewMenu/MobileViewMenu";
import "./Header.css";
import { useMediaQuery } from "@mui/material";

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

const Header = () => {
  const smallScreen = useMediaQuery("(max-width:900px)");
  const { userData } = useContext(UserContext);
  // const [responsive,setResponsive] = useState(false);

  return (
    <>
      <div className="top-header-area" id="sticker">
        <div className="container-fluid px-5 Header-padding">
          <div className="row">
            <div className="col-lg-12 col-sm-12 text-center">
              {!smallScreen ? (
                <div className="main-menu-wrap">
                  <div className="site-logo">
                    <NavLink to="/">
                      <img src="assets/img/logo.png" alt="Site Logo" />
                    </NavLink>
                  </div>
                  <nav className="main-menu">
                    <ul>
                      <li className="current-list-item">
                        <NavLink
                          style={{ fontSize: "16px" }}
                          exact
                          to="/"
                          className={({ isActive }) =>
                            isActive ? "active" : undefined
                          }
                        >
                          Home
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          style={{ fontSize: "16px" }}
                          to="/about"
                          className={({ isActive }) =>
                            isActive ? "active" : undefined
                          }
                        >
                          About
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          style={{ fontSize: "16px" }}
                          to="/product"
                          className={({ isActive }) =>
                            isActive ? "active" : undefined
                          }
                        >
                          Product
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          style={{ fontSize: "16px" }}
                          to="/contact"
                          className={({ isActive }) =>
                            isActive ? "active" : undefined
                          }
                        >
                          Contact
                        </NavLink>
                      </li>

                      <li>
                        <div className="header-icons">
                          {userData ? (
                            <UserProfile />
                          ) : (
                            <NavLink className="mobile-hide" to="/register">
                              <AccountButton
                                variant="contained"
                                startIcon={
                                  <AccountCircleIcon sx={{ color: "white" }} />
                                }
                              >
                                Sign In
                              </AccountButton>
                            </NavLink>
                          )}
                        </div>
                      </li>
                    </ul>
                  </nav>
                </div>
              ) : (
                <div
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div style={{maxWidth:'150px'}}>
                  <NavLink to="/">
                    <img src="assets/img/logo.png" alt="Site Logo" />
                  </NavLink>
                </div>
                <div className="header-icons">
                        {userData ? (
                          <UserProfile />
                        ) : (
                          <NavLink className="mobile-hide" to="/register">
                            <AccountButton
                              variant="contained"
                              startIcon={
                                <AccountCircleIcon sx={{ color: "white" }} />
                              }
                            >
                              Sign In
                            </AccountButton>
                          </NavLink>
                        )}
                </div>
              </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
