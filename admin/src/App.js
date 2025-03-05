import { useState, createContext, useEffect, useCallback } from "react";
import LoginForm from "./components/Adminlogin/LoginForm";
import { Routes, Route } from "react-router-dom";
import AdminDash from "./components/Admindash/AdminDash";
import { Toaster } from "react-hot-toast";
import { client } from "./Client/Clientaxios";
import AdminForgetPassword from "./components/Adminlogin/AdminForgetPassword";
import AdminResetPass from "./components/Adminlogin/AdminResetPass/AdminResetPass";
import Error from "./components/Error";
import RegaDashboard from "./components/Admindash/Dashboard/RegaDashboard";

export const AdminContext = createContext();

function App() {
  const [admin, setAdmin] = useState("");
 

  const getProtected = useCallback(async () => {
    try {
      const response = await client.get("/admin/authuser", {
        withCredentials: true,
      });
      const adminDetails = response.data.user;
      if (adminDetails) {
        setAdmin(adminDetails);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getProtected();
  }, [getProtected]);

  return (
    <>
      <AdminContext.Provider value={{ admin, setAdmin }}>
        <Toaster
          toastOptions={{
            success: {
              style: {
                background: "#b5e550",
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
        <Routes>
          <Route
            path="/admin/*"
            element={
              admin ? (
                <AdminDash />
              ) : (
                <LoginForm setAdmin={setAdmin} admin={admin} />
              )
            }
          />
          <Route
            path="/forgotadminpassword"
            element={<AdminForgetPassword />}
          />
          <Route path="/admin/resetPassword/:id" element={<AdminResetPass />} />
          <Route
            path="/admin/"
            element={<LoginForm setAdmin={setAdmin} admin={admin} />}
          />
        </Routes>
      </AdminContext.Provider>
    </>
  );
}

export default App;
