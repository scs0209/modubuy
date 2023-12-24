import UserTable from '@/app/components/mypage/UserTable'
import { backUrl } from '@/app/config/url'
import { fetchUserWithPayments } from '@/app/utils/apis/user'
import { authOptions } from '@/app/utils/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

async function fetchPaymentsInfo(userId: string | unknown) {
  try {
    const response = await fetch(
      `${backUrl}/api/payment-info?userId=${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`)
    }

    const payments = await response.json()
    return payments
  } catch (error) {
    console.error('Failed to fetch payments:', error)
    return null
  }
}

export const dynamic = 'force-dynamic'

export default async function MyPage({
  params,
}: {
  params: { email: string }
}) {
  const session = await getServerSession(authOptions)
  const data = await fetchUserWithPayments(session?.user.id)
  const paymentsInfo = await fetchPaymentsInfo(session?.user.id)

  console.log('data:', paymentsInfo)

  return (
    <div className="max-w-screen-lg mx-auto">
      <div>{session?.user.name}</div>
      <UserTable data={paymentsInfo} />
    </div>
  )
}
