import React from "react";
import Header from "../Header/Header";
import CartDetails from "./CartDetails/CartDetails";
import Footer from "../Footer/Footer";
import { useLocation } from "react-router-dom";
import CheckoutHeader from "../Checkout/CheckoutHeader";
import ProductViewHeader from "../ProductView/ProductViewHeader";

const Cart = () => {
    const location = useLocation();
    const {id} = location.state;
    console.log(id);
    
  return (
    <>
      <CheckoutHeader/>
      <CartDetails id={id}/>
      <p>hi</p>
    
    </>
  );
};

export default Cart;
