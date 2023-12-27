import UserTable from '@/app/components/mypage/UserTable'
import { fetchPaymentsInfo } from '@/app/utils/apis/payment'
import { fetchUserWithPayments } from '@/app/utils/apis/user'
import { authOptions } from '@/app/utils/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

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
