import React from "react";
import Header from "../Header/Header";
import AboutHeader from "../About/AboutHeader";
import Footer from "../Footer/Footer";
import BottomNav from "../BottomNav/BottomNav";
import { useMediaQuery } from "@mui/material";
import imageTerms from '../../assets/images/terms1.jpg'
import TermsContent from "./TermsContent";

const Terms = () => {
  const smallScreen = useMediaQuery("(max-width:900px)");

  return (
    <>
      <Header />
      <AboutHeader title="Terms & Conditions"  imageURl={imageTerms}/>
      <TermsContent/>
      <Footer />
      {smallScreen && (
        <div
          className=""
          style={{
            position: "sticky",
            bottom: "0px",
            borderTop: "0.05em solid white",
          }}
        >
          <BottomNav />
        </div>
      )}
    </>
  );
};

export default Terms;
