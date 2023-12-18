import UserTable from '@/app/components/mypage/UserTable'
import { backUrl } from '@/app/config/url'
import { authOptions } from '@/app/utils/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

async function fetchPayments(userId: string | unknown) {
  try {
    const response = await fetch(`${backUrl}/api/user?userId=${userId}`)
    const paymentIds = await response.json()

    // Promise.all과 Array.map을 사용하여 모든 요청을 병렬로 처리
    const payments = await Promise.all(
      paymentIds.map(async (paymentId: string) => {
        const result = await fetch(`${backUrl}/api/payment/${paymentId}`)
        return result.json()
      }),
    )

    return payments // 결제 정보 배열 반환
  } catch (error) {
    console.error(error)
  }

  return []
}

export const dynamic = 'force-dynamic'

export default async function MyPage({
  params,
}: {
  params: { email: string }
}) {
  const session = await getServerSession(authOptions)
  const data = await fetchPayments(session?.user.id)

  console.log('data:', data)

  return (
    <div className="max-w-screen-lg mx-auto">
      <div>{session?.user.name}</div>
      <UserTable data={data} />
    </div>
  )
}
