/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiRefreshCw } from "react-icons/fi";
import {
  fetchAllUserAsync,
  selectAllUsers,
  selectfilterAdmins,
  updateAlluserAsync,
} from "../user/userSlice";
import AdminModal from "./components/AdminModal";

const AllAdmins = () => {
  // const admins = useSelector(selectAllUsers);
  const filteredAdmins = useSelector(selectfilterAdmins);
  const dispatch = useDispatch();

  useEffect(() => {
    // const admin = {admin:true}
    const role = { role: "admin" };
    dispatch(fetchAllUserAsync(role));
    dispatch(updateAlluserAsync());
  }, [dispatch]);

  const handleRefresh = ()=> {
    const role = { role: "admin" };
    dispatch(fetchAllUserAsync(role))
  }
  //   const filteredAdmins = admins?.filter((admin) => admin.role === "admin");
  //   const filteredAdmins = useSelector(selectFillterAdmins)

  // const filteredAdmins = useMemo(()=>{
  //     return admins.filter((admin)=> admin.role === "admin")
  // }, [admins]);

  // useEffect(() => {
  //     const loadImages = async () => {
  //       const imagePromises = admins.map(async (admin) => {
  //         if (admin.image) {
  //           const imagePath = `../../uploads/${admin.image}`;
  //           try {
  //             const image = await import(imagePath);
  //             return image.default;
  //           } catch (error) {
  //             console.error(`Error loading image for ${admin.name}:`, error);
  //             return null; // or provide a default image
  //           }
  //         } else {
  //           console.error(`Image path is undefined for ${admin.name}`);
  //           return null; // or provide a default image
  //         }
  //       });

  //       const loadedImages = await Promise.all(imagePromises);
  //       setImage(loadedImages);
  //     };

  //     loadImages();
  //   }, [admins]);

  const tableItems = [
    {
      avatar:
        "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
      name: "Liam James",
      email: "liamjames@example.com",
      phone_nimber: "+1 (555) 000-000",
      position: "Software engineer",
      salary: "$100K",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/86.jpg",
      name: "Olivia Emma",
      email: "oliviaemma@example.com",
      phone_nimber: "+1 (555) 000-000",
      position: "Product designer",
      salary: "$90K",
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/79.jpg",
      name: "William Benjamin",
      email: "william.benjamin@example.com",
      phone_nimber: "+1 (555) 000-000",
      position: "Front-end developer",
      salary: "$80K",
    },
    {
      avatar: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
      name: "Henry Theodore",
      email: "henrytheodore@example.com",
      phone_nimber: "+1 (555) 000-000",
      position: "Laravel engineer",
      salary: "$120K",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1439911767590-c724b615299d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
      name: "Amelia Elijah",
      email: "amelia.elijah@example.com",
      phone_nimber: "+1 (555) 000-000",
      position: "Open source manager",
      salary: "$75K",
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 lg:ml-72 py-7">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Team members
            </h3>
            <p className="text-gray-600 mt-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
          <div className="flex flex-row space-x-5 whitespace-nowrap max-[280px]:flex-col max-sm:my-3">
            <button className="px-4 py-1.5 text-white flex flex-row items-center gap-x-2 bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-700 active:shadow-lg" onClick={handleRefresh}>
            <FiRefreshCw /> Refresh
            </button>
          <AdminModal />
          </div>
        </div>
      </div>
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
    </div>
  );
};

export default AllAdmins;
