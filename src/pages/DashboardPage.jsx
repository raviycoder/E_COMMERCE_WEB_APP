/* eslint-disable no-unused-vars */
import React from 'react'
import AdminDashboard from '../features/admin/AdminDashboard'
import SideNav from '../features/navbar/SideNav'

function DashboardPage() {
  return (
    <div>
        <SideNav/>
        <AdminDashboard/>
    </div>
  )
}

export default DashboardPage