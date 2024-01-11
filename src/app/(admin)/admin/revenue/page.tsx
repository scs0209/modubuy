import { fetchPayments } from '@/app/_utils/apis/payment'
import React from 'react'
import RevenueData from './RevenueData'

export default async function RevenuePage() {
  const paymentsData = await fetchPayments()

  console.log(paymentsData)

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 p-8 py-4">
        <RevenueData payments={paymentsData} />
      </div>
    </>
  )
}
