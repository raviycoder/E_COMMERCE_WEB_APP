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
import CartPage from "./pages/CartPage";
// import Navbar from "./features/navbar/Navbar";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import Protected from "./features/auth/components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import {
  checkAuthAsync,
  selectLoggedInUser,
  selectUserChecked,
} from "./features/auth/authSlice";
import NotFoundPage from "./pages/NotFoundPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrdersPage from "./pages/UserOrdersPage";
import UserProfilePage from "./pages/UserProfilePage";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import Logout from "./features/auth/components/Logout";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import ProtectedAdmin from "../src/features/auth/components/ProtectedAdmin";
import AdminHome from "./pages/AdminHome";
import AdminProductDetailPage from "./pages/AdminProductDetailPage";
import Copy from "./features/admin/components/ProductForm";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import AllProductsPage from "./pages/AllProductsPage";
import AboutPage from "./pages/AboutPage";
import ContactUs from "./pages/ContactUs";
import AllAdminsPage from "./pages/AllAdminsPage";
import DashboardPage from "./pages/DashboardPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userChecked = useSelector(selectUserChecked);

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);
  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync());
      dispatch(fetchLoggedInUserAsync());
    }
  }, [dispatch, user]);
  return (
    <>
      {userChecked && (
        <Router>
          <Routes>
            <Route
              path="/checkout"
              element={
                <Protected>
                  <CheckoutPage />
                </Protected>
              }
            />
            <Route
              path="/success/:id"
              element={
                <Protected>
                  <OrderSuccessPage />
                </Protected>
              }
            />
            <Route
              path="/"
              element={
                <Protected>
                  <HomePage />
                </Protected>
              }
            />
            <Route
              path="/cart"
              element={
                <Protected>
                  <CartPage />
                </Protected>
              }
            />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forget-password" element={<ForgetPasswordPage />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route
              path="/product-detail/:id"
              element={
                <Protected>
                  <ProductDetailPage />
                </Protected>
              }
            />
            <Route
              path="/orders"
              element={
                <Protected>
                  <UserOrdersPage />
                </Protected>
              }
            />
            <Route
              path="/profile"
              element={
                <Protected>
                  <UserProfilePage />
                </Protected>
              }
            />
            <Route
              path="/products"
              element={
                <Protected>
                  <AllProductsPage />
                </Protected>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedAdmin>
                  <AdminHome />
                </ProtectedAdmin>
              }
            />
            <Route
              path="/admin/product-detail/:id"
              element={
                <ProtectedAdmin>
                  <AdminProductDetailPage />
                </ProtectedAdmin>
              }
            />
            <Route
              path="/admin/product-form"
              element={
                <ProtectedAdmin>
                  <AdminProductDetailPage />
                </ProtectedAdmin>
              }
            />
            <Route
              path="/admin/product_form"
              element={
                <ProtectedAdmin>
                  <Copy />
                </ProtectedAdmin>
              }
            />
            <Route
              path="/admin/product_form/edit/:id"
              element={
                <ProtectedAdmin>
                  <AdminProductFormPage />
                </ProtectedAdmin>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <ProtectedAdmin>
                  <AdminOrdersPage />
                </ProtectedAdmin>
              }
            />
            <Route
              path="/admin/adminusers"
              element={
                <ProtectedAdmin>
                  <AllAdminsPage />
                </ProtectedAdmin>
              }
            />
            <Route
              path="admin/dashboard"
              element={
                <ProtectedAdmin>
                  <DashboardPage />
                </ProtectedAdmin>
              }
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route
              path="/reset-password"
              element={
                <Protected>
                  <ResetPasswordPage />
                </Protected>
              }
            />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
