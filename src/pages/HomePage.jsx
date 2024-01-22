/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../features/navbar/Navbar";
import ProductList from "../features/product/components/ProductList";
import Footer from "../features/common/Footer";
import { useSelector } from "react-redux";
import { selectItems } from "../features/cart/cartSlice";

const HomePage = () => {
  const items = useSelector(selectItems)

  console.log(items)
  return (
    <div>
      <Navbar />
      <ProductList />
      <Footer />
    </div>
  );
};

export default HomePage;
