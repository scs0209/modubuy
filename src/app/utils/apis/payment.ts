import { backUrl } from '@/app/_config/url'

export async function fetchPayments() {
  try {
    const response = await fetch(`${backUrl}/api/payment/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}

export async function fetchPaymentsInfo(userId: string | unknown) {
  try {
    const response = await fetch(
      `${backUrl}/api/payment-info?userId=${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    if (!response.ok) {
      throw new Error(`An error occurred: ${response.statusText}`)
    }

    const payments = await response.json()
    return payments
  } catch (error) {
    console.error('Failed to fetch payments:', error)
    return null
  }
}
