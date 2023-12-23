/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Cart from "./features/cart/Cart";
// import Navbar from "./features/navbar/Navbar";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetailPage from "./pages/ProductDetailPage";

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<Cart />}  />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/product-detail" element={<ProductDetailPage />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
