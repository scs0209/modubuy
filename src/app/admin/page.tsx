import React from 'react'
import { Sidebar } from '../components/admin/SideBar'
import Dashboard from '../components/admin/Dashboard'

export default function AdminPage() {
  return (
    <div className="grid lg:grid-cols-5">
      <Sidebar />
      <Dashboard />
    </div>
  )
}
