/* eslint-disable no-unused-vars */
import React from 'react'
import Cart from '../features/cart/Cart'
import Navbar from '../features/navbar/Navbar'

const CartPage = () => {
  return (
    <div>
      <Navbar/>
      <Cart useLink={false} />
      </div>
  )
}

export default CartPage