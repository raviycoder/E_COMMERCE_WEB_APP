/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../features/navbar/Navbar";
import AdminProductList from "../features/admin/AdminProductList";
import { Circles } from "react-loader-spinner";

function AdminHome() {
  return (
    <>
      <Navbar />
      <AdminProductList />
    </>
  );
}

export default AdminHome;
