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
