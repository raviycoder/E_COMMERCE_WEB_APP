/* eslint-disable no-unused-vars */
import React from 'react'
import UserProfile from '../features/user/components/UserProfile'
import Navbar from '../features/navbar/Navbar'
import { useSelector } from 'react-redux'
import { selectUserStatus } from '../features/user/userSlice'
import { Circles } from 'react-loader-spinner'

function UserProfilePage() {
  const status = useSelector(selectUserStatus)
  return (
    <div>
        <Navbar/>
        {status === "loading" ? (
        <div className="flex relative items-center justify-center h-full w-full"><Circles
          height="80"
          width="80"
          color="#00A9FF"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        /></div>):null}
        <UserProfile/>
    </div>
  )
}

export default UserProfilePage