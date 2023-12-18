import UserTable from '@/app/components/mypage/UserTable'
import { backUrl } from '@/app/config/url'
import { authOptions } from '@/app/utils/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

async function fetchPayments(userId: string | unknown) {
  try {
    const response = await fetch(`${backUrl}/api/user?userId=${userId}`)
    const paymentIds = await response.json()

    paymentIds.forEach(async (paymentId: string) => {
      // 두 번째 호출: Stripe 결제 정보 불러오기
      const result = await fetch(`${backUrl}/api/payment/${paymentId}`)
      const paymentInfo = await result.json()
      console.log(paymentInfo)
    })
  } catch (error) {
    console.error(error)
  }
}

export default async function MyPage({
  params,
}: {
  params: { email: string }
}) {
  const session = await getServerSession(authOptions)
  const data = await fetchPayments(session?.user.id)

  console.log(data)

  return (
    <div className="max-w-screen-lg mx-auto">
      <div>{session?.user.name}</div>
      <UserTable />
    </div>
  )
}
