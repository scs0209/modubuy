'use client'

import { FullPayment } from '@/app/interface'
import { convertToDesiredFormat, groupByMonth } from '@/app/_utils/func'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

interface Props {
  payments: FullPayment[]
}

export default function Overview({ payments }: Props) {
  const groupedPayments = groupByMonth(payments)
  const chartData = convertToDesiredFormat(groupedPayments)

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
