/* eslint-disable no-unused-vars */
import React from 'react'
import Navbar from '../features/navbar/Navbar'
import AdminProductDetail from '../features/admin/AdminProductDetail'
import { Circles } from 'react-loader-spinner'
import { useSelector } from 'react-redux'
import { selectProductListStatus } from '../features/product/productSlice'

function AdminProductDetailPage() {
  const status = useSelector(selectProductListStatus)
  return (
    <>
    <Navbar/>
    {status === "loading" ? (
        <div className="flex relative items-center justify-center h-full w-full "><Circles
          height="80"
          width="80"
          color="#00A9FF"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        /></div>):null}
    <AdminProductDetail />
    </>
  )
}

export default AdminProductDetailPage
