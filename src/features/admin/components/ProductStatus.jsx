/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { Fragment } from "react";
import { FaBoxOpen, FaCheckCircle } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { MdErrorOutline, MdPlayArrow } from "react-icons/md";
import { Link } from "react-router-dom";

// const solutions = [
//   {
//     name: 'Insights',
//     description: 'Measure actions your users take',
//     href: '##',
//     icon: <FaCheckCircle />,
//   },
//   {
//     name: 'Automations',
//     description: 'Create your own targeted content',
//     href: '##',
//     icon: <FaCheckCircle />,
//   },
//   {
//     name: 'Reports',
//     description: 'Keep track of your growth',
//     href: '##',
//     icon: <FaCheckCircle />,
//   },
// ]

const ProductStatus = ({ item }) => {
  return (
    <div className="top-16 w-full max-w-sm">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "text-black" : "text-black/90"}
                group inline-flex relative top-0.5 items-center rounded-md px-2 py-2 text-base font-medium hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 `}
            >
              <span className=" items-start">
                <IoEye />
              </span>
              {/* <ChevronDownIcon
                className={`${open ? 'text-orange-300' : 'text-orange-300/70'}
                  ml-2 h-5 w-5 transition duration-150 ease-in-out group-hover:text-orange-300/80`}
                aria-hidden="true"
              /> */}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -right-36 z-10 -mt-36 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-sm">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                  <div className="text-3xl z-10 absolute left-[23.4rem] top-[7.2rem] text-neutral-200">
                    <MdPlayArrow />
                  </div>

                  <div className="relative grid gap-8 bg-white p-4 px-7 lg:grid-cols-1">
                    <div className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center text-black sm:h-12 sm:w-12">
                        Status:
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-start font-medium text-gray-900"></p>
                        {!item.deleted ? (
                          <p className="text-sm text-green-500 ">
                            Product is Live{" "}
                            <FaCheckCircle className=" inline-flex " />
                          </p>
                        ) : (
                          <p className="text-sm text-red-500">
                            Product is Deleted{" "}
                            <MdErrorOutline className="inline-flex" />
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="relative grid gap-8 bg-white p-4 px-7 lg:grid-cols-1">
                    <div className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center text-black sm:h-12 sm:w-12">
                        Stocks:
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-start font-medium text-gray-900"></p>
                        {!item.stock <= 0 ? (
                          <p className="text-sm text-green-500 ">
                            {item.stock}
                          </p>
                        ) : (
                          <p className="text-sm text-red-500">
                            Product is Out of Stock{" "}
                            <FaBoxOpen className="inline-flex" />
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4">
                    <Link
                      to={`/product-detail/${item.id}`}
                      className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                    >
                      <span className="flex items-center">
                        <span className="text-sm font-medium text-blue-400">
                          See Product Details
                        </span>
                      </span>
                    </Link>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};
export const OrdersStatus = ({ order }) => {
  const time = new Date(order.createdAt);
  const formattedDate = new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(time);

  const time2 = new Date(order.updatedAt);
  const formattedDate2 = order.updatedAt
    ? new Intl.DateTimeFormat("en-IN", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(time2)
    : null;
  return (
    <div className="top-16 z-10 w-full max-w-sm">
      <Popover className="relative ">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "text-black" : "text-black/90"}
                group inline-flex relative top-0.5 items-center rounded-md px-2 py-2 text-base font-medium hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 `}
            >
              <span className=" items-start">
                <IoEye />
              </span>
              {/* <ChevronDownIcon
                className={`${open ? 'text-orange-300' : 'text-orange-300/70'}
                  ml-2 h-5 w-5 transition duration-150 ease-in-out group-hover:text-orange-300/80`}
                aria-hidden="true"
              /> */}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -right-36 z-10 -mt-36 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-sm">
                <div className="overflow-hidden mt-16 rounded-lg shadow-lg ring-1 ring-black/5">
                  <div className="text-3xl z-10 absolute left-[23.4rem] top-[7.2rem] text-neutral-200">
                    <MdPlayArrow />
                  </div>

                  <table className="items-center ring-blue-500 bg-white w-full py-10 border-collapse">
                    <thead className="p-4 ">
                      <tr>
                        <th> </th>
                        <th> </th>
                      </tr>
                    </thead>
                    <tbody className="">
                      <tr className="">
                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle  py-3 text-sm uppercase  whitespace-nowrap font-semibold text-left">
                          Payment Status:
                        </th>
                        {order.paymentMethod !== "cash" ? (
                          order.paymentStatus ? (
                            <tb
                              className={`px-6 bg-blueGray-50 ${
                                order.paymentStatus === "pending"
                                  ? "text-orange-600"
                                  : "text-green-500"
                              } align-middle  py-3 text-sm uppercase  whitespace-nowrap font-semibold text-left`}
                            >
                              {order.paymentStatus}
                            </tb>
                          ) : (
                            <tb className="px-6 bg-blueGray-50 text-blueGray-500 align-middle  py-3 text-sm uppercase  whitespace-nowrap font-semibold text-left">
                              Payment Status
                            </tb>
                          )
                        ) : (
                          <tb className="px-6 bg-blueGray-50 text-orange-500 align-middle  py-3 text-sm uppercase  whitespace-nowrap font-semibold text-left">
                            Cash on Delivery (Pending)
                          </tb>
                        )}
                      </tr>
                      <tr>
                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle  py-3 text-sm uppercase  whitespace-nowrap font-semibold text-left">
                          Payment Method:
                        </th>
                        <tb className="px-6 bg-blueGray-50 text-blueGray-500 align-middle  py-3 text-sm uppercase  whitespace-nowrap font-semibold text-left">
                          {order.paymentMethod}
                        </tb>
                      </tr>
                      <tr>
                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle  py-3 text-sm uppercase  whitespace-nowrap font-semibold text-left">
                          Total Order:
                        </th>
                        <tb className="px-6 bg-blueGray-50 text-blueGray-500 align-middle  py-3 text-sm uppercase  whitespace-nowrap font-semibold text-left">
                          {order.totalItems}
                        </tb>
                      </tr>
                      <tr>
                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle  py-3 text-sm uppercase  whitespace-nowrap font-semibold text-left">
                          Order Time:
                        </th>
                        <tb className="px-6 bg-blueGray-50 text-blueGray-500 align-middle  py-3 text-sm uppercase  whitespace-nowrap font-semibold text-left ">
                          {formattedDate}
                        </tb>
                      </tr>
                      <tr>
                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle  py-3 text-sm uppercase  whitespace-nowrap font-semibold text-left">
                          Order Updated At:
                        </th>
                        <tb className="px-6 bg-blueGray-50 text-blueGray-500 align-middle  py-3 text-sm uppercase  whitespace-nowrap font-semibold text-left ">
                          {formattedDate2 || formattedDate !== null
                            ? formattedDate2
                            : "Not Available"}
                        </tb>
                      </tr>
                    </tbody>
                  </table>

                  {/* <div className="relative grid gap-8 bg-white p-4 px-7 lg:grid-cols-1">
                      <div
                        className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                      >
                        <div className="flex text-lg h-10 w-10 whitespace-nowrap mx- items-center justify-center text-black sm:h-12 sm:w-12">
                            Status:
                        </div>
                        <div className="ml-4">
                          <p className="text-sm text-start font-medium text-gray-900">
                          </p><p className="text-sm text-red-500">
                           {order.paymentMethod}
                          </p>
                        </div>
                      </div>
                  </div>
                  <div className="relative grid gap-8 bg-white p-4 px-7 lg:grid-cols-1">
                      <div
                        className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                      >
                        <div className="flex text-lg h-10 w-10 whitespace-nowrap mx-7 items-center justify-center text-black sm:h-12 sm:w-12">
                            Porduct Order:
                        </div>
                        <div className="ml-4">
                          <p className="text-sm text-start font-medium text-gray-900">
                          </p><p className="text-sm text-green-500 ">{order.totalItems}
                          </p> 
                        </div>
                      </div>
                  </div> */}
                  {/* <div className="bg-gray-50 p-4">
                    <Link
                      to={`/product-detail/${order.id}`}
                      className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/50"
                    >
                      <span className="flex items-center">
                        <span className="text-sm font-medium text-blue-400">
                          See Product Details
                        </span>
                      </span>
                    </Link>
                  </div> */}
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default ProductStatus;
