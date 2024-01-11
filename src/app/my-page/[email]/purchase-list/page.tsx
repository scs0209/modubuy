import { fetchPaymentsInfo } from '@/app/utils/apis/payment'
import { fetchUserWithPayments } from '@/app/utils/apis/user'
import { authOptions } from '@/app/utils/auth'
import { Separator } from '@/components/ui/separator'
import { getServerSession } from 'next-auth'
import React from 'react'
import UserTable from '@/app/components/mypage/UserTable'

export const dynamic = 'force-dynamic'

export default async function MyPage({
  params,
}: {
  params: { email: string }
}) {
  const session = await getServerSession(authOptions)
  const data = await fetchUserWithPayments(session?.user.id)
  const paymentsInfo = await fetchPaymentsInfo(session?.user.id)

  console.log(paymentsInfo)
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Purchase list</h3>
        <p className="text-sm text-muted-foreground">
          This is a list of products you have purchased. It helps you keep track
          of your transactions and manage your purchases.
        </p>
      </div>
      <Separator />
      <UserTable data={paymentsInfo} />
    </div>
  )
}
