/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import { FaPhone } from "react-icons/fa6";
import Cart from "../features/cart/Cart";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser, updateUserAsync } from "../features/auth/authSlice";
import { useState } from "react";
import { createOrderAsync } from "../features/order/orderSlice";
import { selectItems } from "../features/cart/cartSlice";





const CheckoutPage = () => {
  const items = useSelector(selectItems);

  const totalAmount = items.reduce(
    (amount, item) =>
      Math.round(item.price * (1 - item.discountPercentage / 100)) *
        item.quantity +
      amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);


  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState('cash')

  const handleAddress = (e) => {
    console.log(e.target.value)
    setSelectedAddress(user.addresses[e.target.value])
  }

  const handlePayment = (e) => {
    console.log(e.target.value)
    setPaymentMethod(e.target.value)
  }
  
  const user = useSelector(selectLoggedInUser);
  

  const handleOrder = (e) => {
    const order = {items, totalAmount, totalItems, user, paymentMethod, selectedAddress}
    dispatch(createOrderAsync(order))
    // TODO: Redirect to order-success page
    //TODO: clear cart after order
    //TODO: on server change the stock number of items
  }
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <h1 className="text-3xl relative -right-[21px] font-bold mt-2">
        Personal Information
        <p className="mt-1 text-sm leading-6 text-gray-500">
          Use a permanent address where you can receive mail
        </p>
      </h1>

      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <form noValidate onSubmit={handleSubmit((data) => {
            dispatch(
              updateUserAsync({...user, addresses:[...user.addresses, data]})
              )
              reset()
          })}>
            <div className="space-y-12 mx-6">
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
                        {...register ('name', {required : 'Name is required'})}
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
                        {...register ('phone', {required : 'Phone Number is required'})}
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
                        {...register ('email', {required : 'Email is required'})}
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
                        {...register ('country', {required : 'Country is required'})}
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
                        {...register ('street', {required : 'Street Address is required'})}
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
                        {...register ('city', {required : 'City is required'})}
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
                        {...register ('state', {required : 'State is required'})}
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
                        {...register ('pinCode', {required : 'ZIP / Postal Code is required'})}
                        id="postal-code"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link to="/cart">
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Restore
                  </button>
                </Link>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 m-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Address
                </button>
              </div>
              <div>
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Address
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Choose from existing Address
                </p>
                <ul role="list" className="divide-y divide-gray-100">
                  {user.addresses.map((address, index) => (
                    <li
                      key={index}
                      className="flex justify-between cursor-pointer gap-x-6 py-5"
                    >
                      <div className="flex min-w-0 gap-x-4">
                        <input
                          name="address"
                          onChange={handleAddress}
                          type="radio"
                          value={index}
                          className="h-4 w-4 border-gray-300 cursor-pointer text-indigo-600 focus:ring-indigo-600"
                        />
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
                      <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <p className=" flex flex-row items-center text-sm leading-6 text-gray-900">
                        <FaPhone className="mr-1" /> {address.phone}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {address.city}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 space-y-10">
                  <fieldset>
                    <legend className="text-sm font-semibold leading-6 text-gray-900">
                      Payment Methods
                    </legend>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Choose One
                    </p>
                    <div className="mt-6 space-y-6">
                      <div className="flex items-center gap-x-3">
                        <input
                          id="cash"
                          name="payments"
                          onChange={handlePayment}
                          type="radio"
                          value="cash"
                          checked={paymentMethod === "cash"}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="cash"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Cash On Delivery
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                          id="card"
                          name="payments"
                          onChange={handlePayment}
                          type="radio"
                          checked={paymentMethod === "card"}
                          value="card"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="card"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Card
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="lg:col-span-2 lg:-mt-28">
          <Cart useLink={true} handleOrder={handleOrder} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
