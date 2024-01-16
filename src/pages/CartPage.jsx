/* eslint-disable no-unused-vars */
import React from 'react'
import Cart from '../features/cart/Cart'
import Navbar from '../features/navbar/Navbar'
import Footer from '../features/common/Footer'

const CartPage = () => {
  return (
    <div>
      <Navbar/>
      <Cart useLink={false} />
      <Footer/>
      </div>
  )
}

export default CartPage