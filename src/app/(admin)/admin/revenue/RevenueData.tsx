'use client'

import { FullPayment } from '@/app/interface'
import {
  ChartData,
  calculateRevenueByDay,
  calculateRevenueByMonth,
  calculateRevenueByYear,
  createChartData,
} from '@/app/utils/func'
import React, { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'

interface Props {
  payments: FullPayment[]
}

export default function RevenueData({ payments }: Props) {
  const [dataByYear, setDataByYear] = useState<ChartData[]>([])
  const [dataByMonth, setDataByMonth] = useState<ChartData[]>([])
  const [dataByDay, setDataByDay] = useState<ChartData[]>([])

  useEffect(() => {
    const revenueByYear = calculateRevenueByYear(payments)
    const revenueByMonth = calculateRevenueByMonth(payments)
    const revenueByDay = calculateRevenueByDay(payments)

    const chartDataByYear = createChartData(revenueByYear)
    const chartDataByMonth = createChartData(revenueByMonth)
    const chartDataByDay = createChartData(revenueByDay)

    setDataByYear(chartDataByYear)
    setDataByMonth(chartDataByMonth)
    setDataByDay(chartDataByDay)
  }, [])

  return (
    <>
      <h2>Yearly Revenue</h2>
      <BarChart
        width={500}
        height={300}
        data={dataByYear}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="Revenue" fill="#8884d8" />
      </BarChart>

      <h2>Monthly Revenue</h2>
      <BarChart
        width={500}
        height={300}
        data={dataByMonth}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="Revenue" fill="#8884d8" />
      </BarChart>

      <h2>Daily Revenue</h2>
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
    </>
  )
}
