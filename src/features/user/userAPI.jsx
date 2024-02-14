
/* eslint-disable no-async-promise-executor */
export default function fetchLoggedInUserOrders(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/orders/user/" + userId
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchLoggedInUser() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users/own");
    const data = await response.json();
    resolve({ data });
  });
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function updateAllUser(AllUserUpdate) {
    return new Promise(async (resolve) => {
      const response = await fetch("http://localhost:8080/users/", {
        method: "PATCH",
        body: JSON.stringify(AllUserUpdate),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      resolve({ data });
    });
}

export function fetchUserImage() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users/image");
    const data = await response.json();
    resolve({data});
  });
}

// eslint-disable-next-line no-unused-vars
let isFetching = false;

export function fetchedAllUsers(admin, role) {
  // If a request is already in progress, return the existing promise
  if (isFetching) {
    return Promise.resolve({ error: 'A request is already in progress' });
  }

  let query = "";

  if (admin) {
    Object.keys(admin).forEach((key) => {
      query += `${key}=${admin[key]}&`;
    });
  }

  if (role) {
    Object.keys(role).forEach((key) => {
      query += `${key}=${role[key]}&`;
    });
  }

  // Set the flag to indicate that a request is in progress
  isFetching = true;

  return new Promise(async (resolve) => {
    try {
      const response = await fetch(`http://localhost:8080/users?${query}`);
      const data = await response.json();
      resolve({ data });
    } catch (error) {
      console.error(error);
      resolve({ error: 'An error occurred while fetching data' });
    } finally {
      // Reset the flag when the request is completed (success or failure)
      isFetching = false;
    }
  });
}
