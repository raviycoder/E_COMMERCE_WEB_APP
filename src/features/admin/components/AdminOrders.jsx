/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { ITEMS_PER_PAGE, discountPrice } from "../../../app/constants";
import { useDispatch, useSelector } from "react-redux";
import { IoCall } from "react-icons/io5";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../../order/orderSlice";
import { MdEdit } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { Link } from "react-router-dom";
import Pagination from "../../common/Pagination";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";

const AdminOrders = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const [sort, setSort] = useState({});

  const handleEdit = (order) => {
    console.log("handleEdit");
    setEditableOrderId(order.title);
  };
  const handleShow = (e) => {
    console.log("handleShow");
  };

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };

  const handlePage = (page) => {
    setPage(page);
  };
// find the why this is not sorting numbers
  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    console.log({ sort });
    setSort(sort);
  };

  const handleUpdate = ({ e, order }) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };
  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync(pagination));
  }, [dispatch, page]);
  return (
    <>
      <div className="flex flex-wrap -mx-3 mb-5">
        <div className="w-full max-w-full px-3 mb-6  mx-auto">
          <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
            <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
              {/* card header */}
              <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                  <span className="mr-3 font-semibold text-dark">
                    Products Orders
                  </span>
                  <span className="mt-1 font-medium text-secondary-dark text-lg/normal">
                    All Products are appearing
                  </span>
                </h3>
                <div className="relative flex flex-wrap items-center my-2 cursor-pointer">
                  <button
                    onClick={(e) =>
                      handleSort({
                        sort: "id",
                        order: sort?._order == `asc` ? `desc` : `asc`,
                      })
                    }
                    className="inline-block text-[.925rem] font-medium leading-normal text-center align-middle cursor-pointer rounded-2xl transition-colors duration-150 ease-in-out text-light-inverse bg-light-dark border-light shadow-none border-0 py-2 px-5 hover:bg-secondary active:bg-light focus:bg-light"
                  >
                    {" "}
                    Sort Orders{" "}{sort._sort === 'id' && (sort._order === 'asc' ? (<ArrowUpIcon className="w-4 h-4 inline" />): <ArrowDownIcon className="w-4 h-4 inline justify-center" />)}
                  </button>
                </div>
              </div>
              {/* end card header */}
              {/* card body  */}
              <div className="flex-auto block py-8 pt-6 px-9">
                <div className="overflow-x-auto">
                  <table className="w-full my-0 align-middle text-dark border-neutral-200">
                    <thead className="align-bottom">
                      <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                        <th className="pb-3 text-start min-w-[100px]">
                          Order Number
                        </th>
                        <th className="pb-3 text-start min-w-[100px]">Items</th>
                        <th className="pb-3 relative text-start min-w-[100px] max-lg:left-14">
                          Address and Name
                        </th>
                        <th className="pb-3 pr-12 text-start min-w-[100px] ">
                          Total Amount
                        </th>
                        <th className="pb-3 pr-12 text-left min-w-[50px]">
                          Status
                        </th>
                        <th className="pb-3 text-start min-w-[50px]">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr className="border-b border-dashed justify-evenly last:border-b-0">
                          <td className="p-3 pr-0 text-start">
                            <span className="font-semibold text-3xl text-light-inverse text-md/normal">
                              {order.id}
                            </span>
                          </td>
                          {order.items.map((item) => (
                            <td className="py-3 pl-0 flex flex-col">
                              <div className="flex flex-row">
                                <div className="relative inline-block shrink-0 rounded-2xl me-3">
                                  <img
                                    src={item.thumbnail}
                                    className="w-[50px] h-[50px] inline-block shrink-0 rounded-2xl"
                                    alt="title"
                                  />
                                </div>
                                <div className="flex flex-col justify-start">
                                  <span className="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary pr-2">
                                    {" "}
                                    {item.title} <br />
                                    <span className="flex flex-row space-x-2">
                                      <p className="text-sm font-normal">
                                        ({item.quantity} items)
                                      </p>
                                      <p className="text-sm">
                                        ${discountPrice(item)}
                                      </p>
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </td>
                          ))}

                          <td className="p-3 pr-0 justify-start ">
                            <div className="text-start gap-y-2 max-w-[12rem] max-lg:ml-14 align-baseline relative right-4 flex flex-col py-1 mr-auto items-cente font-semibold text-base/none rounded-lg">
                              <strong>{order.selectedAddress.name}</strong>
                              {order.selectedAddress.street},
                              {order.selectedAddress.city},
                              {order.selectedAddress.state},
                              {order.selectedAddress.pinCode},<br />
                              <div className="flex flex-row">
                                <IoCall className="text-green-700" />
                                {"  "}
                                {order.selectedAddress.phone}
                              </div>
                            </div>
                          </td>
                          <td className="p-3 pr-0 text-start">
                            <span className="text-center align-baseline inline-flex px-2 py-1 mr-auto items-center font-semibold text-base/none text-success bg-success-light rounded-lg">
                              $ {order.totalAmount}{" "}
                            </span>
                          </td>
                          <td className="p-3 pl-0 relative right-3 text-start">
                            {order.title === editableOrderId ? (
                              <select
                                className="w-full px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none appearance-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2"
                                onChange={(e) => handleUpdate({ e, order })}
                              >
                                <option value="pending">Pending</option>
                                <option value="dispatched">Dispatched</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            ) : (
                              <span
                                className={`text-center align-baseline ${chooseColor(
                                  order.status
                                )} inline-flex px-2 py-1 mr-auto items-center font-semibold text-base/nonewhitespace-nowrap rounded-full bg-red-100 text-sm text-red-700 capitalize`}
                              >
                                {" "}
                                {order.status}
                              </span>
                            )}
                          </td>
                          <td className="p-3  pl-0 justify-start">
                            <div className="text-center space-x-5 align-baseline -mx-6 inline-flex px-2 py-1 mr-auto items-center font-semibold text-2xl text-success bg-success-light rounded-lg">
                              <button
                                onClick={handleShow}
                                className="p-2 rounded-full hover:bg-gray-300 focus:bg-gray-100"
                              >
                                <IoEye />
                              </button>
                              <button
                                onClick={handleEdit}
                                className="p-2 rounded-full hover:bg-gray-300 focus:bg-gray-100"
                              >
                                <MdEdit />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Pagination
          page={page}
          setPage={setPage}
          handlePage={handlePage}
          totalItems={totalOrders}
        />
      </div>
    </>
  );
};

export default AdminOrders;
