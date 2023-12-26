import { backUrl } from '@/app/config/url'

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
