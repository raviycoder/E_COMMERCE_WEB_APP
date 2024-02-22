/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
// import { useSelector } from "react-redux";
// import { selectCurrentOrder } from "./orderSlice";
import { loadStripe } from "@stripe/stripe-js";

/* eslint-disable no-async-promise-executor */
export function createOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("/api/orders", {  // only http 👍👍
      method: "POST",
      body: JSON.stringify(order),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    resolve({ data: data });
    console.log("orderdata",data);
  });
}

export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("/api/orders/" + order.id, {  // only http 👍👍
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
    const response = await fetch("/api/orders?" + queryString);   // only http 👍👍
    const data = await response.json();
    const totalOrders = await response.headers.get("X-Total-Count");
    resolve({ data: { orders: data, totalOrders: +totalOrders } });
  });
}

export const checkout = async () => {
  // const currentOrder = useSelector(selectCurrentOrder);
  try {
    const res = await fetch("/api/stripe-checkout", {  // only http 👍👍
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      // body: JSON.stringify({ totalAmount: currentOrder.totalAmount }),
    });
    const data = await res.json();
    window.location = data.url;
  } catch (error) {
    console.log(error);
  }
};
console.log("herodata", createOrder.data)
export const stripeCheckout = async (currentOrder) => {
  // const currentOrder = useSelector(selectCurrentOrder)
  try {
    const response = await fetch(
      "/api/create-checkout-session",  // only http 👍👍
      {
        method: "POST",
        body: JSON.stringify({
          orders: currentOrder,
          meta: { order_id: currentOrder.id },
        }),
        headers: { "Content-Type": "application/json" },
      }
      );
      
      if (response.status === 200) {
      // Extract JSON from the response
      const session = await response.json();
      const stripe = await loadStripe(
        import.meta.env.VITE_STRIPE_KEY
      );
      // Use the session ID to redirect to checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.sessionId,
      });

      if (result.error) {
        console.error(result.error);
      }
    } else {
      console.error("Error fetching session data:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};



export const razorCheckout = async (currentOrder) => {
  // const currentOrder = useSelector(selectCurrentOrder);
  function loadScript(src) {
  return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
          resolve(true);
      };
      script.onerror = () => {
          resolve(false);
      };
      document.body.appendChild(script);
  });
}
  const res = await loadScript(
    "https://checkout.razorpay.com/v1/checkout.js"
);

if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
}
  try {
    const response = await fetch("/api/payment/checkout", {  // only http 👍👍
      method: "POST",
      body: JSON.stringify({
        order:currentOrder
      }),
      headers: {
        "Content-Type": "application/json",
      }
    });
    // const data = await res.json();
    const result = await response.json();
console.log(result);
const { checkout } = result
    var options = {
      "key": import.meta.env.VITE_RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      "amount": currentOrder.totalAmount*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "USD",
      "name": currentOrder.user.name,
      "image": "https://upload.wikimedia.org/wikipedia/commons/3/33/Vanamo_Logo.png",
      "order_id": checkout.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "callback_url": `/api/payment/payment-verification`,  // only http 👍👍
      "prefill": {
          "name": currentOrder.selectedAddress.name,
          "email": currentOrder.selectedAddress.email,
          "contact": currentOrder.selectedAddress.phone
      },
      "theme": {
          "color": "#3399cc"
      }
  };
  const rzp1 = new window.Razorpay(options)
   rzp1.open();

    // const data = await res.json();
    // window.location = data.url;
  } catch (error) {
    console.log(error);
  }
};