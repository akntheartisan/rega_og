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
import Orders from "./components/Orders/Orders.js";
import About from "./components/About/About.js";
import ProductPage from "./components/ProductPage/ProductPage.js";
import Error from "./components/404/Error.jsx";

export const UserContext = createContext();
function App() {
  const [userData, setUserData] = useState("");
  // console.log(userData);

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

  useEffect(() => {
    if (!userData) {
      getUserData();
    }
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
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/productview/:id" element={<ProductView />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/register" element={<LoginPage />} />
          <Route path="/cart" element={userData ? <Cart /> : <Home />} />
          <Route path="/orders" element={userData ? <Orders /> : <Home />} />
          <Route
            path="/checkout"
            element={userData ? <Checkout /> : <Home />}
          />
          <Route
            path="/userdash"
            element={userData ? <UserDash /> : <Home />}
          />
          <Route path="/forgetPasswordPage" element={<ForgotPassword />} />
          <Route path="/users/resetPassword/:id" element={<ResetPassword />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
