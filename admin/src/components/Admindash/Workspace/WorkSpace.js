import React from "react";
import { Routes, Route } from "react-router-dom";
import Product from "../Product/Product";
import Header from "../Header/Header";
import Order from "../Order/Order";
import PrimaryProduct from "../Product/PrimaryProduct";
import AdminContact from "../Contact/AdminContact";
import UserLogin from "../Users/UserLogin";
import AdminEnquiry from "../Enquiry/AdminEnquiry";
import { useEffect, useState } from "react";
import { client } from "../../../Client/Clientaxios";
import RegaDashboard from "../Dashboard/RegaDashboard";
import RefundDetails from "../refundDetails/RefundDetails";

const WorkSpace = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await client.get("/admin/fetchuser");
        setUsers(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchUsers();
  }, []);
  const summa = users.length;
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/dashboard"
          element={<RegaDashboard userCount={summa} users={users} />}
        />
        <Route path="/primary" element={<PrimaryProduct />} />
        <Route path="/project" element={<Product />} />
        <Route path="/order" element={<Order />} />
        <Route path="/contact" element={<AdminContact />} />
        <Route path="/users" element={<UserLogin users={users} />} />
        <Route path="/refund" element={<RefundDetails/>}/>

        <Route path="/enquiry" element={<AdminEnquiry />} />
      </Routes>
    </>
  );
};

export default WorkSpace;
