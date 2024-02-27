/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCurrentOrder, updateOrderAsync } from "../features/order/orderSlice";

function OrderCancelPage() {
    const currentOrder = useSelector(selectCurrentOrder)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(updateOrderAsync({...currentOrder, status: 'cancelled'}))
    })
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md max-w-md">
          <div className="items-center justify-center flex">
            <img
              alt=""
              src="https://res.cloudinary.com/dccaxfmwv/image/upload/v1709018323/Com_y62h2s.png"
              className="h-24 w-24"
            />
          </div>
          <h2 className="text-3xl font-bold text-center text-red-500 mb-6">
            Order Cancellation
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            We&apos;re sorry to hear that your order has been canceled. If you
            have any questions or concerns, feel free to reach out to our
            customer support.
          </p>
          <div className="text-center">
            <p className="text-gray-700">
              For further assistance, please contact our customer support team:
            </p>
            <p className="text-blue-500 font-semibold">support@example.com</p>
            <Link to="/products">
              {" "}
              <button className="px-4 mt-4 py-2 text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-700 active:shadow-lg">
                Go Back to Home →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCancelPage;
