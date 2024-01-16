/* eslint-disable no-unused-vars */
import React from 'react'
import Navbar from '../features/navbar/Navbar'
import ProductDetail from '../features/product/components/ProductDetail'
import Footer from '../features/common/Footer'
import { useSelector } from 'react-redux'
import { selectProductListStatus } from '../features/product/productSlice'
import { Circles } from 'react-loader-spinner'

const ProductDetailPage = () => {
  const status = useSelector(selectProductListStatus)
  return (
    <div>
        <Navbar/>
        {status === "loading" ? (
        <div className="flex relative items-center py-3 justify-center h-full w-full"><Circles
          height="80"
          width="80"
          color="#00A9FF"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        /></div>):null}
        <ProductDetail/>
        <Footer/>
    </div>
  )
}

export default ProductDetailPage