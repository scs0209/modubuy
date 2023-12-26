import React from 'react'
import Dashboard from '../components/admin/Dashboard'
import { fetchPayments } from '../utils/apis/payment'

export default async function AdminPage() {
  const paymentData = await fetchPayments()

  console.log(paymentData)

  return (
    <>
      <Dashboard payments={paymentData} />
    </>
  )
}
