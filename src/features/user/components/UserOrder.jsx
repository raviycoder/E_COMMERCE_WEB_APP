/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedInUserOrdersAsync, selectUserInfo, selectUserOrders } from "../userSlice";
import { FaPhone } from "react-icons/fa6";

const UserOrder = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const orders = useSelector(selectUserOrders);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync(userInfo?.id));
  }, [dispatch, userInfo]);
  if (Array.isArray(orders)) {return (
    <div>
        <h1 className=" relative font-semibold text-center underline text-3xl top-4 underline-offset-2">Your Orders</h1>
      {orders.map((order) => (
          // eslint-disable-next-line react/jsx-key
          <div>
          <div className="mx-auto mt-12 bg-white px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">
              Order #{order.id}
            </h2>
            <h3 className="text-md font-semibold tracking-tight text-red-900 flex flex-row">
              Order Status : <p className=" capitalize ml-1">{order.status}</p>
            </h3>
            <div className="mt-8 border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flow-root items-center">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex py-9">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.product.thumbnail.startsWith("http")?item.product?.thumbnail:`/product-images/${item.product.thumbnail}`}
                          alt={item.product.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <a href={item.product.id}>{item.product.title}</a>
                            </h3>
                            <p className="ml-4">
                              $
                              {Math.round(
                                item.product.price * (1 - item.product.discountPercentage / 100)
                              )}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.product.brand}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${order.totalAmount}</p>
              </div>
              <div className="flex justify-between mt-2 text-base font-medium text-gray-900">
                <p>Total Items in Cart</p>
                <p>{order.totalItems} items</p>
              </div>
            <div className="flex justify-between cursor-pointer gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping Address:
              </p> 
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {order.selectedAddress.name}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {order.selectedAddress.street}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {order.selectedAddress.pinCode}
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                <p className=" flex flex-row items-center text-sm leading-6 text-gray-900">
                  <FaPhone className="mr-1" /> {order.selectedAddress.phone}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {order.selectedAddress.city}
                </p>
              </div>
            </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );}
};

export default UserOrder;
