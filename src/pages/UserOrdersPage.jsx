/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../features/navbar/Navbar";
import UserOrder from "../features/user/components/UserOrder";
import { useSelector } from "react-redux";
import { selectUserStatus } from "../features/user/userSlice";
import { Circles } from "react-loader-spinner";

function UserOrdersPage() {
  const status = useSelector(selectUserStatus);
  return (
    <div>
      <Navbar />
      {status === "loading" ? (
        <div className="fixed inset-0 bg-opacity-25 bg-slate-500 flex items-center justify-center h-full w-full">
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
      <UserOrder />
    </div>
  );
}

export default UserOrdersPage;
