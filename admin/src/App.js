import { useState, createContext, useEffect } from "react";
import LoginForm from "./components/Adminlogin/LoginForm";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminDash from "./components/Admindash/AdminDash";
import { Toaster } from "react-hot-toast";
import { client } from "./Client/Clientaxios";
import AdminForgetPassword from './components/Adminlogin/AdminForgetPassword'; 
import AdminResetPass from "./components/Adminlogin/AdminResetPass/AdminResetPass";
export const AdminContext = createContext();
function App() {
  const [admin, setAdmin] = useState("");
  console.log(admin);

  useEffect(()=>{
    const getProtected = async () => {
      try {
        const response = await client.get("/admin/authuser", {
          withCredentials: true,
        });
        console.log(response.data.user);
        const adminDetails = response.data.user;
        if (adminDetails) {
          setAdmin(adminDetails);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProtected();
  },[])

  return (
    <>
      
      <AdminContext.Provider value={{ admin, setAdmin }}>
        <Toaster
          toastOptions={{
            success: {
              style: {
                background: "#b5e550",
                color:'white'
              },
            },
            error: {
              style: {
                background: "#ff5252",
                color:'white'
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
          <Route path="/forgotadminpassword" element={<AdminForgetPassword/>}/>
          <Route path="/admin/resetPassword/:id" element={<AdminResetPass />} />
        </Routes>
      </AdminContext.Provider>
    </>
  );
}

export default App;
