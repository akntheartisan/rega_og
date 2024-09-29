import React from "react";
import Header from "../Header/Header";
import CartDetails from "./CartDetails/CartDetails";
import Footer from "../Footer/Footer";
import { useLocation } from "react-router-dom";
import CheckoutHeader from "../Checkout/CheckoutHeader";
import { useMediaQuery } from "@mui/material";
import BottomNav from "../BottomNav/BottomNav";

const Cart = () => {
    const location = useLocation();
    const {id} = location.state;
    console.log(id);

    const smallScreen = useMediaQuery('(max-width:768px)')
    
  return (
    <>
      <CheckoutHeader/>
      <CartDetails id={id}/>
      {smallScreen ? <BottomNav/> : <Footer />}
        
    
    </>
  );
};

export default Cart;
