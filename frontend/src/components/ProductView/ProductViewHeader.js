import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UserProfile from "../Header/UserProfile";
import './ProductView.css';
import { UserContext } from "../../App";



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

const ProductViewHeader = () => {
    const { userData, setUserData } = useContext(UserContext);
  return (
    <>
          <div className="checkhead">
        <div className="checklogo">
        
            <img src="assets/img/logo.png" alt />
         
        </div>
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
  )
}

export default ProductViewHeader