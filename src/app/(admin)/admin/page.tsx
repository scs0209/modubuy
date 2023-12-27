import React from 'react'
import Dashboard from '../../components/admin/Dashboard'
import '../../globals.css'
import { fetchPayments } from '../../utils/apis/payment'
import { fetchUsers } from '../../utils/apis/user'

export default async function AdminPage() {
  const paymentsData = await fetchPayments()
  const usersData = await fetchUsers()

  console.dir(usersData, { depth: null })

  return (
    <>
      <Dashboard payments={paymentsData} users={usersData} />
    </>
  )
}
