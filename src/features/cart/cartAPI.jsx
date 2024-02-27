/* eslint-disable no-unused-vars */
/* eslint-disable no-async-promise-executor */
export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("/api/cart", { // only http 👍👍
      method: "POST",
      body: JSON.stringify(item),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

// export function fetchItemsByUserId(userId) {
//   return new Promise((resolve, reject) => {
//     fetch("/api/cart?user=" + userId) // only http 👍👍
//       .then((response) => response.json())
//       .then((data) => resolve({ data }))
//       .catch((error) => {
//         console.error("Error fetching all products:", error);
//         reject(error);
//       });
//   });
// }

export function fetchItemsByUserId() {
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch('/api/cart' ); // only http 👍👍
    const data = await response.json();
    resolve({ data });
  });
}

export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("/api/cart/" + update.id, {  // only http 👍👍
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch('/api/cart/' + itemId, {  // only http 👍👍
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data: { id: itemId } });
  });
}


export async function resetCart() {
  return new Promise(async (resolve) => {
    const response = await fetchItemsByUserId();
    const items = response.data;
    await items.map(item=>deleteItemFromCart(item.product.id))
    resolve({ status: "success" });
  });
}
