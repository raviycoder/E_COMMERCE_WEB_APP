/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../features/navbar/Navbar";
import ProductList from "../features/product/components/ProductList";
import Footer from "../features/common/Footer";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <ProductList />
      <Footer />
    </div>
  );
};

export default HomePage;
