/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { resetCartAsync } from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../features/auth/authSlice";
import { resetOrder, selectOrderStatus } from "../features/order/orderSlice";
import { Circles } from "react-loader-spinner";

const OrderSuccessPage = () => {
  const params = useParams();
  const status = useSelector(selectOrderStatus)
  const dispatch = useDispatch()
  const user = useSelector(selectLoggedInUser)
  useEffect(() => {
    dispatch(resetCartAsync(user.id))
    dispatch(resetOrder)
  }, [dispatch, user])
  return (
    <>
    {status === "loading" ? (
        <div className="flex relative items-center justify-center h-full w-full"><Circles
          height="80"
          width="80"
          color="#00A9FF"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        /></div>):null}
      {!params.id && <Navigate to="/" replace={true} />}
      <div className="bg-gray-100 h-screen">
        <div className="bg-white p-6  md:mx-auto">
          <svg
            viewBox="0 0 24 24"
            className="text-green-600 w-16 h-16 mx-auto my-6"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
          <div className="text-center">
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
              Payment Done!
            </h3>
            <h2 className="font-normal my-2">Order Number: #{params?.id}</h2>
            <h1 className="text-3xl mb-3 font-medium text-green-700">
              Your Order was Successful!
            </h1>
            <p className=" font-normal text-xl">
              Thank you for choosing our products. <br />
              Your order has been successfully processed and placed.
            </p>
            <p className="mt-5">
              For any inquiries or assistance, please{" "}
              <a href="#" className=" text-blue-700">
                contact our support team
              </a>
              .
            </p>
            <div className="py-10 text-center">
              <Link
                to="/"
                className="px-12 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
              >
                GO BACK
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSuccessPage;
