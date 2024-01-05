import { fetchPayments } from '@/app/utils/apis/payment'
import React from 'react'
import RevenueData from './RevenueData'

export default async function RevenuePage() {
  const paymentsData = await fetchPayments()

  return <RevenueData payments={paymentsData} />
}
