/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordRequestAsync, selectAuthStatus, selectMailSent } from "../authSlice";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import Brand from "../../../assets/Com.png"
import { Bounce, toast } from "react-toastify";
import { Circles } from "react-loader-spinner";

const Modal = ({
  title,
  message,
  dangerOption,
  cancelOption,
  dangerAction,
  cancelAction,
  showModal,
}) => {
  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);

  const handleDanger = () => {
    setOpen(false);
    dangerAction();
  };
  const handleCancel = () => {
    setOpen(false);
    cancelAction();
  };

  useEffect(() => {
    if (showModal) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [showModal]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                      <MdOutlineMarkEmailRead
                        className="h-6 w-6 text-green-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center  sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold mt-2 leading-6 text-gray-900"
                      >
                        {title}
                      </Dialog.Title>
                      {/* <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {message}
                        </p>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex justify-center sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-14 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                    onClick={handleDanger}
                  >
                    {dangerOption}
                  </button>
                  {/* <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={handleCancel}
                    ref={cancelButtonRef}
                  >
                    {cancelOption}
                  </button> */}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

const ForgetPassword = () => {
  const [openModal, setOpenModal] = useState(false);

  const mailSent = useSelector(selectMailSent);
  console.log("MailSent", mailSent);
  const status = useSelector(selectAuthStatus);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  return (
    <>
      {status === "pending" ? (
        <div className="fixed inset-0 bg-opacity-25 bg-slate-500 flex items-center justify-center h-full w-full">
        <Circles
          height="80"
          width="80"
          color="#00A9FF"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
      ) :<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
            className="mx-auto h-28 w-auto"
            src={Brand}
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Enter Email to reset Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            noValidate
            onSubmit={handleSubmit((data) => {
              console.log(data);
              dispatch(resetPasswordRequestAsync(data));
              
            })}
            className="space-y-6"
            action="#"
            method="POST"
          >
            <div>
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
                    required: "Please enter a valid email address",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Your email address is Not Valid",
                    },
                  })}
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
                {mailSent?.message && (
                  <p className="text-green-500">
                    Mail Sent On Your Giving Email Address
                  </p>
                )}
                {mailSent?.message && (<Modal
                  title={`Mail Successfully Sent On Your Email Address`}
                  dangerOption={<p className="">Ok</p>}
                  dangerAction={(e) => setOpenModal(false)}
                  showModal={(e) => setOpenModal(mailSent)}
                />)}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Send Email
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Send me Back to{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>}
    </>
  );
};

export default ForgetPassword;
