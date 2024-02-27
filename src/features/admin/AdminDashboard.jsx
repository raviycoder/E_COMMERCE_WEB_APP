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

  // const time = orders.slice(0, 7).map(order=>new Date(order?.createdAt));
  // console.log("kkkkkk",time);
  // const labels = new Intl.DateTimeFormat('en-IN', {
  //   year: 'numeric',
  //   month: 'short',
  //   day: '2-digit',
  // }).format(time);

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
                </div>
              </div>
          </div>
        </div>
      // </div>
  );
}

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
                    src={item.image}
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
