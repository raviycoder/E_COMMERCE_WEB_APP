/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItemFromCartAsync,
  selectCartLoaded,
  selectItems,
  selectItemsStatus,
  updateItemAsync,
} from "./cartSlice";
import { Circles } from "react-loader-spinner";
import Modal from "../common/Modal";

const Cart = ({ useLink, handleOrder }) => {
  const dispatch = useDispatch();
  const cartLoaded = useSelector(selectCartLoaded)
  const [open, setOpen] = useState(true);
  // todo : make this discountable price
  const items = useSelector(selectItems);
  const [openModal, setOpenModal] = useState(null);

  // const totalAmount = items.reduce(
  //   (amount, item) => item.product.discountPercentage * item.quantity + amount,
  //   0
  // );
  const totalAmount = items.reduce(
    (amount, item) =>
      Math.round(
        item.product?.price * (1 - item.product?.discountPercentage / 100),
        2
      ) *
        item.quantity +
      amount,
    0
  );
  console.log(items)

  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const status = useSelector(selectItemsStatus);

  const handleQuntity = (e, item) => {
    dispatch(updateItemAsync({ id: item.id, quantity: +e.target.value }));
  };

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };

  return (
    <>
      {status === "loading" ? (
        <div className="flex relative items-center justify-center h-full w-full">
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
      ) : null}
      {!items.length && cartLoaded && <Navigate to="/" replace={true} />}
      <div className="mx-auto mt-12 bg-white px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900">
          Cart
        </h2>
        <div className="mt-8 border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flow-root items-center">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.id} className="flex py-9">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.product.thumbnail.startsWith("http")?item.product?.thumbnail:`/product-images/${item.product.thumbnail}`}
                      alt={item.product?.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <Link to={item.product?.id}>{item.product?.title}</Link>
                        </h3>
                        <p className="ml-4">
                          $
                          {Math.round(
                            item.product?.price *
                              (1 - item.product?.discountPercentage / 100)
                          )}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.product?.brand}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-gray-500">
                        Qty
                        <select
                          onChange={(e) => handleQuntity(e, item)}
                          value={item.quantity}
                          className="border  border-none rounded-md ml-2"
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </p>

                      <div className="flex">
                        <Modal
                          title={`Remove ${item.product?.title} in The Cart`}
                          message="Are you sure you want to remove this Cart item ?"
                          dangerOption="Remove"
                          cancelOption="Cancel"
                          dangerAction={(e) => handleRemove(e, item.id)}
                          cancelAction={(e) => setOpenModal(null)}
                          showModal={openModal === item.id}
                        />
                        <button
                          onClick={() => {
                            setOpenModal(item.id);
                          }}
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${totalAmount}</p>
          </div>
          <div className="flex justify-between mt-2 text-base font-medium text-gray-900">
            <p>Total Items in Cart</p>
            <p>{totalItems} items</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            {useLink ? (
              <button
                onClick={handleOrder}
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 w-full py-3 text-base font-medium cursor-pointer text-white shadow-sm hover:bg-indigo-700"
              >
                Order Now
              </button>
            ) : (
              <Link
                to="/checkout"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </Link>
            )}
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or{" "}
              <Link to="/">
                <button
                  type="button"
                  className="for font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Continue Shopping
                  <span
                    aria-hidden="true"
                    className=" duration-300 hover:animate-bounce"
                  >
                    {" "}
                    &rarr;
                  </span>
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
