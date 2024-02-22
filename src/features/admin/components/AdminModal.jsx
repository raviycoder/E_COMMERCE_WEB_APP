/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUserAsync, selectAllUsers, updateAlluserAsync } from "../../user/userSlice";
import { SiConvertio } from "react-icons/si";
import { FaEdit } from "react-icons/fa";

function AdminModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [select, setSelect] = useState(null);
  const admins = useSelector(selectAllUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    const admin = { admin: true };
    dispatch(fetchAllUserAsync(admin));
  }, [dispatch]);

  const handleRole = (item) => {
    // setSelect({...select, [rowindex]: role});
    setSelect(item)
    console.log(`Role ${item}`)
  };
   if (!Array.isArray(admins)) {
    // Handle the case where admins is not an array
    console.error("admins is not an array");
    return null; // or return a default component, an empty array, or something else
  }

  const handleChange = (e, item) => {
    const roles = { role: e.target.value, _id: item._id };
    // console.log(`Role`, {roles});  // Corrected: use role.role to access the role property
    dispatch(updateAlluserAsync(roles));
    const role = { role: "admin" };
    dispatch(fetchAllUserAsync(role))
    setSelect(null);
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="">
        <button
          type="button"
          onClick={openModal}
          className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
        >
          Add Admin
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto lg:pl-72">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 flex"
                  >
                    Covert User{" "}
                    <SiConvertio className=" text-blue-500 mx-2 mt-1" /> Admin
                  </Dialog.Title>
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
                        {admins?.map((item, idx) => (
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
                            <td className="px-6 py-4 whitespace-nowrap">
                              {select?._id === item._id ? (
                                <div className="relative my-6 md:w-36">
                                  <select
                                    id="id-04"
                                    name="id-04"
                                    onChange={(e) => handleChange(e, item)}
                                    defaultValue={item.role}
                                    // value={"role"}
                                    required
                                    className="relative w-full h-10 px-4 text-sm transition-all bg-white border rounded outline-none appearance-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white focus:border-emerald-500 focus:focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                                  >
                                    <option value="" disabled selected></option>
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                  </select>
                                  <label
                                    htmlFor="id-04"
                                    className="pointer-events-none absolute top-2.5 left-2 z-[1] px-2 text-sm text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-valid:-top-2 peer-valid:text-xs peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                                  >
                                    Select an option
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
                                    <desc id="description-04">
                                      Arrow icon of the select list.
                                    </desc>
                                    <path
                                      fillRule="evenodd"
                                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                              ) : (
                                <div className="flex flex-row items-center space-x-1">
                                  <span className={`flex flex-row items-center justify-center gap-1 rounded ${item.role=== "admin" ? "bg-green-500 text-white":'bg-blue-500 text-white'} px-2 text-sm >`}>
                                    {item.role}
                                  </span>
                                  <button
                                    onClick={() => handleRole(item)}
                                    className="p-2 hover:bg-gray-200 focus:bg-gray-100 rounded-full"
                                  >
                                    <FaEdit />
                                  </button>
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {item.email}
                            </td>
                            {/* <td className="px-6 py-4 whitespace-nowrap">{item.salary}</td> */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Closs
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default AdminModal;
