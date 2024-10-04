import "./App.css";
import Home from "./components/Home/Home";
import Contact from "./components/Contact/Contact";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import React, { useState, createContext, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { client } from "./components/Client/Client";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import ProductView from "./components/ProductView/ProductView";
import UserDash from "./components/UserDash/UserDash";
import ProfileForm from "./components/Profile/ProfileForm";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import ScrollToTop from "./components/ScrollToTop";
import Orders from "./components/Orders/Orders.js"
// import Invoice from "./components/Checkout/Invoice";
import About from "./components/About/About.js";

import ProductPage from "./components/ProductPage/ProductPage.js";

export const UserContext = createContext();
function App() {
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await client.get("/user/protect", {
          withCredentials: true,
        });
        const user = response.data.user;
        if (response.status === 200) {
          setUserData(user);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, []);

  return (
    <>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Toaster
          toastOptions={{
            success: {
              duration: 5000,
              style: {
                background: "#809c13",
                color: "white",
              },
            },
            error: {
              style: {
                background: "#ff5252",
                color: "white",
              },
            },
          }}
        />
       <ScrollToTop/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About/>} />
          <Route path="/productview" element={<ProductView/>}/>
          <Route path="/cart" element={<Cart/>} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/checkout" element={<Checkout/>}/>
          <Route path="/register" element={<LoginPage />} />
          <Route path="/userdash" element={<UserDash />} />
          <Route path="/forgetPasswordPage" element={<ForgotPassword />} />
          <Route path="/users/resetPassword/:id" element={<ResetPassword />} />
          <Route path="/product" element={<ProductPage/>} />
          {/* <Route path="/invoice" element={<Invoice />} /> */}
          
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
