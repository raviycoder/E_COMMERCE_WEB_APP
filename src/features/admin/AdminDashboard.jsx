/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { fetchAllOrdersAsync, selectOrders } from "../order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  fetchAllUserAsync,
  selectfilterAdmins,
  updateAlluserAsync,
} from "../user/userSlice";
// import { ITEMS_PER_PAGE } from '../../app/constants';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const AdminDashboard = () => {
  const orders = useSelector(selectOrders);
  const dispatch = useDispatch();
  const ITEMS_PER_PAGE = 1000;

  useEffect(() => {
    const pagination = { _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync(pagination));
  }, [dispatch]);

  const labels = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const generateSalesData = () => {
    return labels.map((day, index) => {
      const order = orders[index] || { totalItems: 0 };
      return Math.min(order.totalItems, 100);
    });
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Sales",
        data: generateSalesData(),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const itemsCalculate = orders.reduce((acc, order) => {
    const quantity = order.totalItem || order.totalItems || 0;
    return acc + quantity;
  }, 0);

  const TotalAmount = orders.reduce((acc, order) => {
    const quantity = order.totalAmount || 0;
    const roundedQuantity = parseFloat(quantity).toFixed(2);
    return acc + parseFloat(roundedQuantity);
  }, 0);

  return (
    <>
      <div className="lg:pl-80 lg:pr-3 my-10 justify-between w-full px-2 items-center overflow-hidden">
        <h3 className=" text-2xl relative font-bold">Dashboard</h3>
        <div className="space-x-4 flex flex-row max-md:flex-col items-center px-4">
          <Totalcards content={orders.length} title={'Total Orders'} />
          <Totalcards content={itemsCalculate} title={"Total Product Orders"} />
          <Totalcards content={"$"+TotalAmount} title={"Total Earnings"} />
        </div>{" "}
          <Bar options={options} data={data} className="md:px-24 md:py-14 overflow-x-auto max-sm:w-[500px] max-sm:h-[600px]" />
=        <dir className="overflow-x-auto -ml-10"><AllAdmins /></dir>
        
      </div>
    </>
  );
};

// function SalesCard({ orders }) {
//   return (
//     <div className="p-4 bg-white shadow-lg max-h-40 rounded-2xl max-w-lg dark:bg-gray-800">
//       <div className="flex items-center">
//         <span className="relative w-4 h-4 p-2 bg-green-500 rounded-full">
//           <svg
//             width="20"
//             fill="currentColor"
//             height="20"
//             className="absolute h-2 text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
//             viewBox="0 0 1792 1792"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path d="M1362 1185q0 153-99.5 263.5t-258.5 136.5v175q0 14-9 23t-23 9h-135q-13 0-22.5-9.5t-9.5-22.5v-175q-66-9-127.5-31t-101.5-44.5-74-48-46.5-37.5-17.5-18q-17-21-2-41l103-135q7-10 23-12 15-2 24 9l2 2q113 99 243 125 37 8 74 8 81 0 142.5-43t61.5-122q0-28-15-53t-33.5-42-58.5-37.5-66-32-80-32.5q-39-16-61.5-25t-61.5-26.5-62.5-31-56.5-35.5-53.5-42.5-43.5-49-35.5-58-21-66.5-8.5-78q0-138 98-242t255-134v-180q0-13 9.5-22.5t22.5-9.5h135q14 0 23 9t9 23v176q57 6 110.5 23t87 33.5 63.5 37.5 39 29 15 14q17 18 5 38l-81 146q-8 15-23 16-14 3-27-7-3-3-14.5-12t-39-26.5-58.5-32-74.5-26-85.5-11.5q-95 0-155 43t-60 111q0 26 8.5 48t29.5 41.5 39.5 33 56 31 60.5 27 70 27.5q53 20 81 31.5t76 35 75.5 42.5 62 50 53 63.5 31.5 76.5 13 94z"></path>
//           </svg>
//         </span>
//         <p className="ml-2 text-gray-700 text-md dark:text-gray-50">Sales</p>
//       </div>
//       <div className="flex flex-col justify-start">
//         <p className="my-4 text-4xl font-bold text-left text-gray-800 dark:text-white">
//           {orders.length}
//         </p>
//         <div className="relative h-2 bg-gray-200 rounded w-28">
//           <div className="absolute top-0 left-0 w-2/3 h-2 bg-green-500 rounded"></div>
//         </div>
//       </div>
//     </div>
//   );
// }
function Totalcards({ content, title }) {
  return (
    // <div className="flex items-center min-h-screen bg-gray-100">
        <div className="container max-w-6xl px-5 mx-auto my-2 shadow-md border">
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
              <div className="p-5 bg-white rounded shadow-sm">
                <div className="text-base text-gray-700 md:whitespace-nowrap">{title}</div>
                <div className="flex items-center pt-1">
                  <div className="text-2xl font-bold text-gray-900 ">
                    {content}
                  </div>
                  {/* <span
                    className={`flex items-center px-2 py-0.5 mx-2 text-sm rounded-full ${
                      metrics.upward
                        ? "text-green-600 bg-green-100"
                        : "text-red-600 bg-red-100"
                    }`}>
                    {metrics.upward && (
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M18 15L12 9L6 15"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}

                    {/* {!metrics.upward && (
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M6 9L12 15L18 9"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )} */}

                    {/* <span>{metrics.percent}</span> */}
                  {/* </span> */} 
                </div>
              </div>
          </div>
        </div>
      // </div>
  );
}
// function TotalEarnings({ orders }) {
//   const itemsCalculate = orders.reduce((acc, order) => {
//     const quantity = order.totalAmount || 0;
//     const roundedQuantity = parseFloat(quantity).toFixed(2);
//     return acc + parseFloat(roundedQuantity);
//   }, 0);
//   console.log("orders", itemsCalculate);
//   return (
//     <div className="p-4 bg-white shadow-lg max-h-40 rounded-2xl max-w-xl dark:bg-gray-800">
//       <div className="flex items-center">
//         <span className="relative w-4 h-4 p-2 bg-green-500 rounded-full">
//           <svg
//             width="20"
//             fill="currentColor"
//             height="20"
//             className="absolute h-2 text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
//             viewBox="0 0 1792 1792"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path d="M1362 1185q0 153-99.5 263.5t-258.5 136.5v175q0 14-9 23t-23 9h-135q-13 0-22.5-9.5t-9.5-22.5v-175q-66-9-127.5-31t-101.5-44.5-74-48-46.5-37.5-17.5-18q-17-21-2-41l103-135q7-10 23-12 15-2 24 9l2 2q113 99 243 125 37 8 74 8 81 0 142.5-43t61.5-122q0-28-15-53t-33.5-42-58.5-37.5-66-32-80-32.5q-39-16-61.5-25t-61.5-26.5-62.5-31-56.5-35.5-53.5-42.5-43.5-49-35.5-58-21-66.5-8.5-78q0-138 98-242t255-134v-180q0-13 9.5-22.5t22.5-9.5h135q14 0 23 9t9 23v176q57 6 110.5 23t87 33.5 63.5 37.5 39 29 15 14q17 18 5 38l-81 146q-8 15-23 16-14 3-27-7-3-3-14.5-12t-39-26.5-58.5-32-74.5-26-85.5-11.5q-95 0-155 43t-60 111q0 26 8.5 48t29.5 41.5 39.5 33 56 31 60.5 27 70 27.5q53 20 81 31.5t76 35 75.5 42.5 62 50 53 63.5 31.5 76.5 13 94z"></path>
//           </svg>
//         </span>
//         <p className="ml-2 text-gray-700 text-md dark:text-gray-50 whitespace-nowrap">
//           Total Earnings
//         </p>
//       </div>
//       <div className="flex flex-col justify-start">
//         <p className="my-4 text-4xl font-bold text-left text-gray-800 dark:text-white">
//           ${itemsCalculate}
//         </p>
//         <div className="relative h-2 bg-gray-200 rounded w-28">
//           <div className="absolute top-0 left-0 w-2/3 h-2 bg-green-500 rounded"></div>
//         </div>
//       </div>
//     </div>
//   );
// }

function AllAdmins() {
  const filteredAdmins = useSelector(selectfilterAdmins);
  const dispatch = useDispatch();

  useEffect(() => {
    // const admin = {admin:true}
    const role = { role: "admin" };
    dispatch(fetchAllUserAsync(role));
    dispatch(updateAlluserAsync());
  }, [dispatch]);
  return (
    <>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Username</th>
              <th className="py-3 px-6">Role</th>
              <th className="py-3 px-6">email</th>
              {/* <th className="py-3 px-6">Salary</th> */}
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {filteredAdmins?.map((item, idx) => (
              <tr key={idx}>
                <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                  <img
                    src={`/profile-images/${item.image}`}
                    className="w-11 h-10 rounded-full"
                  />
                  <div>
                    <span className="block text-gray-700 text-sm font-medium">
                      {item.name}
                    </span>
                    {/* <span className="block text-gray-700 text-xs">{item.email}</span> */}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap capitalize font-bold">
                  {item.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                {/* <td className="px-6 py-4 whitespace-nowrap">{item.salary}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminDashboard;
