import React from "react";
import { useMediaQuery } from "@mui/material";
import Header from "../Header/Header";
import AboutHeader from "../About/AboutHeader";
import Footer from "../Footer/Footer";
import BottomNav from "../BottomNav/BottomNav";
import accessories from "../../assets/images/accessories.jpg"
import ExtraComponent from "../Home/ExtraComponents/ExtraComponent";

const Accessories = () => {
  const smallScreen = useMediaQuery("(max-width:902px)");
  return (
    <>
      <Header />
      <AboutHeader title="Accessories" imageURl={accessories}/>
      <ExtraComponent/>
      <Footer />

      {smallScreen && (
        <div
          className=""
          style={{
            position: "sticky",
            bottom: "0px",
          }}
        >
          <BottomNav />
        </div>
      )}
    </>
  );
};

export default Accessories;
