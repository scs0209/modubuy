import { FullPayment } from '../interface'

type Payment = {
  id: string
  userId: string
  chargeId: string
  paymentId: string
  amount: number
  status: string
  product: string
  createdAt: string
}

export function groupByMonth(data: Payment[]): { [key: number]: Payment[] } {
  return data.reduce((acc: { [key: number]: Payment[] }, payment: Payment) => {
    const date = new Date(payment.createdAt)
    const month = date.getMonth()

    if (!acc[month]) {
      acc[month] = []
    }

    acc[month].push(payment)

    return acc
  }, {})
}

export function convertToDesiredFormat(groupedData: {
  [key: number]: Payment[]
}): { name: string; total: number }[] {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  return months.map((month, index) => {
    const paymentsInMonth = groupedData[index] || []
    const total = paymentsInMonth.reduce(
      (acc, payment) => acc + payment.amount,
      0,
    )
    return {
      name: month,
      total,
    }
  })
}

export function calculateRevenueByYear(
  paymentsData: FullPayment[],
): Record<string, number> {
  return paymentsData.reduce(
    (acc: Record<string, number>, payment: FullPayment) => {
      const year = new Date(payment.createdAt).getFullYear()
      acc[year] = (acc[year] || 0) + payment.amount
      return acc
    },
    {},
  )
}

export function calculateRevenueByMonth(
  paymentsData: FullPayment[],
): Record<string, number> {
  return paymentsData.reduce(
    (acc: Record<string, number>, payment: FullPayment) => {
      const date = new Date(payment.createdAt)
      const month = `${date.getFullYear()}-${date.getMonth() + 1}`
      acc[month] = (acc[month] || 0) + payment.amount
      return acc
    },
    {},
  )
}

export function calculateRevenueByDay(
  paymentsData: FullPayment[],
): Record<string, number> {
  return paymentsData.reduce(
    (acc: Record<string, number>, payment: FullPayment) => {
      const date = new Date(payment.createdAt)
      const day = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`
      acc[day] = (acc[day] || 0) + payment.amount
      return acc
    },
    {},
  )
}

export type ChartData = {
  name: string
  Revenue: number
}

export function createChartData(
  revenueByUnit: Record<string, number>,
): ChartData[] {
  return Object.keys(revenueByUnit).map((unit: string) => ({
    name: unit,
    Revenue: revenueByUnit[unit],
  }))
}
export const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}
