/* eslint-disable no-unused-vars */

import { Bounce, toast } from "react-toastify";

/* eslint-disable no-async-promise-executor */
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function loginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
        toast.success("Your Successfully Login", {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      } else {
        const error = await response.text();
        reject(error);
        toast.error("If Your Not Signup, Please First Signup", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8080/auth/check");
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function signOut(userId) {
  return new Promise(async (resolve, reject) => {
    resolve({ data: "success" });
  });
}

// export function updateUser(update) {
//   return new Promise(async (resolve) => {
//     const response = await fetch("http://localhost:8080/users/"+update.id, {
//       method: "PATCH",
//       body: JSON.stringify(update),
//       headers: { "Content-Type": "application/json" },
//     });
//     const data = await response.json();
//     resolve({ data });
//   });
// }


export function resetPassword(data){
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:8080/auth/reset-password', {
        method: 'POST',
        body:JSON.stringify(data),
        headers: {'content-type':'application/json'}
      });
      if (response.ok) {
        const data = await response.json();
        resolve({data});
          toast.success("Your Password successfully Reset", {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });  
      } else {
        const error = await response.text();
        reject(error);
        if (error) {
          toast.error("Password Not Reset", {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  })
}
export function resetPasswordRequest(email){
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:8080/auth/reset-password-request', {
        method: 'POST',
        body:JSON.stringify(email),
        headers: {'content-type':'application/json'}
      });
      console.log("reset password request",response)
      if (!response.ok) {
        toast.error("Your Email Address is Not Valid for Reset Password", {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
      if (response.ok) {
        const data = await response.json();
        resolve({data});        
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  })
}