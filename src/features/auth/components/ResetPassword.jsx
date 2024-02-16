/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Brand from "../../../assets/Com.png"
import { resetPasswordAsync, selectError, selectMailSent, selectPasswordReset } from "../authSlice";
import { Bounce, toast } from "react-toastify";
import { selectUserInfo } from "../../user/userSlice";

const ResetPassword = () => {
  const [isPasswordHidden, setPasswordHidden] = useState(true);
  const query = new URLSearchParams(window.location.search);
  const error = useSelector(selectError)
  const token = query.get('token');
  const email = query.get('email');
  const resetPasswordPromise = useSelector(selectPasswordReset)
  const userInfo = useSelector(selectUserInfo);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  return (
    <div>
      {(email === userInfo?.email  && token === userInfo?.token) ? <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-28 w-auto"
            src={Brand}
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create Your New Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            noValidate
            onSubmit={handleSubmit((data) => {
              console.log(data);
              dispatch(resetPasswordAsync({email, token, password: data.password}))
              localStorage.removeItem('yourDataKey');
            })}
            className="space-y-6 items-center justify-center"
            action="#"
            method="POST"
          >
            <div >
              <label className="text-gray-600 font-semibold">Password</label>
              <div className="relative max-w-md mt-2">
                <button
                  type="button"
                  className="text-gray-400 absolute right-3 inset-y-0 my-auto active:text-gray-600"
                  onClick={() => setPasswordHidden(!isPasswordHidden)}
                >
                  {isPasswordHidden ? (
                    <svg
                      className="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  )}
                </button>
                <input
                  type={isPasswordHidden ? "password" : "text"}
                  {...register("password", {
                    required: "Please enter your password",
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                      message: `- at least 8 characters\n
                - must contain at least 1\n uppercase letter, 1 lowercase letter, and 1 number\n
                - Can contain special characters`,
                    },
                  })}
                  placeholder="Enter your password"
                  className="w-full pr-12 pl-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
                
            </div>
            <div>
              <label className="text-gray-600 font-semibold">Confirm Password</label>
              <div className="relative max-w-md mt-2">
                <button
                  type="button"
                  className="text-gray-400 absolute right-3 inset-y-0 my-auto active:text-gray-600"
                  onClick={() => setPasswordHidden(!isPasswordHidden)}
                >
                  {isPasswordHidden ? (
                    <svg
                      className="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  )}
                </button>
                <input
                  type={isPasswordHidden ? "password" : "text"}
                  {...register("passwordConfirm", {
                    required: "Please enter your Confirm Password",
                    minLength: {
                      value: 8,
                      message:
                        "Please enter your Atleast 8 characters password",
                    },
                    validate: (value, formValues) =>
                      value === formValues.password ||
                      "Password is Not Matching",
                  })}
                  placeholder="Enter your confirm password"
                  className="w-full pr-12 pl-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
                {errors.passwordConfirm && (
                  <p className="text-red-500">{errors.passwordConfirm.message}</p>
                )}
                {resetPasswordPromise && (
                  <p className="text-green-500">Password reset Successfully</p>
                )}
                {error && (
                  <p className="text-red-500">{error}</p>
                )}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update Password
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
      </div>:<p>Link is Incorract</p>}
    </div>
  );
};

export default ResetPassword;
