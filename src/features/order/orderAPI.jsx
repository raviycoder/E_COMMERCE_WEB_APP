/* eslint-disable react-hooks/rules-of-hooks */
import { useSelector } from "react-redux";
import { selectCurrentOrder } from "./orderSlice";

/* eslint-disable no-async-promise-executor */
export function createOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/orders", {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/orders/"+order.id, {
      method: "PATCH",
      body: JSON.stringify(order),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllOrders(sort, pagination) {
  let queryString = "";
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/orders?" + queryString);
    const data = await response.json();
    const totalOrders = await response.headers.get("X-Total-Count");
    resolve({ data: { orders: data, totalOrders: +totalOrders } });
  });
}

export const checkout = async () => {
  const currentOrder = useSelector(selectCurrentOrder)
  try {
    const res = await fetch("http://localhost:8080/stripe-checkout", {
      method: 'POST',
      headers:{
        "Content-Type":"application/json",
      },
      mode:"cors",
      body:JSON.stringify({ totalAmount: currentOrder.totalAmount})
    })
    const data = await res.json()
    window.location=data.url
  } catch (error) {
    console.log(error)
  }
}
