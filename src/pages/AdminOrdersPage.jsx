/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../features/navbar/Navbar";
import AdminOrders from "../features/admin/components/AdminOrders";
import { Circles } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { selectOrderStatus } from "../features/order/orderSlice";

function AdminOrdersPage() {
  const status = useSelector(selectOrderStatus);
  return (
    <>
      {status === "loading" ? (
        <div className="flex relative items-center p-4 justify-center h-full w-full ">
          <Circles
            height="80"
            width="80"
            color="#00A9FF"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : null}
      <AdminOrders />
    </>
  );
}

export default AdminOrdersPage;
