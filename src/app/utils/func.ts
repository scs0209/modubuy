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

export function calculateRevenueByMonth(
  paymentsData: FullPayment[],
): Record<string, number> {
  const initialRevenue = Array.from(
    { length: 12 },
    (_, i) => `${i + 1}월`,
  ).reduce((acc, curr) => ({ ...acc, [curr]: 0 }), {})

  return paymentsData.reduce(
    (acc: Record<string, number>, payment: FullPayment) => {
      const date = new Date(payment.createdAt)
      const month = `${date.getMonth() + 1}월`
      acc[month] = (acc[month] || 0) + payment.amount
      return acc
    },
    initialRevenue,
  )
}

export function calculateRevenueByDay(
  paymentsData: FullPayment[],
): Record<string, number> {
  const dailyRevenue: Record<string, number> = {}
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토']

  // 가장 최근 결제 날짜를 구하기
  const latestPaymentDate = paymentsData.reduce((latestDate, payment) => {
    const paymentDate = new Date(payment.createdAt)
    return paymentDate > latestDate ? paymentDate : latestDate
  }, new Date(0))

  for (let i = 6; i >= 0; i--) {
    const date = new Date(latestPaymentDate)
    date.setDate(date.getDate() - i)
    const dayOfWeek = daysOfWeek[date.getDay()]
    const day = `${date.getMonth() + 1}-${date.getDate()} (${dayOfWeek})`
    dailyRevenue[day] = 0
  }

  paymentsData.forEach((payment) => {
    const date = new Date(payment.createdAt)
    const dayOfWeek = daysOfWeek[date.getDay()]
    const day = `${date.getMonth() + 1}-${date.getDate()} (${dayOfWeek})`
    if (Object.prototype.hasOwnProperty.call(dailyRevenue, day)) {
      dailyRevenue[day] += payment.amount
    }
  })

  return dailyRevenue
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
