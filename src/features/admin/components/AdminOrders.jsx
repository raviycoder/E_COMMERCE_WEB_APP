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
import SideNav from "../../navbar/SideNav";
import { FaCircleArrowRight } from "react-icons/fa6";
import { OrdersStatus } from "./ProductStatus";

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
        return "text-lime-700 bg-lime-300";
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

  const handleUpdate = ({e, order}) => {
    const updatedOrder = { ...order, status: e.target.value };
    console.log({ updatedOrder });
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };
  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort]);
  return (
    <>
      <div className="flex flex-wrap -mx-3 mb-5 lg:pl-64">
        <div className="w-full max-w-full px-3 mb-6  mx-auto">
          <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
            <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
              {/* card header */}
              <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                  <span className="mr-3 font-bold text-dark inline-flex items-end">
                    Products Orders <FaCircleArrowRight className="ml-2" />
                  </span>
                  <span className="mt-1 font-medium text-secondary-dark text-lg/normal">
                    All Products are appearing
                  </span>
                </h3>
                <div className="relative flex flex-wrap items-center my-2 cursor-pointer">
                  <button
                    onClick={(e) =>
                      handleSort({
                        sort: "_id",
                        order: sort?._order === "asc" ? "desc" : "asc",
                      })
                    }
                    className="inline-block text-[.925rem] font-medium leading-normal text-center align-middle cursor-pointer rounded-2xl transition-colors duration-150 ease-in-out text-light-inverse bg-light-dark border-light shadow-none border-0 py-2 px-5 hover:bg-secondary active:bg-light focus:bg-light"
                  >
                    {" "}
                    Sort Orders{" "}
                    {sort._sort === "_id" &&
                      (sort._order === "asc" ? (
                        <ArrowUpIcon className="w-4 h-4 inline" />
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline justify-center" />
                      ))}
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
                        <button
                            onClick={(e) =>
                              handleSort({
                                sort: "totalAmount",
                                order: sort?._order === "asc" ? "desc" : "asc",
                              })
                            }
                          >
                          Total Amount{" "}
                            {sort._sort === "totalAmount" &&
                              (sort._order === "asc" ? (
                                <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                              ) : (
                                <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                              ))}
                              </button>
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
                            <span className="font-semibold text-sm text-light-inverse text-md/normal">
                              {order.id}
                            </span>
                          </td>
                          {order.items.map((item, index) => (
                            <td key={index} className="py-3 pl-0 flex flex-col">
                              <div className="flex flex-row">
                                <div className="relative inline-block shrink-0 rounded-2xl me-3">
                                  <img
                                    src={item.product.thumbnail}
                                    alt={item.product.title}
                                    className="w-[50px] h-[50px] inline-block shrink-0 rounded-2xl"
                                  />
                                </div>
                                <div className="flex flex-col justify-start">
                                  <span className="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary pr-2">
                                    {" "}
                                    {item.product.title} <br />
                                    <span className="flex flex-row space-x-2">
                                      <p className="text-sm font-normal">
                                        ({item.quantity} items)
                                      </p>
                                      <p className="text-sm">
                                        ${discountPrice(item.product)}
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
                              <div className="relative my-6 md:w-24">
                              <select
                                id="id-04"
                                name="id-04"
                                required
                                className="peer relative h-10 w-full appearance-none rounded border border-slate-200 bg-white px-4 text-sm text-slate-500 outline-none transition-all autofill:bg-white focus:border-emerald-500 focus-visible:outline-none focus:focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                                onChange={(e) => handleUpdate({ e, order })}
                              >
                                <option value="" selected></option>
                                <option value="pending" >Pending</option>
                                <option value="dispatched">Dispatched</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                              <label
                                htmlFor="id-04"
                                className="pointer-events-none absolute top-2.5 left-2 z-[1] px-2 text-sm text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-valid:-top-2 peer-valid:text-xs peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                              >
                                Select
                              </label>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="pointer-events-none absolute top-2.5 right-2 h-5 w-5 fill-slate-400 transition-all peer-focus:fill-emerald-500 peer-disabled:cursor-not-allowed"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-labelledby="title-04 description-04"
                                role="graphics-symbol"
                              >
                                <title id="title-04">Arrow Icon</title>
                                <desc id="description-04">Arrow icon of the select list.</desc>
                                <path
                                  fillRule="evenodd"
                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            ) : (
                              <span
                                className={`${chooseColor(order.status)} text-center align-baseline inline-flex px-2 py-1 mr-auto items-center font-semibold text-base/nonewhitespace-nowrap rounded-full text-sm capitalize`}
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
                                <OrdersStatus order={order} />
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
      <div className=" lg:pl-72">
        <SideNav/>
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
