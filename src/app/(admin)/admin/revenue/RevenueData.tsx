'use client'

import { FullPayment } from '@/app/interface'
import {
  ChartData,
  calculateRevenueByDay,
  calculateRevenueByMonth,
  createChartData,
} from '@/app/utils/func'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Calendar } from '@/components/ui/calendar'
import { YearSelect } from './YearSelect'

interface Props {
  payments: FullPayment[]
}

export default function RevenueData({ payments }: Props) {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [dataByMonth, setDataByMonth] = useState<ChartData[]>([])
  const [dataByDay, setDataByDay] = useState<ChartData[]>([])

  useEffect(() => {
    const filteredPayments = payments.filter(
      (payment) => new Date(payment.createdAt).getFullYear() === selectedYear,
    )

    const revenueByMonth = calculateRevenueByMonth(filteredPayments)
    const revenueByDay = calculateRevenueByDay(payments)

    const chartDataByMonth = createChartData(revenueByMonth)
    const chartDataByDay = createChartData(revenueByDay)

    setDataByMonth(chartDataByMonth)
    setDataByDay(chartDataByDay)
  }, [payments, selectedYear])

  console.log(selectedYear)

  return (
    <>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <ResponsiveContainer width="100%" height={350}>
            <Calendar numberOfMonths={2} />
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Daily Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              width={500}
              height={300}
              data={dataByDay}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Revenue" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-7">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Yearly Revenue</CardTitle>
          <YearSelect setSelected={setSelectedYear} />
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart
              width={500}
              height={300}
              data={dataByMonth}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="Revenue" stroke="#00BE62" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  )
}
