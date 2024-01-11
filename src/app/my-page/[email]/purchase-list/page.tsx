import { fetchPaymentsInfo } from '@/app/_utils/apis/payment'
import { fetchUserWithPayments } from '@/app/_utils/apis/user'
import { authOptions } from '@/app/_utils/auth'
import { Separator } from '@/components/ui/separator'
import { getServerSession } from 'next-auth'
import React from 'react'
import GenericDataTable from '@/app/_components/Table/GenericDataTable'
import { Payment } from '@/app/interface'
import { paymentColumns } from '@/app/my-page/[email]/purchase-list/coulumn'

export const dynamic = 'force-dynamic'

export default async function MyPage({
  params,
}: {
  params: { email: string }
}) {
  const session = await getServerSession(authOptions)
  const data = await fetchUserWithPayments(session?.user.id)
  const paymentsInfo = await fetchPaymentsInfo(session?.user.id)

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
      <GenericDataTable<Payment> data={paymentsInfo} columns={paymentColumns} />
    </div>
  )
}
