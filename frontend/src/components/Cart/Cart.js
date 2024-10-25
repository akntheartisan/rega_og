import React, { useEffect } from "react";
import Header from "../Header/Header";
import CartDetails from "./CartDetails/CartDetails";
import Footer from "../Footer/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import CheckoutHeader from "../Checkout/CheckoutHeader";
import { useMediaQuery } from "@mui/material";
import BottomNav from "../BottomNav/BottomNav";

const Cart = () => {
    const location = useLocation();
    const {id} = location.state || "";
    console.log(id);
    const navigate = useNavigate();

   useEffect(()=>{
    if(id === undefined){
       navigate("/")
    }
   },[id]);

  const smallScreen = useMediaQuery('(max-width:902px)')
    
  return (
    <>
      <CheckoutHeader/>
      <CartDetails id={id}/>
   
       {smallScreen && <div className="" style={{
        position:"sticky",
        bottom:"0px",
        borderTop:"0.05em solid white"
      }} ><BottomNav />
      </div>}
        
    
    </>
  );
};

export default Cart;
