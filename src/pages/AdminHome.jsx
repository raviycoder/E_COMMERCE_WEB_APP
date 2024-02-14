/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../features/navbar/Navbar";
import AdminProductList from "../features/admin/AdminProductList";
import { Circles } from "react-loader-spinner";
import SideNav from "../features/navbar/SideNav";

function AdminHome() {
  return (
    <>
    <SideNav/>
      <AdminProductList />
    </>
  );
}

export default AdminHome;
