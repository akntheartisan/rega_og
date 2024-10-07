import React from "react";
import { Routes, Route } from "react-router-dom";
import Product from "../Product/Product";
import Header from "../Header/Header";
import Order from "../Order/Order";
import PrimaryProduct from "../Product/PrimaryProduct";
import AdminContact from "../Contact/AdminContact";
import UserLogin from "../Users/UserLogin";
import Dashboard from "../Dashboard/Dashboard";
import AdminEnquiry from "../Enquiry/AdminEnquiry";
import { useEffect, useState } from 'react';
import { client } from '../../../Client/Clientaxios';
const WorkSpace = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await client.get('/admin/fetchuser');
        setUsers(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchUsers();
  }, []);
    const summa=users.length
  return (
    <>
      <Header/>
      <Routes>
      <Route path="/primary" element={<PrimaryProduct />} />
        <Route path="/project" element={<Product />} />
        <Route path="/order" element={<Order />} />
        <Route path="/contact" element={<AdminContact />} />
        <Route path="/users" element={<UserLogin users={users} />} />
        <Route path="/dashboard" element={<Dashboard userCount={summa} users={users}/>} />
        <Route path="/enquiry" element={<AdminEnquiry />} /> 
      </Routes>
    </>
  );
};

export default WorkSpace;