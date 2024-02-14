/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../../auth/authSlice";
import { FaPhone } from "react-icons/fa6";
import { ImPencil } from "react-icons/im";
import Profile from "../../../assets/403017_avatar_default_head_person_unknown_icon.png";
import { TbTrashX } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import Orders from "../../../assets/Orders.svg"
import axios from "axios";
import { IoMdAdd } from "react-icons/io";
import { useDropzone } from "react-dropzone";
import {
  fetchUserImageAsync,
  selectUserImage,
  selectUserInfo,
  selectUserStatus,
  updateUserAsync,
} from "../userSlice";
import { set, useForm } from "react-hook-form";
import Modal from "../../common/Modal";
import { Circles } from "react-loader-spinner";
import { deleteProductImageAsync } from "../../product/productSlice";
// import { uploadImage } from "../userAPI";

const UserProfile = () => {
  const [openModal, setOpenModal] = useState(null);
  // const profile = useSelector(selectUserImage);
  const userInfo = useSelector(selectUserInfo);
  const [image, setImage] = useState(Profile);
  const [modify, setModify] = useState({
    name: {original:"New User", modified:userInfo?.name, isModifying:true },
    email: {original:"user@gmail.com", modified:userInfo?.email, isModifying:true }
  });

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const status = useSelector(selectUserStatus)
  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] };
    newUser.addresses.splice(index, 1, addressUpdate);
    dispatch(updateUserAsync(newUser));
    setSelectedEditIndex(-1);
  };

  const handleRemove = (e, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] };
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  };

  const handleModifyClick = (inputName)=> {
    setModify({
      ...modify, [inputName]:{
        ...modify[inputName], isModifying:false
      }
    })
  }

  const handleSave = (inputName)=>{
    console.log('Modified value for', inputName, ':', modify[inputName].modified)
    const newValue = {...userInfo, [inputName]:modify[inputName].modified}
    // console.log(newValue)
    dispatch(updateUserAsync(newValue))
    setModify({
      ...modify, [inputName]:{original:modify[inputName].modified, modified: '', isModifying:true}
    })
  }

  const handleCancel = (inputName) => {
    setModify({
      ...modify, [inputName]:{...modify[inputName], modified:'', isModifying:true}
    })
  }

  const handleInputChange = (inputName, value) => {
    setModify({
      ...modify, [inputName]:{ ...modify[inputName], modified:value}
    })
  }

  const isSaveDisabled = (inputName) => {
    return modify[inputName].modified?.length < 4
  }
  const isEmialValid = (inputName) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return !regex.test(modify[inputName].modified);
  }

  const handleEditForm = async (index) => {
    setSelectedEditIndex(index);
    const address = userInfo.addresses[index];
    setValue("name", address.name);
    setValue("email", address.email);
    setValue("city", address.city);
    setValue("country", address.country);
    setValue("state", address.state);
    setValue("street", address.street);
    setValue("pinCode", address.pinCode);
    setValue("phone", address.phone);
  };

  const handleAdd = (address) => {
    const newUser = {
      ...userInfo,
      addresses: [...userInfo.addresses, address],
    };
    dispatch(updateUserAsync(newUser));
    setShowAddAddressForm(false);
  };

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    console.log("image", file);
    const formData = new FormData();
    formData.append("image", file);
    axios
      .post("http://localhost:8080/users/upload", formData)
      .then((response) => {
        console.log("Image uploaded:", response.data.imageUrl);

        const newUser = {
          ...userInfo,
          image: response.data.imageUrl,
        };
        dispatch(updateUserAsync(newUser));
        dispatch(deleteProductImageAsync());
      });

    // dispatch(fetchUserImageAsync());
    // console.log("Image fetched", {profile:profile.image})
    // console.log("profile", profile.image);
    // setImage(profile.image)
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <>
    {status === "pending" ? (
        <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : null}
    <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
      <input name="image" {...getInputProps()} />
      <div
        {...getRootProps()}
        className="relative max-w-[230px] h-full mx-auto p-6 flex cursor-pointer justify-center"
      >
        <img
          className="rounded-full shadow-sm ring-4 ring-offset-4 ring-blue-300"
          src={`/profile-images/${userInfo?.image}`}
          alt="user image"
        />
      </div>
      <dl className="-my-3 divide-y divide-gray-100 text-sm">
        {/* <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Title</dt>
          <dd className="text-gray-700 sm:col-span-2">Mr</dd>
        </div> */}
<div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4 flex-row">
          <dt className="font-medium text-gray-900">Name</dt>
          {modify.name.isModifying ? (
            <dd className="text-gray-700 sm:col-span-2 flex flex-row items-center">
              {userInfo?.name}
              <button
                onClick={() => handleModifyClick('name')}
                className="rounded-full hover:bg-gray-200 ml-2 p-3"
              >
                <ImPencil />
              </button>
            </dd>
          ) : (
            <dd className="text-gray-700 sm:col-span-2 flex flex-row items-center max-sm:flex-col">
              <label
                htmlFor="name"
                className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
              >
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userInfo.name.modified}
                  onChange={(e)=>handleInputChange('name', e.target.value)}
                  className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                  placeholder="name"
                />

                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                  Username
                </span>
              </label>
              <div className="flex flex-row mt-2"> <button
                onClick={() => handleCancel('name')}
                className="rounded-full hover:bg-gray-200 ml-2 p-3"
              >
                <RxCross2 />
              </button>
              <button className="px-3 py-1.5 text-sm text-white duration-150 ml-1 bg-indigo-600 rounded-full hover:bg-indigo-500 active:bg-indigo-700" disabled={isSaveDisabled('name')} onClick={()=>handleSave('name')}>
                Update
              </button></div>
             
            </dd>
          )}
        </div>
        <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4 flex-row">
          <dt className="font-medium text-gray-900">Email</dt>
          {modify.email.isModifying ? (
            <dd className="text-gray-700 sm:col-span-2 flex flex-row items-center">
              {userInfo?.email}
              <button
                onClick={() => handleModifyClick('email')}
                className="rounded-full hover:bg-gray-200 ml-2 p-3"
              >
                <ImPencil />
              </button>
            </dd>
          ) : (
            <dd className="text-gray-700 sm:col-span-2 flex flex-row items-center max-sm:flex-col max-w-xl">
              <label
                htmlFor="email"
                className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 w-full"
              >
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={modify.email.modified}
                  onChange={(e)=>handleInputChange('email', e.target.value)}
                  className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
                  placeholder="email"
                />

                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                  email
                </span>
              </label>
              <div className="flex flex-row mt-2"><button
                onClick={() => handleCancel('email')}
                className="rounded-full hover:bg-gray-200 ml-2 p-3"
              >
                <RxCross2 />
              </button>
              <button className="px-3 py-1.5 text-sm text-white duration-150 ml-1 bg-indigo-600 rounded-full hover:bg-indigo-500 active:bg-indigo-700" disabled={isEmialValid('email')} onClick={()=>handleSave('email')}>
                Update
              </button></div>
              
            </dd>
          )}
        </div>
        

        {/* <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Email</dt>
          <dd className="text-gray-700 sm:col-span-2 flex flex-row items-center">
            {userInfo.email}{" "}
            <button className="rounded-full hover:bg-gray-200 ml-2 p-3">
              <ImPencil />
            </button>
          </dd>
        </div> */}
        {userInfo?.role === "admin" && (
          <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Role</dt>
            <dd className="text-gray-700 sm:col-span-2 flex flex-row items-center">
              <p className=" capitalize">{userInfo?.role}</p>
            </dd>
          </div>
        )}

        {/* <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Salary</dt>
          <dd className="text-gray-700 sm:col-span-2">$1,000,000+</dd>
        </div> */}

        <div className="p-3 w-full">
          <div className="flex flex-row justify-between items-center">
            <dt className="font-medium text-gray-900">Your Addresses:</dt>
            <button
              onClick={(e) => {
                setShowAddAddressForm(true);
                setSelectedEditIndex(-1);
              }}
              className="relative flex flex-row items-center justify-end bg-blue-600 text-neutral-50 p-1 rounded-md mb-2"
            >
              <IoMdAdd className="mr-1" /> Add Address
            </button>

            {showAddAddressForm ? (
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                <div className="relative w-auto my-3 mx-auto max-w-6xl max-sm:w-96">
                <form
                  noValidate
                  onSubmit={handleSubmit((data) => {
                    handleAdd(data);
                    reset();
                  })}
                >
                  <div className="space-y-12 mx-6 border-2 shadow-xl p-3 bg-white relative max-sm:top-44 max-sm:max-w-8xl">
                    <div className="border-b border-gray-900/10 pb-12">
                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Full name
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("name", {
                                required: "Name is required",
                              })}
                              name="name"
                              id="name"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-4">
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Phone Number
                          </label>
                          <div className="mt-2">
                            <input
                              type="tel"
                              {...register("phone", {
                                required: "Phone Number is required",
                              })}
                              name="phone"
                              id="phone"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-4">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Email address
                          </label>
                          <div className="mt-2">
                            <input
                              id="email"
                              {...register("email", {
                                required: "Email is required",
                              })}
                              name="email"
                              type="email"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="country"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Country
                          </label>
                          <div className="mt-2">
                            <select
                              id="country"
                              {...register("country", {
                                required: "Country is required",
                              })}
                              name="country"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm cursor-pointer sm:leading-6"
                            >
                              <option>United States</option>
                              <option>India</option>
                              <option>Canada</option>
                              <option>Mexico</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-span-full">
                          <label
                            htmlFor="street-address"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Street address
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("street", {
                                required: "Street Address is required",
                              })}
                              id="street"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2 sm:col-start-1">
                          <label
                            htmlFor="city"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            City
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("city", {
                                required: "City is required",
                              })}
                              id="city"
                              autoComplete="address-level2"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="region"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            State / Province
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("state", {
                                required: "State is required",
                              })}
                              id="region"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="pinCode"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            ZIP / Postal code
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("pinCode", {
                                required: "ZIP / Postal Code is required",
                              })}
                              id="postal-code"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                      <button
                        type="button"
                        onClick={(e) => setShowAddAddressForm(false)}
                        className="text-sm font-semibold leading-6 text-gray-900"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 m-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Add Address
                      </button>
                    </div>
                  </div>
                </form></div>
              </div>
            ) : null}
          </div>
          <dd className="text-gray-700 sm:col-span-2 grid grid-cols-2 gap-8 max-md:grid-cols-1">
            {userInfo?.addresses.map((address, index) => (
              <>
                {selectedEditIndex === index ? (
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-white/30 duration-300 ease-in-out">
                    {" "}
                    <form
                      noValidate
                      onSubmit={handleSubmit((data) => {
                        handleEdit(data, index);
                        reset();
                      })}
                    >
                      <div className="space-y-12 mx-6 border-2 shadow-xl p-3 bg-white relative">
                        <div className="border-b border-gray-900/10 pb-12">
                          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                              <label
                                htmlFor="name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Full name
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("name", {
                                    required: "Name is required",
                                  })}
                                  name="name"
                                  id="name"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>
                            <div className="sm:col-span-4">
                              <label
                                htmlFor="phone"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Phone Number
                              </label>
                              <div className="mt-2">
                                <input
                                  type="tel"
                                  {...register("phone", {
                                    required: "Phone Number is required",
                                  })}
                                  name="phone"
                                  id="phone"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-4">
                              <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Email address
                              </label>
                              <div className="mt-2">
                                <input
                                  id="email"
                                  {...register("email", {
                                    required: "Email is required",
                                  })}
                                  name="email"
                                  type="email"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label
                                htmlFor="country"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Country
                              </label>
                              <div className="mt-2">
                                <select
                                  id="country"
                                  {...register("country", {
                                    required: "Country is required",
                                  })}
                                  name="country"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm cursor-pointer sm:leading-6"
                                >
                                  <option>United States</option>
                                  <option>India</option>
                                  <option>Canada</option>
                                  <option>Mexico</option>
                                </select>
                              </div>
                            </div>

                            <div className="col-span-full">
                              <label
                                htmlFor="street-address"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Street address
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("street", {
                                    required: "Street Address is required",
                                  })}
                                  id="street"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                              <label
                                htmlFor="city"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                City
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("city", {
                                    required: "City is required",
                                  })}
                                  id="city"
                                  autoComplete="address-level2"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-2">
                              <label
                                htmlFor="region"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                State / Province
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("state", {
                                    required: "State is required",
                                  })}
                                  id="region"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-2">
                              <label
                                htmlFor="pinCode"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                ZIP / Postal code
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  {...register("pinCode", {
                                    required: "ZIP / Postal Code is required",
                                  })}
                                  id="postal-code"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                          <button
                            type="button"
                            onClick={setSelectedEditIndex}
                            className="text-sm font-semibold leading-6 text-gray-900"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 m-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Edit Address
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                ) : null}
                <li
                  key={index}
                  className="flex justify-between cursor-pointer border p-2 rounded-2xl gap-x-6 py-5"
                >
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {address.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {address.street}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {address.pinCode}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                      <p className=" flex flex-row items-center text-sm leading-6 text-gray-900">
                        <FaPhone className="mr-1" /> {address.phone}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {address.city}
                      </p>
                    </div>
                    <div className="flex flex-row space-x-5 mt-1">
                      <button className="rounded-full hover:bg-gray-200 p-3">
                        <ImPencil
                          onClick={(e) => handleEditForm(index)}
                          className="text-lg"
                        />
                      </button>
                      <button
                        onClick={(e) => setOpenModal(true)}
                        className="rounded-full hover:bg-gray-200 p-2"
                      >
                        <TbTrashX className="text-red-500 text-2xl" />
                      </button>
                    </div>
                    <Modal
                      title={`Remove ${address.name} Address`}
                      message="Are you sure you want to delete this Address ?"
                      showModal={openModal}
                      dangerOption="Remove"
                      cancelOption="Cancel"
                      cancelAction={() => setOpenModal(null)}
                      dangerAction={(e) => handleRemove(e, index)}
                    />
                  </div>
                </li>
              </>
            ))}
          </dd>
        </div>
      </dl>
    </div>
    </>
    
  );
};

export default UserProfile;
