import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "./Carousel/Carousel";
import Features from "./Features/Features";
import SelfAd from "./SelfAd/SelfAd";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Product from "./Product/Product";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Aboutus from "../About/Aboutus";
import AboutSection from "../About/AboutSection";
import MVission from "../About/MVission";
import AboutCircle from "../About/AboutCircle";
import { useMediaQuery } from "@mui/material";
import BottomNav from "../BottomNav/BottomNav";

const Home = () => {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showAnotherDialog, setShowAnotherDialog] = useState(false); // State for the second dialog

  const val = localStorage.getItem("user");
  const login_val = localStorage.getItem("authToken");

  const smallScreen = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    // Check if user data exists and show the corresponding dialog
    if (val) {
      setShowConfirmation(true);
    } else {
      setShowConfirmation(false);
    }
  }, [val]);

  useEffect(() => {
    checkForLogin();
  }, [login_val]);

  const checkForLogin = async () => {
    setInterval(() => {
      if (!login_val) {
        setShowAnotherDialog(true);
      }
    }, 20000);
  };

  const handleConfirm = () => {
    setShowConfirmation(false);
    localStorage.removeItem("user");
    navigate("/userdash");
  };

  const handleCloseAnotherDialog = () => {
    setShowAnotherDialog(false);
  };

  const navToLogIn = () => {
    navigate("/register");
  };

  return (
    <>
      <Header />
      <Carousel />
      <Aboutus />
      <AboutSection />
      <Product />
      <MVission />
      <AboutCircle />
      <Footer />

      {smallScreen && <div className="" style={{
        position:"sticky",
        bottom:"0px"
      }} ><BottomNav />
      </div>}

      {/* Existing Dialog */}
      <Dialog
        open={showConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Profile Update Required"}
        </DialogTitle>
        <DialogContent>
          <p>You need to update your profile.</p>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleConfirm}
            sx={{
              bgcolor: "#F28123",
              color: "#fff",
              "&:hover": {
                bgcolor: "#d96b1b",
              },
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* New Dialog for Unauthenticated Users */}
      <Dialog
        open={showAnotherDialog}
        // onClose={handleCloseAnotherDialog}
        aria-labelledby="another-dialog-title"
        aria-describedby="another-dialog-description"
      >
        <DialogTitle id="another-dialog-title">{"Login Required"}</DialogTitle>
        <DialogContent>
          <p>Please log in to continue.</p>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseAnotherDialog}
            sx={{
              bgcolor: "#F28123",
              color: "#fff",
              "&:hover": {
                bgcolor: "#d96b1b",
              },
            }}
          >
            Close
          </Button>

          <Button
            onClick={navToLogIn}
            sx={{
              bgcolor: "#F28123",
              color: "#fff",
              "&:hover": {
                bgcolor: "#d96b1b",
              },
            }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Home;
