/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Cart from "./features/cart/Cart";
import CartPage from './pages/CartPage'
// import Navbar from "./features/navbar/Navbar";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import Protected from "./features/auth/components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice"
import { selectLoggedInUser } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser)
  useEffect(() => {
    if(user){
      dispatch(fetchItemsByUserIdAsync(user.id))
    }
  }, [dispatch, user])
  return (
    <>
        <Router>
          <Routes>
            <Route path="/checkout" element={<Protected><CheckoutPage /></Protected>} />
            <Route path="/" element={<Protected><HomePage /></Protected>} />
            <Route path="/cart" element={<Protected><CartPage /></Protected>} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/product-detail/:id" element={<Protected><ProductDetailPage /></Protected>} />
          </Routes>
        </Router>
    </>
  );
}

export default App;
