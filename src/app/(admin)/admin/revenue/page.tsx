import { fetchPayments } from '@/app/utils/apis/payment'
import React from 'react'
import RevenueData from './RevenueData'

export default async function RevenuePage() {
  const paymentsData = await fetchPayments()

  console.log(paymentsData)

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <RevenueData payments={paymentsData} />
      </div>
    </>
  )
}
